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

// var bnrimg = new URL('../../../images/banner/9.jpg', import.meta.url).href; // ORIGINAL DUMMY - restore when real property photos are ready

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
        <div className="relative bg-gray-50/50">
            <Banner title="Contact Us" pagename="Contact Us" description={siteData.aboutUs.shortDescription} bgimage={bnrimg}/>
            
            <div className="relative py-20">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-start">
                        
                        {/* LEFT COLUMN: INFO */}
                        <div className="flex flex-col justify-center space-y-8 pt-4">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 mb-4">
                                    Get in touch
                                </h2>
                                <p className="text-lg text-neutral-500 max-w-md">
                                    Have a question or want to learn more about our projects? We'd love to hear from you. Drop us a message and we'll reply as soon as possible.
                                </p>
                            </div>
                            
                            <div className="space-y-6 pt-4">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-neutral-100 text-[#fb5455]">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-1">Phone Number</h4>
                                        <p className="text-lg font-medium text-neutral-900">{siteData.contactInfo.phone}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-neutral-100 text-[#fb5455]">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-1">Email Address</h4>
                                        <p className="text-lg font-medium text-neutral-900">{siteData.contactInfo.email}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-neutral-100 text-[#fb5455]">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-1">Headquarters</h4>
                                        <p className="text-lg font-medium text-neutral-900 max-w-xs">{siteData.contactInfo.address}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: FORM */}
                        <div className="bg-white rounded-3xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] p-8 md:p-10">
                            <h3 className="text-2xl font-bold text-neutral-900 mb-6">Send us a message</h3>
                            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1">Your Name</label>
                                    <Input 
                                        {...register("username")} 
                                        type="text" 
                                        placeholder="John Doe" 
                                        maxLength="50"
                                        onInput={(e) => { e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, ''); }}
                                        className="w-full bg-neutral-50 border-neutral-200 focus:bg-white transition-colors rounded-xl h-12"
                                    />
                                    {errors.username && <p className="text-red-500 text-sm mt-1.5">{errors.username.message}</p>}
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1">Email Address</label>
                                    <Input 
                                        {...register("email")} 
                                        type="email" 
                                        placeholder="john@example.com" 
                                        maxLength="100"
                                        className="w-full bg-neutral-50 border-neutral-200 focus:bg-white transition-colors rounded-xl h-12"
                                    />
                                    {errors.email && <p className="text-red-500 text-sm mt-1.5">{errors.email.message}</p>}
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1">Message</label>
                                    <Textarea 
                                        {...register("message")} 
                                        rows={4} 
                                        placeholder="How can we help you?" 
                                        className="w-full bg-neutral-50 border-neutral-200 focus:bg-white transition-colors rounded-xl min-h-[120px] resize-none"
                                    />
                                    {errors.message && <p className="text-red-500 text-sm mt-1.5">{errors.message.message}</p>}
                                </div>
                                
                                <div className="pt-2">
                                    <button 
                                        type="submit" 
                                        disabled={isSubmitting}
                                        className="w-full bg-neutral-900 text-white rounded-xl h-12 font-medium hover:bg-neutral-800 focus:ring-4 focus:ring-neutral-900/20 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center gap-2">
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
            <div className="bg-white pb-12">
                <GoogleMapIframe />
            </div>
        </div>
    );
};

export default ContactUs;
