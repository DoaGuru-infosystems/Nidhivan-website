import React from 'react';
import Banner from '../../Elements/Banner';
import UpcomingProjectsCarousel1 from '../../Elements/UpcomingProjectsCarousel1';

// var bnrimg = new URL('../../../images/banner/3.jpg', import.meta.url).href; // ORIGINAL DUMMY - restore when real property photos are ready


var bnrimg = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80"; // TEMP LIVE PREVIEW

class ProjectCorousel extends React.Component {
    render() {
        return (
            <>
                <div className="relative">
                    <Banner title="Upcoming Projects" pagename="Upcoming Projects" description="Discover our upcoming and future real estate projects designed with modern architecture and premium amenities." bgimage={bnrimg}/>
                    
                    <UpcomingProjectsCarousel1 alignment="separator-left" title="Upcoming Projects" bgcolor="bg-gray" />
                </div>
            </>
        );
    };
};

export default ProjectCorousel;
