import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { submitContactForm } from '../../lib/api';

var bgimg = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80"; // Luxury house background

const CtaHome = () => {
    const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const data = {
                name: formData.name,
                email: formData.email,
                mobile_no: formData.phone,
                subject: "Quick Inquiry from Home Page",
                message: "Please contact me for a free consultation."
            };
            const response = await submitContactForm(data);
            if (response && response.success) {
                alert("Thank you for your inquiry! We will contact you soon.");
                setFormData({ name: '', phone: '', email: '' });
            } else {
                alert("Failed to submit inquiry. Please try again later.");
            }
        } catch (error) {
            console.error("Submit error:", error);
            alert("An error occurred while submitting. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative py-16 md:py-24 bg-slate-900 overflow-hidden" style={{ backgroundImage: `url(${bgimg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-slate-900/85"></div>
            
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    <div className="lg:col-span-7 text-white space-y-6">
                        <h2 className="text-3xl md:text-5xl font-bold leading-tight">Ready to Find Your Dream Home?</h2>
                        <p className="text-lg md:text-xl text-slate-300 max-w-2xl">
                            Get in touch with our real estate experts today. Whether you want to buy a property or just have some questions, we are here to help you 24/7.
                        </p>
                        
                        <div className="flex flex-wrap gap-4 pt-4">
                            <a href="tel:+919876543210" className="inline-flex items-center gap-3 bg-[#118A43] text-white px-6 py-3 rounded-md font-bold text-lg hover:bg-[#0f7a3b] transition-colors shadow-lg">
                                <i className="fa fa-phone" /> Call Us Now
                            </a>
                            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 bg-[#25D366] text-white px-6 py-3 rounded-md font-bold text-lg hover:bg-[#20bd5a] transition-colors shadow-lg">
                                <i className="fa fa-whatsapp" /> WhatsApp
                            </a>
                        </div>
                    </div>
                    
                    <div className="lg:col-span-5">
                        <div className="bg-white p-8 rounded-xl shadow-2xl">
                            <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">Quick Inquiry</h3>
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div>
                                    <input required type="text" placeholder="Your Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#118A43] focus:border-transparent transition-all" />
                                </div>
                                <div>
                                    <input required type="tel" placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#118A43] focus:border-transparent transition-all" />
                                </div>
                                <div>
                                    <input required type="email" placeholder="Email Address" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#118A43] focus:border-transparent transition-all" />
                                </div>
                                <button type="submit" disabled={isSubmitting} className="w-full bg-[#fb5455] hover:bg-[#e04546] text-white font-bold py-3 rounded-md transition-colors shadow-md disabled:opacity-70">
                                    {isSubmitting ? "Submitting..." : "Get a Free Consultation"}
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CtaHome;
