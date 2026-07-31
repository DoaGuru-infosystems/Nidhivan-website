import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { siteData } from '../../data/siteContent';
import { Quote } from 'lucide-react';
import { fetchAllTestimonials } from '@/lib/api';

import 'swiper/css';
import 'swiper/css/pagination';

const Testimonials1 = () => {
    const [allTestimonials, setAllTestimonials] = useState(siteData.testimonials);

    useEffect(() => {
        const loadTestimonials = async () => {
            try {
                const response = await fetchAllTestimonials();
                const data = response.data || response;
                const dynamic = data.map(t => ({
                    ...t,
                    name: t.client_name,
                    role: t.designation || t.profession, // Support both new backend format and dummy format
                    text: t.text_content || t.quote
                }));
                setAllTestimonials(dynamic);
            } catch (error) {
                console.error("Failed to load testimonials", error);
            }
        };
        loadTestimonials();
    }, []);

    return (
        <section className="py-20 bg-bg-cream">
            <div className="max-w-7xl mx-auto px-4">
                
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h4 className="text-brand-green font-semibold uppercase tracking-wider mb-2">Testimonials</h4>
                    <h2 className="text-4xl md:text-5xl heading-font text-brand-ink mb-4">What Our Clients Say</h2>
                    <div className="w-24 h-1 bg-brand-gold mx-auto"></div>
                </div>

                {/* TESTIMONIAL START */}
                <Swiper
                    modules={[Autoplay, Pagination]}
                    loop={true}
                    autoplay={{ delay: 6000, disableOnInteraction: false }}
                    pagination={{ clickable: true, el: '.testimonial-pagination' }}
                    spaceBetween={30}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="pb-16"
                >
                    {allTestimonials.map((item, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm relative h-full flex flex-col justify-between mt-8 hover:-translate-y-2 transition-transform duration-300">
                                    <Quote className="absolute -top-6 right-8 text-brand-gold opacity-20 w-16 h-16" />
                                    
                                    <div className="mb-6 relative z-10">
                                        <p className="italic text-gray-600 leading-relaxed text-lg">"{item.text}"</p>
                                    </div>
                                    
                                    <div className="flex items-center gap-4 border-t border-gray-100 pt-6 mt-auto">
                                        <div className="w-14 h-14 rounded-full flex items-center justify-center bg-brand-ink text-brand-gold text-2xl font-bold heading-font shadow-md flex-shrink-0">
                                            {item.name ? item.name.charAt(0).toUpperCase() : 'N'}
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-brand-ink heading-font">{item.name}</h4>
                                            <span className="text-sm text-brand-green font-medium">{item.role}</span>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
                <div className="testimonial-pagination flex justify-center mt-8 gap-2"></div>

            </div>
        </section>
    );
};

export default Testimonials1;
