import React, { useState } from 'react';
import { submitContactForm } from '../../lib/api';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { siteData } from '../../data/siteContent';

var bgimg = "/images/cta_overlay.webp"; // Luxury house background

const CtaHome = () => {
    const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

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
                setIsSuccess(true);
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
        <section className="relative py-14 md:py-20 lg:py-28 bg-brand-ink overflow-hidden" style={{ backgroundImage: `url(${bgimg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-brand-ink/50"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                    
                    <div className="lg:col-span-7 text-white space-y-4 md:space-y-6">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight heading-font text-brand-gold">
                            Let's Build Your Dream Together
                        </h2>
                        <p className="text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl leading-relaxed">
                            Have questions or want a site visit? Call us, WhatsApp us or visit our office.<br/><br/>जबलपुर के बेहतरीन फार्महाउस प्रोजेक्ट्स में आज ही अपनी प्रॉपर्टी बुक करें और अपने सपनों का घर बनाएं।
                        </p>
                        
                        <div className="flex flex-wrap gap-3 md:gap-4 pt-2 md:pt-4">
                            <a href="tel:+919302736606" className="inline-flex items-center gap-2 md:gap-3 bg-brand-gold text-white px-5 md:px-8 py-3 md:py-4 rounded font-bold text-base md:text-lg hover:bg-white hover:text-brand-ink transition-colors shadow-lg uppercase tracking-wider">
                                <i className="fa fa-phone" /> Call Us Now
                            </a>
                            <a href={`https://wa.me/91${siteData.contactInfo.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 md:gap-3 bg-brand-green text-white px-5 md:px-8 py-3 md:py-4 rounded font-bold text-base md:text-lg hover:bg-white hover:text-brand-ink transition-colors shadow-lg uppercase tracking-wider">
                                <WhatsAppIcon /> WhatsApp
                            </a>
                        </div>
                    </div>
                    
                    <div className="lg:col-span-5">
                        <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl border border-gray-100">
                            {isSuccess ? (
                                <div className="flex flex-col items-center justify-center text-center py-6 min-h-[280px]">
                                    <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold text-brand-ink mb-2">Thank You!</h3>
                                    <p className="text-gray-500 mb-6 text-sm md:text-base">Your inquiry has been sent successfully. We will get back to you shortly.</p>
                                    <button 
                                        onClick={() => setIsSuccess(false)}
                                        className="bg-brand-ink text-white px-6 py-3 rounded-md font-bold hover:bg-brand-gold transition-colors text-sm md:text-base uppercase tracking-wider"
                                    >
                                        Send Another Inquiry
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h3 className="text-xl md:text-2xl font-bold text-brand-ink mb-5 md:mb-6 text-center heading-font">Quick Inquiry</h3>
                                    <form className="flex flex-col gap-4 md:gap-5" onSubmit={handleSubmit}>
                                        <div>
                                            <input required type="text" placeholder="Your Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value.replace(/[^a-zA-Z\s]/g, '').slice(0, 50)})} maxLength="50" className="w-full px-4 py-3 md:py-4 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all bg-gray-50 text-sm md:text-base" />
                                        </div>
                                        <div>
                                            <input required type="tel" placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10)})} maxLength="10" className="w-full px-4 py-3 md:py-4 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all bg-gray-50 text-sm md:text-base" />
                                        </div>
                                        <div>
                                            <input required type="email" placeholder="Email Address" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value.slice(0, 100)})} maxLength="100" className="w-full px-4 py-3 md:py-4 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all bg-gray-50 text-sm md:text-base" />
                                        </div>
                                        <button type="submit" disabled={isSubmitting} className="w-full bg-brand-ink hover:bg-brand-gold text-white font-bold py-3 md:py-4 rounded-md transition-colors shadow-md disabled:opacity-70 uppercase tracking-wider text-base md:text-lg">
                                            {isSubmitting ? "Submitting..." : "Get a Free Consultation"}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default CtaHome;
