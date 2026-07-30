import React from 'react';
import Banner from '../../Elements/Banner';
import About3 from '../../Elements/About3';
import { siteData } from '../../../data/siteContent';
import Statistics1 from '../../Elements/Statistics1';
import HomeGalleryCategories from '../../Elements/HomeGalleryCategories';
import GoogleMapIframe from '../../Elements/GoogleMapIframe';
import { NavLink } from 'react-router-dom';

var bnrimg = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80"; // TEMP LIVE PREVIEW

const servicesGrid = [
    { type: 'image', src: 'https://images.unsplash.com/photo-1745794621090-d856c53b0cc2?w=800&q=80' },
    { type: 'text', title: siteData.services[0].title, desc: siteData.services[0].description },
    { type: 'image', src: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80' },
    { type: 'text', title: siteData.services[1].title, desc: siteData.services[1].description },

    { type: 'text', title: siteData.services[2].title, desc: siteData.services[2].description },
    { type: 'image', src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80' },
    { type: 'text', title: siteData.services[3].title, desc: siteData.services[3].description },
    { type: 'image', src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80' }
];

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
        ;
    }
    
    render() {
        return (
            <div className="relative">
                <Banner title="About Us" pagename="About Us" description={siteData.aboutUs.shortDescription} bgimage={bnrimg}/>
                
                {/* About Section */ }
                <About3 bgcolor="bg-gray" />

                {/* Custom What We Do - Matching Original Theme Checkerboard */ }
                <div className="relative bg-white">
                    <div className="max-w-7xl mx-auto px-4 pt-20 pb-10">
                        <div className="mb-10 text-center">
                            <h2 className="sx-title text-4xl font-bold mb-4">What We Do</h2>
                            <div className="sx-separator-outer separator-center">
                                <div className="sx-separator bg-black bg-moving bg-repeat-x"></div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap w-full">
                        { servicesGrid.map((item, i) => (
                            <div key={ i } className="w-full md:w-1/2 lg:w-1/4 h-[350px] relative group overflow-hidden">
                                { item.type === 'image' ? (
                                    <div className="w-full h-full relative">
                                        <img src={ item.src } className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Service" />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300"></div>
                                    </div>
                                ) : (
                                    <div className="w-full h-full bg-[#f7f7f7] p-8 flex flex-col justify-center items-center text-center hover:bg-gray-200 transition-colors">
                                        <h4 className="text-xl font-bold mb-4 sx-tilte">{ item.title }</h4>
                                        <p className="text-gray-600 mb-6 text-sm line-clamp-4">{ item.desc }</p>
                                        <NavLink to="/about" className="site-button-link text-[#2B2B2B] hover:text-[#fb5455] font-semibold tracking-wider text-sm">READ MORE</NavLink>
                                    </div>
                                ) }
                            </div>
                        )) }
                    </div>
                </div>

                <Statistics1 />
                <HomeGalleryCategories />
                <GoogleMapIframe />
            </div>
        );
    }
}
export default About;
