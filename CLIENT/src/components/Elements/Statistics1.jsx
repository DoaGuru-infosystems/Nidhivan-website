import React from 'react';
import CountUp from 'react-countup';
import { siteData } from '../../data/siteContent';

var bgimg1 = new URL('./../../images/background/bg-1.jpg', import.meta.url).href;
var bgimg2 = new URL('./../../images/background/bg-5.png', import.meta.url).href;

class Statistics1 extends React.Component {
    
    render() {
        return (
            <>
                <div className="section-full overlay-wraper sx-bg-secondry mobile-page-padding  p-t80 p-b50 bg-parallax ml-auto" data-stellar-background-ratio="0.5" style={{ backgroundImage: 'url(' + bgimg1 + ')' }}>
                        <div className="overlay-main bg-black opacity-05" />
                        <div className="container">
                            <div className="section-content">
                                <div className="counter-blocks">
                                    <div className="row">
                                        {siteData.statistics.map((stat, index) => (
                                            <div className="col-xl-3 col-md-6 m-b30" key={index}>
                                                <div className="sx-count text-white sx-icon-box-wraper bg-repeat p-a30" style={{ backgroundImage: 'url(' + bgimg2 + ')' }}>
                                                    <h2 className="m-t0 sx-text-primary text-right"><span className="counter"><CountUp end={parseInt(stat.value)} duration={5} /></span><span>{stat.suffix}</span></h2>
                                                    <h4 className="m-b0">{stat.label}</h4>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </>
        );
    }
};

export default Statistics1;