import React from 'react';
import Banner from './../Elements/Banner';
import Projects3 from './../Elements/Projects3';
import Projects4 from '../Elements/Projects4';
import SimilarProjects from './../Elements/SimilarProjects';

var bnrimg = new URL('./../../images/banner/3.jpg', import.meta.url).href;

class ProjectCorousel extends React.Component {
    render() {
        return (
            <>
                <div className="page-content">
                    <Banner title="Carousel All Type" pagename="Project Carousel" description="The essence of interior design will always be about people and how they live. It is about the realities of what makes for an attractive, civilized." bgimage={bnrimg}/>
                    
                    <Projects3 alignment="separator-left" title="Carousel style 1" bgcolor="bg-gray" />
                    <Projects4 />
                    <SimilarProjects alignment="separator-left" title="Carousel style 3" />
                    
                </div>

                </>
        );
    };
};

export default ProjectCorousel;