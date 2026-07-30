import React from 'react';
import Banner from '../../Elements/Banner';
import UpcomingProjectsCarousel1 from '../../Elements/UpcomingProjectsCarousel1';
import UpcomingProjectsCarousel2 from '../../Elements/UpcomingProjectsCarousel2';
import SimilarProjects from '../../Elements/SimilarProjects';

// var bnrimg = new URL('../../../images/banner/3.jpg', import.meta.url).href; // ORIGINAL DUMMY - restore when real property photos are ready


var bnrimg = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80"; // TEMP LIVE PREVIEW

class ProjectCorousel extends React.Component {
    render() {
        return (
            <>
                <div className="relative">
                    <Banner title="Carousel All Type" pagename="Project Carousel" description="The essence of interior design will always be about people and how they live. It is about the realities of what makes for an attractive, civilized." bgimage={bnrimg}/>
                    
                    <UpcomingProjectsCarousel1 alignment="separator-left" title="Carousel style 1" bgcolor="bg-gray" />
                    <UpcomingProjectsCarousel2 />
                    <SimilarProjects alignment="separator-left" title="Carousel style 3" />
                    
                </div>

                </>
        );
    };
};

export default ProjectCorousel;
