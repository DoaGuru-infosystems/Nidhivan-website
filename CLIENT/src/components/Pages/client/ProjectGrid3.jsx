import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Banner from '../../Elements/Banner';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { Maximize } from 'lucide-react';
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


// var bnrimg = new URL('../../../images/banner/3.jpg', import.meta.url).href; // ORIGINAL DUMMY - restore when real property photos are ready

var bnrimg = "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=1600&q=80"; // TEMP LIVE PREVIEW
var bgimg1 = new URL('../../../images/background/cross-line.png', import.meta.url).href;

import { fetchAllProjects, getMediaUrl } from '@/lib/api';

const ProjectGrid3 = () => {
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
                    address: item.location,
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
        <div className="relative">
            <Banner title="Grid 3 Columns" pagename="Project With Grid 3 Columns" description="The essence of interior design will always be about people and how they live. It is about the realities of what makes for an attractive, civilized." bgimage={bnrimg}/>
            
            <div className="relative py-8 md:py-20">
                <div className="max-w-7xl mx-auto px-4">

                    {/* GALLERY CONTENT */}
                    <div ref={galleryRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12">
                        {filteredItems.length === 0 ? (
                            <div className="col-span-1 sm:col-span-2 md:col-span-3 text-center w-full py-12 text-gray-500 text-xl font-medium">
                                No content available
                            </div>
                        ) : (
                            filteredItems.map((item, index) => (
                            <div key={item.id} className="gallery-item" data-filter={item.filter}>
                                <div className="sx-box image-hover-block relative group overflow-hidden rounded-sm">
                                    <div className="sx-thum-bx">
                                        <img src={item.image} alt={item.title} className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-110" />
                                    </div>
                                    <div className="sx-info p-t20 text-white absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                        <h4 className="sx-tilte text-xl font-bold mb-1"><NavLink to={item.id ? `/project-detail/${item.id}` : "/project-detail"} className="text-white">{item.title}</NavLink></h4>
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
                            ))
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

export default ProjectGrid3;
