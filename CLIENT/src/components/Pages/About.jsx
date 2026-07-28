import React from 'react';
import Banner from './../Elements/Banner';
import About3 from './../Elements/About3';
import { siteData } from '../../data/siteContent';
import WhatWeDo3 from './../Elements/WhatWeDo3';
import Statistics1 from './../Elements/Statistics1';
import ClientsLogo1 from './../Elements/ClientsLogo1';

// var bnrimg = new URL('./../../images/banner/6.jpg', import.meta.url).href; // ORIGINAL DUMMY - restore when real property photos are ready


var bnrimg = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80"; // TEMP LIVE PREVIEW

class About extends React.Component {
    componentDidMount() {
        function loadScript(src) {

            return new Promise(function (resolve, reject) {
                var script = document.createElement('script');
                script.src = src;
                script.addEventListener('load', function () {
                    resolve();
                });
                script.addEventListener('error', function (e) {
                    reject(e);
                });
                document.body.appendChild(script);
                document.body.removeChild(script);
            })
        };

        loadScript('/assets/js/custom.js');

    };
    render() {
        return (
            <>
                <div className="page-content">
                    <Banner title="About Us" pagename="About Us" description={siteData.aboutUs.shortDescription} bgimage={bnrimg}/>
                    <About3 bgcolor="bg-gray" />
                    <WhatWeDo3 />
                    <Statistics1 />
                    <ClientsLogo1 />
                </div>

                </>
        );
    };
};

export default About;