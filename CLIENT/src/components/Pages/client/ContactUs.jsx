import React from 'react';
import Banner from '../../Elements/Banner';
import GoogleMapIframe from '../../Elements/GoogleMapIframe';
import { siteData } from '../../../data/siteContent';
import { submitContactForm } from '../../../lib/api';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { MapPin, Phone, Mail } from 'lucide-react';

var bnrimg = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=80"; // TEMP LIVE PREVIEW

const formSchema = z.object({
    username: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(10, "Message must be at least 10 characters")
});

const ContactUs = () => {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            message: ""
        }
    });

    const onSubmit = async (data) => {
        try {
            const formData = {
                name: data.username,
                email: data.email,
                mobile_no: data.phone || "Not Provided", // Map or fallback
                subject: "Contact Us Form Inquiry",
                message: data.message
            };
            
            const response = await submitContactForm(formData);
            
            if (response && response.success) {
                alert("Thank you for your message! We will get back to you soon.");
                reset();
            } else {
                alert("Failed to submit inquiry. Please try again later.");
            }
        } catch (error) {
            console.error("Submit error:", error);
            alert("An error occurred while submitting. Please try again.");
        }
    };

    return (
        <div className="relative bg-bg-cream min-h-screen">
            <Banner title="Contact Us" pagename="Contact Us" description={siteData.aboutUs.shortDescription} bgimage={bnrimg}/>
            
            <div className="relative py-24">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-start">
                        
                        {/* LEFT COLUMN: INFO */}
                        <div className="flex flex-col justify-center space-y-12">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-bold heading-font text-brand-ink mb-6">
                                    Get in touch
                                </h2>
                                <p className="text-lg text-gray-600 max-w-md leading-relaxed">
                                    Have a question or want to learn more about our premium properties? We'd love to hear from you. Drop us a message and our experts will get back to you shortly.
                                </p>
                            </div>
                            
                            <div className="space-y-8">
                                <div className="flex items-start gap-6 group">
                                    <div className="flex-shrink-0 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 group-hover:border-brand-gold group-hover:bg-brand-gold/5 transition-colors">
                                        <Phone size={24} className="text-brand-gold" />
                                    </div>
                                    <div className="pt-1">
                                        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Phone Number</h4>
                                        <p className="text-xl font-medium text-brand-ink">{siteData.contactInfo.phone}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-6 group">
                                    <div className="flex-shrink-0 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 group-hover:border-brand-gold group-hover:bg-brand-gold/5 transition-colors">
                                        <Mail size={24} className="text-brand-gold" />
                                    </div>
                                    <div className="pt-1">
                                        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Email Address</h4>
                                        <p className="text-xl font-medium text-brand-ink">{siteData.contactInfo.email}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-6 group">
                                    <div className="flex-shrink-0 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 group-hover:border-brand-gold group-hover:bg-brand-gold/5 transition-colors">
                                        <MapPin size={24} className="text-brand-gold" />
                                    </div>
                                    <div className="pt-1">
                                        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Headquarters</h4>
                                        <p className="text-lg font-medium text-brand-ink max-w-xs leading-relaxed">{siteData.contactInfo.address}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: FORM */}
                        <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 p-10 md:p-14">
                            <h3 className="text-3xl font-bold heading-font text-brand-ink mb-8">Send us a message</h3>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold tracking-wider uppercase text-gray-500 mb-2">Your Name</label>
                                    <Input 
                                        {...register("username")} 
                                        type="text" 
                                        placeholder="John Doe" 
                                        className="w-full bg-gray-50 border-transparent focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-all rounded-xl h-14 text-lg"
                                    />
                                    {errors.username && <p className="text-red-500 text-sm mt-2">{errors.username.message}</p>}
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-bold tracking-wider uppercase text-gray-500 mb-2">Email Address</label>
                                    <Input 
                                        {...register("email")} 
                                        type="email" 
                                        placeholder="john@example.com" 
                                        className="w-full bg-gray-50 border-transparent focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-all rounded-xl h-14 text-lg"
                                    />
                                    {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>}
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-bold tracking-wider uppercase text-gray-500 mb-2">Message</label>
                                    <Textarea 
                                        {...register("message")} 
                                        rows={5} 
                                        placeholder="How can we help you?" 
                                        className="w-full bg-gray-50 border-transparent focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-all rounded-xl min-h-[140px] text-lg py-4 resize-none"
                                    />
                                    {errors.message && <p className="text-red-500 text-sm mt-2">{errors.message.message}</p>}
                                </div>
                                
                                <div className="pt-4">
                                    <button 
                                        type="submit" 
                                        disabled={isSubmitting}
                                        className="w-full bg-brand-ink text-white rounded-xl h-14 font-bold uppercase tracking-widest text-sm hover:bg-brand-gold hover:text-brand-ink transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-3 shadow-md"
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center gap-2">
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Submitting...
                                            </span>
                                        ) : 'Send Message'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* GOOGLE MAP */}
            <div className="bg-bg-cream pb-24 px-4 max-w-7xl mx-auto">
                <div className="rounded-[2rem] overflow-hidden shadow-xl border border-gray-100 h-[500px]">
                    <GoogleMapIframe />
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
