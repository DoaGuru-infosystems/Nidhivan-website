import React from 'react';
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

var bnrimg = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80";

const missionVisionData = [
    {
        id: "mission",
        title: "Our Mission",
        description: "To deliver premium, legally verified real estate solutions that offer unmatched value, security, and a foundation for future generations.",
        icon: "flaticon-home"
    },
    {
        id: "vision",
        title: "Our Vision",
        description: "To become the most trusted real estate developer in the region, recognized for our commitment to transparency, quality, and customer satisfaction.",
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
                    title="Mission & Vision"
                    subtitle="Our Purpose"
                    description="Guided by strong principles and a clear vision for the future of real estate."
                    data={ missionVisionData }
                    gridCols="lg:grid-cols-2"
                />

                {/* 3. Why Choose Us */ }
                <WhyChooseUsHome />

                {/* 4. Timeline */ }
                <TimelineSection
                    data={ timelineData }
                />

                {/* 5. Core Values (Reusing ServicesGrid) */ }
                <ServicesGrid
                    title="Our Core Values"
                    subtitle="What We Stand For"
                    description="The foundational principles that guide every decision we make."
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
