import React from 'react';
import { NavLink } from 'react-router-dom';
import Banner from './../Elements/Banner';

const filters = [
    { label: "Architecture", filter: ".cat-1" },
    { label: "Decor", filter: ".cat-2" },
    { label: "Outdoor", filter: ".cat-3" },
    { label: "Interiors", filter: ".cat-4" },
    { label: "Residential", filter: ".cat-5" }
];

const projects = [
    {
        image: new URL('./../../images/projects/portrait/pic1.jpg', import.meta.url).href,
        title: 'Modern Villa',
        address: 'Mumbai, Maharashtra',
        filter: 'cat-1'
    },
    {
        image: new URL('./../../images/projects/portrait/pic2.jpg', import.meta.url).href,
        title: 'Luxury Apartment',
        address: 'Pune, Maharashtra',
        filter: 'cat-2'
    },
    {
        image: new URL('./../../images/projects/portrait/pic3.jpg', import.meta.url).href,
        title: 'Industrial Design',
        address: 'Delhi, NCR',
        filter: 'cat-3'
    },
    {
        image: new URL('./../../images/projects/portrait/pic4.jpg', import.meta.url).href,
        title: 'House Blueprint',
        address: 'Bangalore, Karnataka',
        filter: 'cat-4'
    },
    {
        image: new URL('./../../images/projects/portrait/pic5.jpg', import.meta.url).href,
        title: 'Modern Bathroom',
        address: 'Hyderabad, Telangana',
        filter: 'cat-5'
    },
    {
        image: new URL('./../../images/projects/portrait/pic6.jpg', import.meta.url).href,
        title: 'Bellevue Project',
        address: 'Chennai, Tamil Nadu',
        filter: 'cat-4'
    },
    {
        image: new URL('./../../images/projects/portrait/pic7.jpg', import.meta.url).href,
        title: 'Outdoor Pavilion',
        address: 'Kochi, Kerala',
        filter: 'cat-3'
    },
    {
        image: new URL('./../../images/projects/portrait/pic8.jpg', import.meta.url).href,
        title: 'Museum Interiors',
        address: 'Kolkata, West Bengal',
        filter: 'cat-2'
    },
    {
        image: new URL('./../../images/projects/portrait/pic9.jpg', import.meta.url).href,
        title: 'Minimalist House',
        address: 'Ahmedabad, Gujarat',
        filter: 'cat-1'
    }
]

var bnrimg = new URL('./../../images/banner/3.jpg', import.meta.url).href;
var bgimg1 = new URL('./../../images/background/cross-line.png', import.meta.url).href;

class Gallery extends React.Component {
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
                    <Banner title="Our Gallery" pagename="Gallery" description="Explore our portfolio of breathtaking real estate projects, interior designs, and architectural marvels." bgimage={bnrimg}/>
                    
                    <div className="section-full p-tb80 inner-page-padding">
                        <div className="container">
                            <div className="filter-wrap p-b30 text-center">
                                <ul className="filter-navigation masonry-filter clearfix">
                                    <li className="active"><NavLink to={"#"} className="btn from-top" data-filter="*" data-hover="All">All</NavLink></li>
                                    {filters.map((item, index) => (
                                        <li key={index}><NavLink to={"#"} className="btn from-top" data-filter={item.filter} >{item.label}</NavLink></li>
                                    ))}
                                </ul>
                            </div>
                            
                            <ul className="masonry-outer mfp-gallery work-grid row clearfix list-unstyled">
                                {projects.map((item, index) => (
                                    <div key={index} className={`${item.filter} masonry-item  col-lg-4 col-md-6 col-sm-12 m-b30`}>
                                        <div className="sx-box image-hover-block">
                                            <div className="sx-thum-bx">
                                                <img src={item.image} alt="" />
                                            </div>
                                            <div className="sx-info  p-t20 text-white">
                                                <h4 className="sx-tilte"><NavLink to={"#"} style={{ pointerEvents: 'none' }}>{item.title}</NavLink></h4>
                                                <p className="m-b0">{item.address}</p>
                                            </div>
                                            <a className="mfp-link" href={item.image}>
                                                <i className="fa fa-arrows-alt" />
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </ul>
                            
                            <div className="text-center load-more-btn-outer" style={{ backgroundImage: 'url(' + bgimg1 + ')' }}>
                                <button className="site-button-secondry btn-half"><span>Load More</span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };
};

export default Gallery;
