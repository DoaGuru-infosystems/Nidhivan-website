import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchGalleryCategories, getMediaUrl } from '../../lib/api';
import { ArrowRight } from 'lucide-react';

const HomeGalleryCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadCats = async () => {
            try {
                const res = await fetchGalleryCategories();
                const data = res.data || res;
                if (Array.isArray(data)) {
                    setCategories(data);
                }
            } catch (error) {
                console.error("Failed to load gallery categories", error);
            } finally {
                setLoading(false);
            }
        };
        loadCats();
    }, []);

    const handleCategoryClick = (categoryId) => {
        navigate('/gallery', { state: { activeCategory: categoryId.toString() } });
    };

    if (loading || categories.length === 0) {
        return null;
    }

    // Duplicate array to make seamless marquee
    const marqueeItems = [...categories, ...categories, ...categories, ...categories];

    return (
        <div className="section-full p-t100 p-b80 bg-white mobile-page-padding overflow-hidden relative">
            <style>
                {`
                @keyframes marqueeRightToLeft {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .marquee-container {
                    display: flex;
                    width: max-content;
                    animation: marqueeRightToLeft 40s linear infinite;
                }
                .marquee-container:hover {
                    animation-play-state: paused;
                }
                `}
            </style>

            <div className="container">
                <div className="section-head text-center">
                    <div className="wt-separator-outer separator-center">
                        <div className="wt-separator">
                            <span className="text-primary uppercase font-bold tracking-wider text-sm">Portfolio</span>
                        </div>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2 mb-8">Our Gallery Categories</h2>
                </div>
            </div>

            <div className="w-full relative py-4">
                <div className="marquee-container gap-6 px-3">
                    {marqueeItems.map((cat, index) => (
                        <div 
                            key={`${cat.id}-${index}`} 
                            className="w-[280px] h-[350px] md:w-[320px] md:h-[400px] shrink-0 rounded-2xl overflow-hidden relative group shadow-lg bg-slate-100"
                        >
                            <img 
                                src={cat.thumbnail_image ? getMediaUrl(cat.thumbnail_image) : 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80'} 
                                alt={cat.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6">
                                <h3 className="text-white text-xl md:text-2xl font-bold mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    {cat.title}
                                </h3>
                                <button 
                                    onClick={() => handleCategoryClick(cat.id)}
                                    className="bg-primary text-white w-max px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-black"
                                >
                                    Know More
                                    <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="text-center mt-12">
                <button 
                    onClick={() => navigate('/gallery')}
                    className="inline-flex items-center gap-3 bg-black hover:bg-primary text-white px-8 py-3.5 rounded-full text-base font-semibold transition-all shadow-lg hover:shadow-primary/30"
                >
                    More About
                    <ArrowRight size={18} />
                </button>
            </div>
        </div>
    );
};

export default HomeGalleryCategories;
