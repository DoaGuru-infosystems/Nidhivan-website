import React, { useState, useRef, useLayoutEffect, useEffect, useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Banner from '../../Elements/Banner';
import Masonry from 'react-masonry-css';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { Maximize, SearchX, AlertCircle, RefreshCw } from 'lucide-react';
import CustomLightbox from '../../Common/CustomLightbox';
import { fetchAllGalleryImages, fetchGalleryCategories, getMediaUrl } from '@/lib/api';

gsap.registerPlugin(Flip);

const defaultFilters = [
    { label: "Architecture", filter: "cat-1" },
    { label: "Decor", filter: "cat-2" },
    { label: "Outdoor", filter: "cat-3" },
    { label: "Interiors", filter: "cat-4" },
    { label: "Residential", filter: "cat-5" },
    { label: "Commercial", filter: "Commercial" },
    { label: "General", filter: "General" }
];

var bnrimg = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80"; // TEMP LIVE PREVIEW
var bgimg1 = new URL('../../../images/background/cross-line.png', import.meta.url).href;

const breakpointColumnsObj = {
  default: 3,
  992: 3,
  768: 2,
  500: 1
};

const Gallery = () => {
    const location = useLocation();
    const [activeFilter, setActiveFilter] = useState(location.state?.activeCategory || '*');
    const galleryRef = useRef(null);
    const [allProjects, setAllProjects] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const [dynamicFilters, setDynamicFilters] = useState(defaultFilters);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const loadData = async () => {
        setIsLoading(true);
        setIsError(false);
        try {
            const [categoriesRes, imagesRes] = await Promise.all([
                fetchGalleryCategories(),
                fetchAllGalleryImages()
            ]);
            
            const cats = categoriesRes.data || categoriesRes;
            const newFilters = cats.map(c => ({ label: c.title, filter: c.id.toString() }));
            setDynamicFilters(newFilters);

            const imgs = imagesRes.data || imagesRes;
            
            // Create image items from the categories' thumbnail images
            const catThumbnails = cats
                .filter(c => c.thumbnail_image)
                .map((c, index) => ({
                    id: `cat-thumb-${c.id}`,
                    title: c.title || `Category ${index + 1}`,
                    address: '',
                    filter: c.id.toString(),
                    image: getMediaUrl(c.thumbnail_image)
                }));

            const dynamic = imgs.map((item, index) => ({
                ...item,
                id: `dyn-${item.id}`,
                title: item.title || `Gallery Image ${index + 1}`,
                address: item.address || '',
                filter: item.category_id ? item.category_id.toString() : 'General',
                image: item.image_url ? getMediaUrl(item.image_url) : "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80"
            }));

            // Combine both category thumbnails and regular images
            const allImgs = [...catThumbnails, ...dynamic];

            setAllProjects(allImgs);
            setFilteredItems(allImgs);
        } catch (error) {
            console.error("Failed to load gallery", error);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // Memoize the filtering to avoid unnecessary re-calculations
    const currentFilteredItems = useMemo(() => {
        if (activeFilter === '*') return allProjects;
        return allProjects.filter(item => item.filter === activeFilter);
    }, [activeFilter, allProjects]);

    // GSAP Flip animation on filter change
    useLayoutEffect(() => {
        if (isLoading || isError) return;
        if (!galleryRef.current) return;

        // Get current state
        const state = Flip.getState('.gallery-item');
        
        // Apply filter logic
        setFilteredItems(currentFilteredItems);

        // Wait for state update, then animate
        requestAnimationFrame(() => {
            Flip.from(state, {
                duration: 0.5,
                ease: "power2.out",
                absolute: true,
                stagger: 0.05,
                scale: true,
                onEnter: elements => gsap.fromTo(elements, 
                    { opacity: 0, scale: 0.8 }, 
                    { opacity: 1, scale: 1, duration: 0.4 }
                ),
                onLeave: elements => gsap.to(elements, 
                    { opacity: 0, scale: 0.8, duration: 0.4 }
                )
            });
        });
    }, [activeFilter, currentFilteredItems, isLoading, isError]);

    return (
        <div className="relative bg-bg-cream min-h-screen">
            <Banner title="Our Gallery" pagename="Gallery" description="Explore our portfolio of breathtaking real estate projects, interior designs, and architectural marvels." bgimage={bnrimg}/>
            
            <div className="relative py-12 md:py-20">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Filters */}
                    {!isError && (
                        <div className="filter-wrap mb-12 text-center">
                            <ul className="flex flex-wrap justify-center gap-3">
                                <li className={`cursor-pointer px-6 py-2.5 font-bold tracking-wider uppercase text-sm rounded-full transition-all duration-300 shadow-sm ${activeFilter === '*' ? 'bg-brand-gold text-brand-ink' : 'bg-white text-gray-600 hover:bg-brand-ink hover:text-white border border-gray-200'}`} 
                                    onClick={() => setActiveFilter('*')}>
                                    All
                                </li>
                                {dynamicFilters.map((item, index) => (
                                    <li key={index} 
                                        className={`cursor-pointer px-6 py-2.5 font-bold tracking-wider uppercase text-sm rounded-full transition-all duration-300 shadow-sm ${activeFilter === item.filter ? 'bg-brand-gold text-brand-ink' : 'bg-white text-gray-600 hover:bg-brand-ink hover:text-white border border-gray-200'}`}
                                        onClick={() => setActiveFilter(item.filter)}>
                                        {item.label}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    
                    <div ref={galleryRef}>
                        {isLoading ? (
                            /* SKELETON LOADER */
                            <Masonry
                                breakpointCols={breakpointColumnsObj}
                                className="flex w-auto gap-6 lg:gap-8 mb-12"
                                columnClassName="bg-clip-padding"
                            >
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={`skel-${i}`} className="mb-6 lg:mb-8 rounded-2xl overflow-hidden bg-gray-200 animate-pulse" style={{ height: ['300px', '400px', '250px', '450px', '320px', '380px'][i % 6] }}>
                                    </div>
                                ))}
                            </Masonry>
                        ) : isError ? (
                            /* ERROR STATE */
                            <div className="flex flex-col items-center justify-center py-24 px-4 bg-white rounded-3xl shadow-sm border border-red-100">
                                <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
                                    <AlertCircle size={40} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2 heading-font">Oops! Something went wrong</h3>
                                <p className="text-gray-500 text-center max-w-md mb-8">We couldn't load the gallery images at the moment. Please check your connection and try again.</p>
                                <button 
                                    onClick={loadData}
                                    className="flex items-center gap-2 px-8 py-3 bg-brand-ink text-white font-semibold rounded-full hover:bg-brand-gold transition-colors shadow-md"
                                >
                                    <RefreshCw size={18} />
                                    Try Again
                                </button>
                            </div>
                        ) : filteredItems.length === 0 ? (
                            /* EMPTY STATE */
                            <div className="flex flex-col items-center justify-center py-24 px-4 bg-white rounded-3xl shadow-sm border border-gray-100">
                                <div className="w-24 h-24 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mb-6">
                                    <SearchX size={48} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2 heading-font">No Images Found</h3>
                                <p className="text-gray-500 text-center max-w-md">There are currently no images available in this category. Please select another category.</p>
                            </div>
                        ) : (
                            /* GALLERY MASONRY */
                            <Masonry
                                breakpointCols={breakpointColumnsObj}
                                className="flex w-auto gap-6 lg:gap-8 mb-12"
                                columnClassName="bg-clip-padding"
                            >
                                {filteredItems.map((item, index) => (
                                    <div key={item.id} className="gallery-item mb-6 lg:mb-8" data-filter={item.filter}>
                                        <div 
                                            className="relative group overflow-hidden rounded-2xl shadow-sm hover:shadow-2xl transition-shadow duration-500 cursor-pointer bg-gray-100"
                                            onClick={(e) => { e.preventDefault(); setLightboxIndex(index); setLightboxOpen(true); }}
                                        >
                                            <img 
                                                src={item.image} 
                                                alt={item.title} 
                                                loading="lazy"
                                                className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" 
                                            />
                                            
                                            {/* Premium Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                            
                                            {/* Text Content */}
                                            <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out pointer-events-none">
                                                <h4 className="text-xl lg:text-2xl font-bold mb-1 heading-font text-white drop-shadow-md">{item.title}</h4>
                                                {item.address && <p className="text-sm text-gray-200 drop-shadow-sm line-clamp-1">{item.address}</p>}
                                            </div>

                                            {/* View Icon */}
                                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center text-brand-ink opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-lg translate-y-[-10px] group-hover:translate-y-0 pointer-events-none">
                                                <Maximize size={18} strokeWidth={2.5} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Masonry>
                        )}
                    </div>
                </div>
            </div>

            {/* Lightbox */}
            <CustomLightbox
                open={lightboxOpen}
                close={() => setLightboxOpen(false)}
                index={lightboxIndex}
                slides={filteredItems.map(item => ({ src: item.image, title: item.title, description: item.address }))}
            />
        </div>
    );
};

export default Gallery;
