import React from 'react';
import { Link } from 'react-router-dom';
import Banner from '../../Elements/Banner';
import AboutTrust from '../../Elements/AboutTrust';
import StatsBar from '../../Elements/StatsBar';
import ServicesGrid from '../../Elements/ServicesGrid';
import WhyChooseUsHome from '../../Elements/WhyChooseUsHome';
import TimelineSection from '../../Elements/TimelineSection';
import Testimonials1 from '../../Elements/Testimonials1';
import FaqHome from '../../Elements/FaqHome';
import CtaHome from '../../Elements/CtaHome';
import GoogleMapIframe from '../../Elements/GoogleMapIframe';
import { siteData } from '../../../data/siteContent';

var bnrimg = "/images/about_banner.webp";

const missionVisionData = [
    {
        id: "purpose",
        title: "Our Purpose",
        description: "Helping every middle-class family own a beautiful farmhouse.",
        icon: "flaticon-real-estate"
    },
    {
        id: "mission",
        title: "Our Mission",
        description: "Deliver affordable, transparent and quality farmhouse developments.",
        icon: "flaticon-home"
    },
    {
        id: "vision",
        title: "Our Vision",
        description: "Become Central India's most trusted farmhouse developer.",
        icon: "flaticon-skyline"
    }
];

const coreValuesData = [
    { id: "v1", title: "Integrity", description: "Honesty and strong moral principles in all our dealings.", icon: "flaticon-contract" },
    { id: "v2", title: "Transparency", description: "100% clarity in pricing, documentation, and processes.", icon: "flaticon-window" },
    { id: "v3", title: "Quality", description: "Premium materials and expert craftsmanship.", icon: "flaticon-home" },
    { id: "v4", title: "Commitment", description: "Delivering on our promises, every single time.", icon: "flaticon-real-estate" },
    { id: "v5", title: "Customer First", description: "Prioritizing your needs and ensuring absolute satisfaction.", icon: "flaticon-users" },
    { id: "v6", title: "Long-Term Relationships", description: "Building trust that lasts beyond a single transaction.", icon: "flaticon-handshake" }
];

const timelineData = [
    { year: "2010", title: "Company Started", description: "Nidhivan Developer was founded with a vision to redefine real estate." },
    { year: "2013", title: "First Premium Project", description: "Successfully delivered our first major farmland project." },
    { year: "2016", title: "Regional Expansion", description: "Expanded operations to multiple prime locations." },
    { year: "2020", title: "500+ Happy Families", description: "Reached a major milestone of satisfied customers." },
    { year: "2024", title: "Present Day", description: "Continuing to lead the market with premium farmhouse developments." }
];

