import React, { useState, useRef, useLayoutEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Banner from '../../Elements/Banner';
import Masonry from 'react-masonry-css';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { Maximize, Plus } from 'lucide-react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

gsap.registerPlugin(Flip);

const filters = [
    { label: "Architecture", filter: "cat-1" },
    { label: "Decor", filter: "cat-2" },
    { label: "Outdoor", filter: "cat-3" },
    { label: "Interiors", filter: "cat-4" },
    { label: "Residential", filter: "cat-5" }
];

const projects = [
    {
        id: 1,
        // image: new URL('../../../images/projects/portrait/pic4.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&q=80", // TEMP LIVE PREVIEW
        title: 'Life style building',
        description: 'We combine Interior and Exterior Design services and often provide...',
        filter: 'cat-1'
    },
    {
        id: 2,
        // image: new URL('../../../images/projects/square/pic9.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready
        image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80", // TEMP LIVE PREVIEW
        title: 'Modern Bathroom',
        description: 'Landscape plans for drainage problems may also entail planting.',
        filter: 'cat-2'
    },
    {
        id: 3,
        // image: new URL('../../../images/projects/square/pic10.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1600&q=80", // TEMP LIVE PREVIEW
        title: 'Dream House',
        description: 'We provide a range of architectural 3D modeling services to our customers...',
        filter: 'cat-3'
    },
    {
        id: 4,
        // image: new URL('../../../images/projects/portrait/pic6.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready
        image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=80", // TEMP LIVE PREVIEW
        title: 'Vilters',
        description: 'Landscape plans for drainage problems may also entail planting beds away ...',
        filter: 'cat-4'
    },
    {
        id: 5,
        // image: new URL('../../../images/projects/square/pic7.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready
        image: "https://images.unsplash.com/photo-1745794621090-d856c53b0cc2?w=1600&q=80", // TEMP LIVE PREVIEW
        title: 'Bellevue Projects',
        description: 'Project management is the process by which our team plans and executes...',
        filter: 'cat-5'
    },
    {
        id: 6,
        // image: new URL('../../../images/projects/square/pic8.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready
        image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1600&q=80", // TEMP LIVE PREVIEW
        title: 'Modish Interior',
        description: 'Our team also provides consultations on all architectural issues, even if you need...',
        filter: 'cat-4'
    },
    {
        id: 7,
        // image: new URL('../../../images/projects/portrait/pic9.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready
        image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=80", // TEMP LIVE PREVIEW
        title: 'Living Room',
        description: 'Landscape plans for drainage problems may also entail planting beds...',
        filter: 'cat-3'
    },
    {
        id: 8,
        // image: new URL('../../../images/projects/square/pic2.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1600&q=80", // TEMP LIVE PREVIEW
        title: 'Wall Interior',
        description: 'We combine Interior and Exterior Design services and often provide...',
        filter: 'cat-2'
    },
    {
        id: 9,
        // image: new URL('../../../images/projects/portrait/pic2.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&q=80", // TEMP LIVE PREVIEW
        title: 'Dream Home',
        description: 'We combine Interior and Exterior Design services and often provide...',
        filter: 'cat-3'
    },
    {
        id: 10,
        // image: new URL('../../../images/projects/portrait/pic3.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready
        image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80", // TEMP LIVE PREVIEW
        title: 'Queens Museum',
        description: 'We combine Interior and Exterior Design services and often provide...',
        filter: 'cat-3'
    },
    {
        id: 11,
        // image: new URL('../../../images/projects/square/pic1.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1600&q=80", // TEMP LIVE PREVIEW
        title: 'Life style building',
        description: 'Project management is the process by which our team plans and executes...',
        filter: 'cat-1'
    },
    {
        id: 12,
        // image: new URL('../../../images/projects/square/pic3.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready
        image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=80", // TEMP LIVE PREVIEW
        title: 'Hotel Shears',
        description: 'Landscape plans for drainage problems may also entail planting beds...',
        filter: 'cat-2'
    },
    {
        id: 13,
        // image: new URL('../../../images/projects/portrait/pic4.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready
        image: "https://images.unsplash.com/photo-1745794621090-d856c53b0cc2?w=1600&q=80", // TEMP LIVE PREVIEW
        title: 'Modern Bathroom',
        description: 'We combine Interior and Exterior Design services and often provide...',
        filter: 'cat-1'
    },
    {
        id: 14,
        // image: new URL('../../../images/projects/square/pic9.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready
        image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1600&q=80", // TEMP LIVE PREVIEW
        title: 'Dream House',
        description: 'Landscape plans for drainage problems may also entail planting beds...',
        filter: 'cat-2'
    },
    {
        id: 15,
        // image: new URL('../../../images/projects/square/pic10.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready
        image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=80", // TEMP LIVE PREVIEW
        title: 'Life style building',
        description: 'Project management is the process by which our team plans and executes...',
        filter: 'cat-3'
    }
];

// var bnrimg = new URL('../../../images/banner/9.jpg', import.meta.url).href; // ORIGINAL DUMMY - restore when real property photos are ready

var bnrimg = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80"; // TEMP LIVE PREVIEW
var bgimg1 = new URL('../../../images/background/cross-line.png', import.meta.url).href;

import { getProjects } from '@/lib/dataStore';

const breakpointColumnsObj = {
  default: 3,
  992: 3,
  768: 2,
  500: 1
};

const ProjectMasonary3 = () => {
    const [activeFilter, setActiveFilter] = useState('*');
    const galleryRef = useRef(null);
    const [allProjects, setAllProjects] = useState(projects);
    const [filteredItems, setFilteredItems] = useState(projects);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    useEffect(() => {
        const dynamic = getProjects().map(item => ({
            ...item,
            description: item.location, // mapping location to description
            filter: filters.find(f => f.label === item.category)?.filter || item.category 
        }));
        const merged = [...dynamic, ...projects];
        setAllProjects(merged);
        setFilteredItems(merged);
    }, []);

    // GSAP Flip animation on filter change
    useLayoutEffect(() => {
        if (!galleryRef.current) return;

        // Get current state of items
        const state = Flip.getState('.masonry-item');
        
        // Filter projects
        const newFiltered = activeFilter === '*' 
            ? allProjects 
            : allProjects.filter(item => item.filter === activeFilter);
            
        setFilteredItems(newFiltered);

        // Wait for React to render the masonry grid, then animate
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
            <Banner title="Masonry With 3 Columns" pagename="Project with Masonry With 3 Columns" description="The essence of interior design will always be about people and how they live. It is about the realities of what makes for an attractive, civilized." bgimage={bnrimg}/>
            
            <div className="relative py-8 md:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Filter Nav */}
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
                    
                    {/* GALLERY CONTENT */}
                    <div ref={galleryRef}>
                        <Masonry
                          breakpointCols={breakpointColumnsObj}
                          className="flex w-auto gap-8 mb-12"
                          columnClassName="bg-clip-padding"
                        >
                            {filteredItems.map((item, index) => (
                                <div key={item.id} className="masonry-item mb-8" data-filter={item.filter}>
                                    <div className="project-mas hover-shadow group">
                                        <div className="image-effect-one relative overflow-hidden rounded-t-sm">
                                            <img src={item.image} alt={item.title} className="w-full transition-transform duration-500 group-hover:scale-110" />
                                            <div className="figcaption absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <button 
                                                    className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-[#2B2B2B] shadow-md transition-transform hover:scale-110 border-none cursor-pointer" 
                                                    onClick={(e) => { e.preventDefault(); setLightboxIndex(index); setLightboxOpen(true); }}
                                                >
                                                    <Maximize size={20} />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="project-info p-a20 bg-gray p-6 rounded-b-sm relative">
                                            <h4 className="sx-tilte m-tb0 text-lg font-bold mb-2"><NavLink to={item.id ? `/project-detail/${item.id}` : "/project-detail"}>{item.title}</NavLink></h4>
                                            <p className="text-gray-600 text-sm">{item.description}</p>
                                            <NavLink to={item.id ? `/project-detail/${item.id}` : "/project-detail"} className="absolute right-6 -top-6 bg-[#ff5e14] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform hover:-translate-y-1">
                                                <Plus size={24} />
                                            </NavLink>
                                        </div>
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

export default ProjectMasonary3;