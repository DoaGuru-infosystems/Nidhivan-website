import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Banner from '../../Elements/Banner';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { Maximize, MapPin, ChevronRight } from 'lucide-react';
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

var bnrimg = "images/projects_banner.webp"; // TEMP LIVE PREVIEW
// var bgimg1 = new URL('../../../images/background/cross-line.png', import.meta.url).href;

import { fetchAllProjects, getMediaUrl } from '@/lib/api';

const ProjectGrid3 = ({ statusFilter, pageTitle }) => {
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
                    image: item.images && item.images.length > 0 ? getMediaUrl(item.images[0].image_url || item.images[0].image || item.images[0]) : null
                }));
                
                // Filter by status if statusFilter prop is provided
                let merged = dynamic;
                if (statusFilter) {
                    merged = dynamic.filter(item => item.status && item.status.toLowerCase() === statusFilter.toLowerCase());
                }

                setAllProjects(merged);
                setFilteredItems(merged);
            } catch (error) {
                console.error("Failed to load projects", error);
            }
        };
        loadProjects();
    }, [statusFilter]);

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

                        

            
            <Banner title={pageTitle || "Our Projects"} pagename={pageTitle || "Projects"} description="Explore our premium farmhouses and plots." bgimage={bnrimg}/>
            
            <div className="relative py-12 md:py-20">
                <div className="max-w-7xl mx-auto px-4">

                    {/* Filter Navigation (Optional: if we want to show it, we need buttons. Currently hidden as per old design unless added) */}
                    
                    {/* GALLERY CONTENT */}
                    <div ref={galleryRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {filteredItems.length === 0 ? (
                            <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center w-full py-12 text-gray-500 text-xl font-medium">
                                No projects found in this category.
                            </div>
                        ) : (
                            filteredItems.map((item, index) => (
                                <div key={item.id} className="gallery-item" data-filter={item.filter}>
                                    <div className="bg-white rounded-xl shadow-md border border-gray-100 group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative h-full flex flex-col">
                                        {/* Image Container */}
                                        <div className="relative h-64 overflow-hidden flex-shrink-0">
                                            <img src={item.image || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80"} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                            {/* Tag */}
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-brand-ink text-brand-gold px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase shadow-md">
                                                    {item.category || 'Project'}
                                                </span>
                                            </div>
                                            {/* Lightbox button */}
                                            <button 
                                                className="absolute top-4 right-4 bg-white w-10 h-10 rounded-full flex items-center justify-center text-brand-ink opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md hover:bg-brand-gold hover:text-white z-10" 
                                                onClick={(e) => { e.preventDefault(); setLightboxIndex(index); setLightboxOpen(true); }}
                                            >
                                                <Maximize size={16} />
                                            </button>
                                        </div>
                                        
                                        {/* Content */}
                                        <div className="p-6 border-b-4 border-transparent group-hover:border-brand-gold transition-colors duration-300 flex-grow flex flex-col">
                                            <h4 className="text-xl font-bold mb-2 heading-font text-brand-ink group-hover:text-brand-gold transition-colors">
                                                <NavLink to={item.id ? `/project-detail/${item.id}` : "/project-detail"} className="block truncate">
                                                    {item.title}
                                                </NavLink>
                                            </h4>
                                            <p className="text-gray-500 text-sm flex items-center gap-2 mb-6 truncate">
                                                <MapPin size={14} className="text-brand-green flex-shrink-0" />
                                                {item.address || 'Location unavailable'}
                                            </p>
                                            
                                            <div className="mt-auto">
                                                <NavLink to={item.id ? `/project-detail/${item.id}` : "/project-detail"} className="text-brand-green font-bold text-sm flex items-center gap-1 hover:text-brand-ink transition-colors uppercase tracking-wide">
                                                    View Details <ChevronRight size={16} />
                                                </NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    
                </div>
            </div>

            {/* Lightbox */}
            <Lightbox
                open={lightboxOpen}
                close={() => setLightboxOpen(false)}
                index={lightboxIndex}
                slides={filteredItems.map(item => ({ src: item.image || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=80" }))}
            />
        </div>
    );
};

export default ProjectGrid3;
