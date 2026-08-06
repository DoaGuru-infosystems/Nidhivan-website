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

    if (loading) {
        return null;
    }

    return (
        <div className="section-full p-t100 p-b80 bg-white mobile-page-padding relative">
            <div className="w-full">
                <div className="section-head flex flex-col items-center text-center">
                    <span className="text-[#9C652A] uppercase font-bold tracking-widest text-sm mb-2">Real Places. Real Families. Real Happiness.</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#5F351D] mb-4 uppercase">Our Gallery Categories</h2>
                    <p className="text-gray-600 max-w-2xl text-center mb-8 text-lg">Take a closer look at our farmhouse communities, interiors and project development.</p>
                </div>
            </div>

            {categories.length === 0 ? (
                <div className="w-full flex justify-center items-center py-12">
                    <p className="text-gray-500 text-xl font-medium">No data found</p>
                </div>
            ) : (
                <div className="w-full relative py-4 container mx-auto">
                    <div className="flex flex-wrap justify-center gap-6 px-3">
                        { categories.map((cat, index) => (
                            <div
                                key={ `${cat.id}-${index}` }
                                className="w-[280px] h-[350px] md:w-[320px] md:h-[400px] shrink-0 rounded-2xl overflow-hidden relative group shadow-lg bg-slate-100"
                            >
                                <img
                                    src={ cat.thumbnail_image ? getMediaUrl(cat.thumbnail_image) : '' }
                                    alt={ cat.title }
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center p-6 transition-colors duration-300 group-hover:bg-black/60">
                                    <h3 className="text-white text-2xl md:text-3xl font-bold mb-5 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 uppercase tracking-wide text-center">
                                        { cat.title }
                                    </h3>
                                    <button
                                        onClick={ () => handleCategoryClick(cat.id) }
                                        className="bg-[#9C652A] text-white w-max px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#F9BA51] hover:text-[#5F351D] shadow-lg"
                                    >
                                        Know More
                                        <ArrowRight size={ 16 } />
                                    </button>
                                </div>
                            </div>
                        )) }
                    </div>
                </div>
            )}

            <div className="text-center mt-12">
                <button
                    onClick={ () => navigate('/gallery') }
                    className="inline-flex items-center gap-3 bg-[#9C652A] text-white hover:bg-[#F9BA51] hover:text-[#5F351D] px-10 py-4 rounded-full text-lg font-bold transition-all shadow-lg"
                >
                    Explore Full Gallery
                    <ArrowRight size={ 20 } />
                </button>
            </div>
        </div>
    );
};

export default HomeGalleryCategories;
