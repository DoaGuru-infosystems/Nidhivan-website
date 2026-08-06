import React, { useState } from 'react';
import { submitContactForm } from '../../lib/api';

var bgimg = "/images/cta_overlay.webp"; // Luxury house background

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
        <section className="relative py-20 md:py-28 bg-brand-ink overflow-hidden" style={{ backgroundImage: `url(${bgimg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-brand-ink/50"></div>
            
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                    
                    <div className="lg:col-span-7 text-white space-y-6">
                        <h2 className="text-4xl md:text-5xl font-bold leading-tight heading-font text-brand-gold">
                            Let's Build Your Dream Together
                        </h2>
                        <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed">
                            Have questions or want a site visit? Call us, WhatsApp us or visit our office.<br/><br/>जबलपुर के बेहतरीन फार्महाउस प्रोजेक्ट्स में आज ही अपनी प्रॉपर्टी बुक करें और अपने सपनों का घर बनाएं।
                        </p>
                        
                        <div className="flex flex-wrap gap-4 pt-4">
                            <a href="tel:+919876543210" className="inline-flex items-center gap-3 bg-brand-gold text-white px-8 py-4 rounded font-bold text-lg hover:bg-white hover:text-brand-ink transition-colors shadow-lg uppercase tracking-wider">
                                <i className="fa fa-phone" /> Call Us Now
                            </a>
                            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 bg-brand-green text-white px-8 py-4 rounded font-bold text-lg hover:bg-white hover:text-brand-ink transition-colors shadow-lg uppercase tracking-wider">
                                <i className="fa fa-whatsapp" /> WhatsApp
                            </a>
                        </div>
                    </div>
                    
                    <div className="lg:col-span-5">
                        <div className="bg-white p-8 rounded-xl shadow-2xl border border-gray-100">
                            <h3 className="text-2xl font-bold text-brand-ink mb-6 text-center heading-font">Quick Inquiry</h3>
                            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                                <div>
                                    <input required type="text" placeholder="Your Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value.replace(/[^a-zA-Z\s]/g, '').slice(0, 50)})} maxLength="50" className="w-full px-4 py-4 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all bg-gray-50" />
                                </div>
                                <div>
                                    <input required type="tel" placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10)})} maxLength="10" className="w-full px-4 py-4 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all bg-gray-50" />
                                </div>
                                <div>
                                    <input required type="email" placeholder="Email Address" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value.slice(0, 100)})} maxLength="100" className="w-full px-4 py-4 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all bg-gray-50" />
                                </div>
                                <button type="submit" disabled={isSubmitting} className="w-full bg-brand-ink hover:bg-brand-gold text-white font-bold py-4 rounded-md transition-colors shadow-md disabled:opacity-70 uppercase tracking-wider text-lg">
                                    {isSubmitting ? "Submitting..." : "Get a Free Consultation"}
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default CtaHome;
