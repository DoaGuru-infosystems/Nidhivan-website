import React from 'react';
import Banner from '../../Elements/Banner';
import AboutTrust from '../../Elements/AboutTrust';
import { siteData } from '../../../data/siteContent';
import StatsBar from '../../Elements/StatsBar';
import ServicesGrid from '../../Elements/ServicesGrid';
import HomeGalleryCategories from '../../Elements/HomeGalleryCategories';
import GoogleMapIframe from '../../Elements/GoogleMapIframe';

var bnrimg = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80"; // Luxury house background

class About extends React.Component {
    render() {
        return (
            <div className="relative">
                <Banner title="About Us" pagename="About Us" description={siteData.aboutUs.shortDescription} bgimage={bnrimg}/>
                
                {/* About Section (Reused from Phase 2) */ }
                <AboutTrust hideButton={true} />

                {/* Services Section (Reused from Phase 2) */ }
                <ServicesGrid />

                {/* Stats Bar (Reused from Phase 2) */ }
                <StatsBar />

                {/* Gallery Categories */ }
                <HomeGalleryCategories />

                {/* Map */ }
                <GoogleMapIframe />
            </div>
        );
    }
}
export default About;
