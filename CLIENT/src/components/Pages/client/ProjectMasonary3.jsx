import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
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


// var bnrimg = new URL('../../../images/banner/9.jpg', import.meta.url).href; // ORIGINAL DUMMY - restore when real property photos are ready

var bnrimg = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80"; // TEMP LIVE PREVIEW
var bgimg1 = new URL('../../../images/background/cross-line.png', import.meta.url).href;

import { fetchAllProjects, getMediaUrl } from '@/lib/api';

const breakpointColumnsObj = {
  default: 3,
  992: 3,
  768: 2,
  500: 1
};

const ProjectMasonary3 = () => {
    const [activeFilter, setActiveFilter] = useState('*');
    const galleryRef = useRef(null);
    const [allProjects, setAllProjects] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const response = await fetchAllProjects();
                const data = response.data || response;
                const dynamic = data.map(item => ({
                    ...item,
                    description: item.location,
                    filter: filters.find(f => f.label === item.category)?.filter || item.category,
                    image: item.images && item.images.length > 0 ? getMediaUrl(item.images[0]) : null
                }));
                const merged = dynamic;
                setAllProjects(merged);
                setFilteredItems(merged);
            } catch (error) {
                console.error("Failed to load projects", error);
            }
        };
        loadProjects();
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

                    {/* GALLERY CONTENT */}
                    <div ref={galleryRef}>
                        {filteredItems.length === 0 ? (
                            <div className="text-center w-full py-12 text-gray-500 text-xl font-medium">
                                No content available
                            </div>
                        ) : (
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
                        )}
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
