import React from 'react';
import Banner from './../Elements/Banner';
import GoogleMapReact from 'google-map-react';
import { siteData } from '../../data/siteContent';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

var bnrimg = new URL('./../../images/banner/9.jpg', import.meta.url).href;

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const formSchema = z.object({
    username: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(10, "Message must be at least 10 characters")
});

const ContactUs = () => {
    const defaultProps = {
        center: {
            lat: 34.073280,
            lng: -118.251410
        },
        zoom: 12
    };

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
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log("Form Data Submitted:", data);
        alert("Thank you for your message! We will get back to you soon.");
        reset();
    };

    return (
        <div className="page-content">
            <Banner title="Contact Us" pagename="Contact Us" description={siteData.aboutUs.shortDescription} bgimage={bnrimg}/>
            
            <div className="section-full p-tb80 inner-page-padding">
                <div className="container">
                    <div className="section-content">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            
                            {/* CONTACT FORM */}
                            <div className="lg:col-span-8">
                                <form onSubmit={handleSubmit(onSubmit)} className="contact-form cons-contact-form bg-gray p-a30 rounded-lg shadow-sm">
                                    <div className="contact-one">
                                        <div className="section-head">
                                            <div className="sx-separator-outer separator-left">
                                                <div className="sx-separator bg-white bg-moving bg-repeat-x" style={{ backgroundImage: 'url(images/background/cross-line2.png)' }}>
                                                    <h3 className="sep-line-one">Form</h3>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-6">
                                            <div className="form-group mb-0">
                                                <Input 
                                                    {...register("username")} 
                                                    type="text" 
                                                    placeholder="Name" 
                                                    className="w-full h-12 bg-white border-gray-200"
                                                />
                                                {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
                                            </div>
                                            <div className="form-group mb-0">
                                                <Input 
                                                    {...register("email")} 
                                                    type="email" 
                                                    placeholder="Email" 
                                                    className="w-full h-12 bg-white border-gray-200"
                                                />
                                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                                            </div>
                                            <div className="form-group mb-0">
                                                <Textarea 
                                                    {...register("message")} 
                                                    rows={4} 
                                                    placeholder="Message" 
                                                    className="w-full min-h-[120px] bg-white border-gray-200"
                                                />
                                                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                                            </div>
                                            
                                            <div className="text-right">
                                                <button 
                                                    type="submit" 
                                                    disabled={isSubmitting}
                                                    className="site-button btn-half disabled:opacity-70"
                                                >
                                                    <span>{isSubmitting ? 'Submitting...' : 'Submit'}</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            {/* CONTACT INFO */}
                            <div className="lg:col-span-4">
                                <div className="contact-info block-shadow bg-white bg-center p-a40 rounded-lg h-full" style={{ backgroundImage: 'url(images/background/bg-map.png)' }}>
                                    <div>
                                        <div className="section-head">
                                            <div className="sx-separator-outer separator-left">
                                                <div className="sx-separator bg-white bg-moving bg-repeat-x" style={{ backgroundImage: 'url(images/background/cross-line2.png)' }}>
                                                    <h3 className="sep-line-one">Info</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="sx-icon-box-wraper left p-b30">
                                            <div className="icon-xs"><i className="fa fa-phone" /></div>
                                            <div className="icon-content">
                                                <h5 className="m-t0">Phone number</h5>
                                                <p>{siteData.contactInfo.phone}</p>
                                            </div>
                                        </div>
                                        <div className="sx-icon-box-wraper left p-b30">
                                            <div className="icon-xs"><i className="fa fa-envelope" /></div>
                                            <div className="icon-content">
                                                <h5 className="m-t0">Email address</h5>
                                                <p>{siteData.contactInfo.email}</p>
                                            </div>
                                        </div>
                                        <div className="sx-icon-box-wraper left">
                                            <div className="icon-xs"><i className="fa fa-map-marker" /></div>
                                            <div className="icon-content">
                                                <h5 className="m-t0">Address info</h5>
                                                <p>{siteData.contactInfo.address}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className="gmap-outline">
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyAfY1DRbspf6E3jYUso-PeI_tdfRXA59i0" }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                    >
                    <AnyReactComponent lat={34.073280} lng={-118.251410} text={<i className="fa fa-map-marker" />}                                        />
                </GoogleMapReact>                        
            </div>
        </div>
    );
};

export default ContactUs;