class About extends React.Component {
    render() {
        return (
            <div className="relative">
                <Banner title="About Us" pagename="About Us" description={ siteData.aboutUs.shortDescription } bgimage={ bnrimg } />

                {/* 7. Achievements */ }
                <StatsBar />

                {/* 1. Our Story (Reusing AboutTrust) */ }
                <AboutTrust hideButton={ true } />

                {/* 2. Mission & Vision (Reusing ServicesGrid with custom data) */ }
                <ServicesGrid
                    title="More Than Land. A Better Lifestyle."
                    subtitle="Mission & Vision"
                    description=""
                    data={ missionVisionData }
                    gridCols="lg:grid-cols-3"
                />

                {/* 3. Why Choose Us */ }
                <WhyChooseUsHome />

                {/* 4. Timeline */ }
                <TimelineSection
                    data={ timelineData }
                />

                {/* ===== OUR PROPERTIES SECTION — 3 Property Cards ===== */}
                <section className="py-16 bg-white">
                  <div className="container mx-auto px-4">
                    
                    {/* Section Heading */}
                    <div className="text-center mb-12">
                      <h2 className="text-3xl font-bold text-gray-800 mb-3">
                        Our Properties
                      </h2>
                      <p className="text-gray-500 max-w-xl mx-auto">
                        Nidhivan Developer operates three premium real estate properties in
                        Jabalpur — each designed to offer the finest farm living experience.
                      </p>
                      <div
                        className="w-16 h-1 mx-auto mt-4 rounded-full"
                        style={{ backgroundColor: "#F4B54B" }}
                      ></div>
                    </div>

                    {/* Properties List (Alternating Layout) */}
                    <div className="flex flex-col gap-12">
                      {siteData.properties.map((property, index) => (
                        <div
                          key={property.id}
                          className={`flex flex-col lg:flex-row ${
                            index % 2 !== 0 ? "lg:flex-row-reverse" : ""
                          } bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-shadow duration-500 group`}
                        >
                          {/* Image Section */}
                          <div className="w-full lg:w-1/2 relative min-h-[350px] lg:min-h-[500px] overflow-hidden">
                            <img
                              src={property.image}
                              alt={property.name}
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            {/* Subtle dark gradient at bottom for text contrast */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>
                            
                            {/* Rating removed as per request */}
                          </div>

                          {/* Content Section */}
                          <div className="w-full lg:w-1/2 p-8 lg:p-12 xl:p-16 flex flex-col justify-center bg-white relative">
                            {/* Top decorative accent */}
                            <div 
                                className="absolute top-0 left-0 w-full h-1" 
                                style={{ background: index === 0 ? "linear-gradient(90deg, #118A43, #0d6e34)" : "linear-gradient(90deg, #F4B54B, #e0a030)" }}
                            ></div>

                            <div className="flex items-center gap-4 mb-5">
                              <h4 
                                className="text-xs sm:text-sm font-bold uppercase tracking-widest"
                                style={{ color: index === 0 ? "#118A43" : "#e0a030" }}
                              >
                                {property.tagline}
                              </h4>
                            </div>
                            
                            <h3 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
                              {property.name}
                            </h3>
                            
                            <p className="text-gray-600 text-base lg:text-lg leading-relaxed mb-8">
                              {property.description}
                            </p>

                            <div className="flex flex-wrap gap-3 mb-8">
                              {property.highlights.map((highlight, i) => (
                                <span
                                  key={i}
                                  className="px-4 py-2 bg-gray-50 border border-gray-100 text-gray-700 rounded-full text-xs sm:text-sm font-bold tracking-wide flex items-center gap-2 shadow-sm"
                                >
                                  <span 
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: index === 0 ? "#118A43" : "#F4B54B" }}
                                  ></span>
                                  {highlight}
                                </span>
                              ))}
                            </div>

                            <div className="flex items-start gap-4 text-gray-500 mb-10 pb-8 border-b border-gray-100">
                              <span className="text-2xl mt-0.5 flex-shrink-0">📍</span>
                              <span className="leading-relaxed text-base font-medium">{property.address}</span>
                            </div>

                            <div className="mt-auto">
                              <a
                                href={property.mapLink || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 ${
                                  index === 0 
                                    ? "bg-[#118A43] text-white hover:bg-[#0a5c2c] hover:text-[#F4B54B] shadow-[#118A43]/30" 
                                    : "bg-[#F4B54B] text-white hover:bg-[#c99136] hover:text-gray-900 shadow-[#F4B54B]/30"
                                }`}
                              >
                                View Location on Map
                                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
                {/* ===== END OUR PROPERTIES SECTION ===== */}

                {/* 5. Core Values (Reusing ServicesGrid) */ }
                <ServicesGrid
                    title="Values That Build Trust"
                    subtitle="Core Values"
                    description=""
                    data={ coreValuesData }
                    gridCols="md:grid-cols-2 lg:grid-cols-3"
                    sectionBg="bg-white"
                    cardBg="bg-bg-cream-alt"
                />

                {/* 8. Leadership/Team - Skipped per instructions */ }

                {/* 9. Testimonials */ }
                <Testimonials1 />

                {/* 10. FAQ */ }
                <FaqHome />
                {/* 11. Strong CTA */ }
                <CtaHome />

                {/* 12. Map */ }
                <GoogleMapIframe />

            </div>
        );
    }
}
export default About;
