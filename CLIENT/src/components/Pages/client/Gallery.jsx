import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Banner from '../../Elements/Banner';
import Masonry from 'react-masonry-css';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { Maximize } from 'lucide-react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { getGalleryItems } from '@/lib/dataStore';

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

const projects = [
    {
        id: 1,
        // image: new URL('../../../images/projects/portrait/pic1.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready
        image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=80", // TEMP LIVE PREVIEW
        title: 'Modern Villa',
        address: 'Mumbai, Maharashtra',
        filter: 'cat-1'
    },
    {
        id: 2,
        // image: new URL('../../../images/projects/portrait/pic2.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready
        image: "https://images.unsplash.com/photo-1745794621090-d856c53b0cc2?w=1600&q=80", // TEMP LIVE PREVIEW
        title: 'Luxury Apartment',
        address: 'Pune, Maharashtra',
        filter: 'cat-2'
    },
    {
        id: 3,
        // image: new URL('../../../images/projects/portrait/pic3.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready
        image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1600&q=80", // TEMP LIVE PREVIEW
        title: 'Industrial Design',
        address: 'Delhi, NCR',
        filter: 'cat-3'
    },
    {
        id: 4,
        // image: new URL('../../../images/projects/portrait/pic4.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready
        image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=80", // TEMP LIVE PREVIEW
        title: 'House Blueprint',
        address: 'Bangalore, Karnataka',
        filter: 'cat-4'
    },
    {
        id: 5,
        // image: new URL('../../../images/projects/portrait/pic5.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1600&q=80", // TEMP LIVE PREVIEW
        title: 'Modern Bathroom',
        address: 'Hyderabad, Telangana',
        filter: 'cat-5'
    },
    {
        id: 6,
        // image: new URL('../../../images/projects/portrait/pic6.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&q=80", // TEMP LIVE PREVIEW
        title: 'Bellevue Project',
        address: 'Chennai, Tamil Nadu',
        filter: 'cat-4'
    },
    {
        id: 7,
        // image: new URL('../../../images/projects/portrait/pic7.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready
        image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80", // TEMP LIVE PREVIEW
        title: 'Outdoor Pavilion',
        address: 'Kochi, Kerala',
        filter: 'cat-3'
    },
    {
        id: 8,
        // image: new URL('../../../images/projects/portrait/pic8.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1600&q=80", // TEMP LIVE PREVIEW
        title: 'Museum Interiors',
        address: 'Kolkata, West Bengal',
        filter: 'cat-2'
    },
    {
        id: 9,
        // image: new URL('../../../images/projects/portrait/pic9.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready
        image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=80", // TEMP LIVE PREVIEW
        title: 'Minimalist House',
        address: 'Ahmedabad, Gujarat',
        filter: 'cat-1'
    }
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
    const [activeFilter, setActiveFilter] = useState('*');
    const galleryRef = useRef(null);
    const [allProjects, setAllProjects] = useState(projects);
    const [filteredItems, setFilteredItems] = useState(projects);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    useEffect(() => {
        const dynamic = getGalleryItems().map(item => ({
            ...item,
            // Simple map: if dynamic category matches a known label, use its filter, else use category as string
            filter: filters.find(f => f.label === item.category)?.filter || item.category 
        }));
        const merged = [...dynamic, ...projects];
        setAllProjects(merged);
        setFilteredItems(merged);
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
    }, [activeFilter]);

    return (
        <div className="relative">
            <Banner title="Our Gallery" pagename="Gallery" description="Explore our portfolio of breathtaking real estate projects, interior designs, and architectural marvels." bgimage={bnrimg}/>
            
            <div className="relative py-8 md:py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="filter-wrap pb-8 text-center">
                        <ul className="filter-navigation masonry-filter clearfix flex flex-wrap justify-center gap-2">
                            <li className={`cursor-pointer px-4 py-2 font-semibold transition-colors rounded ${activeFilter === '*' ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200'}`} 
                                onClick={() => setActiveFilter('*')}>
                                All
                            </li>
                            {filters.map((item, index) => (
                                <li key={index} 
                                    className={`cursor-pointer px-4 py-2 font-semibold transition-colors rounded ${activeFilter === item.filter ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                                    onClick={() => setActiveFilter(item.filter)}>
                                    {item.label}
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div ref={galleryRef}>
                        <Masonry
                            breakpointCols={breakpointColumnsObj}
                            className="flex w-auto gap-8 mb-12"
                            columnClassName="bg-clip-padding"
                        >
                            {filteredItems.map((item, index) => (
                                <div key={item.id} className="gallery-item mb-8" data-filter={item.filter}>
                                    <div className="sx-box image-hover-block relative group overflow-hidden rounded-sm">
                                        <div className="sx-thum-bx overflow-hidden">
                                            <img src={item.image} alt={item.title} className="w-full object-cover transition-transform duration-500 group-hover:scale-110" style={{ height: ['300px', '450px', '380px', '500px', '320px'][index % 5] }} />
                                        </div>
                                    <div className="sx-info p-t20 text-white absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                        <h4 className="sx-tilte text-xl font-bold mb-1"><NavLink to={"#"} style={{ pointerEvents: 'none' }} className="text-white">{item.title}</NavLink></h4>
                                        <p className="m-b0 text-sm text-gray-200">{item.address}</p>
                                    </div>
                                    <button 
                                        className="absolute top-4 right-4 bg-white w-10 h-10 rounded-full flex items-center justify-center text-[#2B2B2B] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md border-none cursor-pointer hover:scale-110 z-10" 
                                        onClick={(e) => { e.preventDefault(); setLightboxIndex(index); setLightboxOpen(true); }}
                                    >
                                        <Maximize size={16} />
                                    </button>
                                </div>
                            </div>
                            ))}
                        </Masonry>
                    </div>
                    
                    <div className="text-center load-more-btn-outer" style={{ backgroundImage: 'url(' + bgimg1 + ')' }}>
                        <button className="site-button-secondry btn-half"><span>Load More</span></button>
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
