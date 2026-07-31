import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Banner from '../../Elements/Banner';
import Masonry from 'react-masonry-css';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { Maximize } from 'lucide-react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { fetchAllGalleryImages, fetchGalleryCategories, getMediaUrl } from '@/lib/api';

gsap.registerPlugin(Flip);

const filters = [
    { label: "Architecture", filter: "cat-1" },
    { label: "Decor", filter: "cat-2" },
    { label: "Outdoor", filter: "cat-3" },
    { label: "Interiors", filter: "cat-4" },
    { label: "Residential", filter: "cat-5" },
    { label: "Commercial", filter: "Commercial" }, // Added for dynamic data support
    { label: "General", filter: "General" }
];


// var bnrimg = new URL('../../../images/banner/3.jpg', import.meta.url).href; // ORIGINAL DUMMY - restore when real property photos are ready

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

    const [dynamicFilters, setDynamicFilters] = useState(filters);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [categoriesRes, imagesRes] = await Promise.all([
                    fetchGalleryCategories(),
                    fetchAllGalleryImages()
                ]);
                
                const cats = categoriesRes.data || categoriesRes;
                const newFilters = cats.map(c => ({ label: c.title, filter: c.id.toString() }));
                setDynamicFilters(newFilters);

                const imgs = imagesRes.data || imagesRes;
                const dynamic = imgs.map((item, index) => ({
                    ...item,
                    id: `dyn-${item.id}`,
                    title: item.title || `Gallery Image ${index + 1}`,
                    address: '',
                    filter: item.category_id ? item.category_id.toString() : 'General',
                    image: item.image_url ? getMediaUrl(item.image_url) : "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80"
                }));

                const merged = dynamic;
                setAllProjects(merged);
                setFilteredItems(merged);
            } catch (error) {
                console.error("Failed to load gallery", error);
            }
        };
        loadData();
    }, []);

    // GSAP Flip animation on filter change
    useLayoutEffect(() => {
        if (!galleryRef.current) return;

        // Get current state
        const state = Flip.getState('.gallery-item');
        
        // Apply filter logic
        const newFiltered = activeFilter === '*' 
            ? allProjects 
            : allProjects.filter(item => item.filter === activeFilter);
            
        setFilteredItems(newFiltered);

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
    }, [activeFilter, allProjects]);

    return (
        <div className="relative bg-bg-cream min-h-screen">
            <Banner title="Our Gallery" pagename="Gallery" description="Explore our portfolio of breathtaking real estate projects, interior designs, and architectural marvels." bgimage={bnrimg}/>
            
            <div className="relative py-12 md:py-20">
                <div className="max-w-7xl mx-auto px-4">
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
                    
                    <div ref={galleryRef}>
                        {filteredItems.length === 0 ? (
                            <div className="text-center w-full py-20 text-gray-500 text-xl font-medium bg-white rounded-2xl shadow-sm border border-gray-100">
                                No images found for this category.
                            </div>
                        ) : (
                        <Masonry
                            breakpointCols={breakpointColumnsObj}
                            className="flex w-auto gap-8 mb-12"
                            columnClassName="bg-clip-padding"
                        >
                            {filteredItems.map((item, index) => (
                                <div key={item.id} className="gallery-item mb-8" data-filter={item.filter}>
                                    <div className="sx-box image-hover-block relative group overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-300">
                                        <div className="sx-thum-bx overflow-hidden">
                                            <img src={item.image} alt={item.title} className="w-full object-cover transition-transform duration-700 group-hover:scale-110" style={{ height: ['300px', '450px', '380px', '500px', '320px'][index % 5] }} />
                                        </div>
                                    <div className="sx-info p-t20 text-white absolute bottom-0 left-0 w-full bg-gradient-to-t from-brand-ink/90 via-brand-ink/50 to-transparent p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                                        <h4 className="text-2xl font-bold mb-1 heading-font text-brand-gold drop-shadow-md">{item.title}</h4>
                                        {item.address && <p className="m-b0 text-sm text-gray-200">{item.address}</p>}
                                    </div>
                                    <button 
                                        className="absolute top-4 right-4 bg-white w-12 h-12 rounded-full flex items-center justify-center text-brand-ink opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg border-none cursor-pointer hover:bg-brand-gold hover:text-white hover:scale-110 z-10" 
                                        onClick={(e) => { e.preventDefault(); setLightboxIndex(index); setLightboxOpen(true); }}
                                    >
                                        <Maximize size={20} />
                                    </button>
                                </div>
                            </div>
                            ))}
                        </Masonry>
                        )}
                    </div>
                    
                </div>
            </div>

            {/* Lightbox */}
            <Lightbox
                open={lightboxOpen}
                close={() => setLightboxOpen(false)}
                index={lightboxIndex}
                slides={filteredItems.map(item => ({ src: item.image }))}
            />
        </div>
    );
};

export default Gallery;
