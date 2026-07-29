import React from 'react';
import Banner from '../../Elements/Banner';
import { siteData } from '../../../data/siteContent';
import GoogleMapIframe from '../../Elements/GoogleMapIframe';
import Testimonials1 from '../../Elements/Testimonials1';
import WhyChooseUsHome from '../../Elements/WhyChooseUsHome';
import AboutStory from '../../Elements/AboutStory';
import MissionVision from '../../Elements/MissionVision';
import CoreValues from '../../Elements/CoreValues';
import Certificates from '../../Elements/Certificates';
import OurJourney from '../../Elements/OurJourney';
import FaqAbout from '../../Elements/FaqAbout';
import CtaAbout from '../../Elements/CtaAbout';

var bnrimg = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80"; // TEMP LIVE PREVIEW

class About extends React.Component {
    componentDidMount() {
        function loadScript(src) {
            return new Promise(function (resolve, reject) {
                var script = document.createElement('script');
                script.src = src;
                script.addEventListener('load', () => resolve());
                script.addEventListener('error', (e) => reject(e));
                document.body.appendChild(script);
            });
        }
        loadScript('/assets/js/custom.js');
    }
    
    render() {
        return (
            <div className="relative">
                <Banner title="About Us" pagename="About Us" description={siteData.aboutUs.shortDescription} bgimage={bnrimg}/>
                
                <AboutStory />
                <MissionVision />
                <CoreValues />
                <WhyChooseUsHome />
                <Certificates />
                <OurJourney />
                <Testimonials1 />
                <FaqAbout />
                <CtaAbout />
                <GoogleMapIframe />
            </div>
        );
    }
}
export default About;