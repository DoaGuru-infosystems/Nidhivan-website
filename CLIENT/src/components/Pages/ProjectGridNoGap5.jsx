import React from 'react';
import { NavLink } from 'react-router-dom';
import Banner from './../Elements/Banner';

const filters = [
    { label: "Architecture", filter: ".cat-1" },
    { label: "Decore", filter: ".cat-2" },
    { label: "Outdoor", filter: ".cat-3" },
    { label: "Interiors", filter: ".cat-4" },
    { label: "Residential", filter: ".cat-5" }
];

const projects = [
    {
        image: new URL('./../../images/projects/portrait/pic1.jpg', import.meta.url).href,
        title: 'Interior Work Avroko',
        address: 'Muscat, Sultanate of Oman',
        filter: 'cat-1'
    },
    {
        image: new URL('./../../images/projects/portrait/pic2.jpg', import.meta.url).href,
        title: 'Vilters',
        address: 'Muscat, Sultanate of Oman',
        filter: 'cat-2'
    },
    {
        image: new URL('./../../images/projects/portrait/pic3.jpg', import.meta.url).href,
        title: 'Industrial Design',
        address: 'Muscat, Sultanate of Oman',
        filter: 'cat-3'
    },
    {
        image: new URL('./../../images/projects/portrait/pic4.jpg', import.meta.url).href,
        title: 'House Bluprint',
        address: 'Muscat, Sultanate of Oman',
        filter: 'cat-4'
    },
    {
        image: new URL('./../../images/projects/portrait/pic5.jpg', import.meta.url).href,
        title: 'Modern Bathroom',
        address: 'Muscat, Sultanate of Oman',
        filter: 'cat-5'
    },
    {
        image: new URL('./../../images/projects/portrait/pic6.jpg', import.meta.url).href,
        title: 'Bellevue Project',
        address: 'Muscat, Sultanate of Oman',
        filter: 'cat-4'
    },
    {
        image: new URL('./../../images/projects/portrait/pic7.jpg', import.meta.url).href,
        title: 'Qatar Pavilion',
        address: 'Muscat, Sultanate of Oman',
        filter: 'cat-3'
    },
    {
        image: new URL('./../../images/projects/portrait/pic8.jpg', import.meta.url).href,
        title: 'Museum',
        address: 'Muscat, Sultanate of Oman',
        filter: 'cat-2'
    },
    {
        image: new URL('./../../images/projects/portrait/pic9.jpg', import.meta.url).href,
        title: 'Modern house',
        address: 'Muscat, Sultanate of Oman',
        filter: 'cat-1'
    },
    {
        image: new URL('./../../images/projects/portrait/pic7.jpg', import.meta.url).href,
        title: 'Qatar Pavilion',
        address: 'Muscat, Sultanate of Oman',
        filter: 'cat-3'
    }
]

var bnrimg = new URL('./../../images/banner/6.jpg', import.meta.url).href;
var bgimg1 = new URL('./../../images/background/cross-line.png', import.meta.url).href;

class ProjectGridNoGap5 extends React.Component {
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
                    <Banner title="Grid 5 Columns No Gap" pagename="Project with Grid 5 Columns No Gap" description="The essence of interior design will always be about people and how they live. It is about the realities of what makes for an attractive, civilized." bgimage={bnrimg}/>
                    
                    {/* SECTION CONTENT START */}
                    <div className="section-full p-tb80 column-grid-5 inner-page-padding">
                        <div className="container">
                            {/* Filter Nav START */}
                            <div className="filter-wrap p-b30 text-center">
                                <ul className="filter-navigation masonry-filter clearfix">
                                    <li className="active"><NavLink to={"#"} className="btn from-top" data-filter="*" data-hover="All">All</NavLink></li>
                                    {filters.map((item, index) => (
                                        <li key={index}><NavLink to={"#"} className="btn from-top" data-filter={item.filter} >{item.label}</NavLink></li>
                                    ))}
                                </ul>
                            </div>
                            {/* Filter Nav END */}
                            {/* GALLERY CONTENT START */}
                            <ul id="load-more-item-5" className="masonry-outer mfp-gallery work-grid clearfix list-unstyled grid-5 no-col-gap m-b60">
                                {projects.map((item, index) => (
                                    <div key={index} className={`${item.filter} masonry-item col-xl-3  col-lg-4 col-md-6 col-sm-12`}>
                                        <div className="sx-box image-hover-block">
                                            <div className="sx-thum-bx">
                                                <img src={item.image} alt="" />
                                            </div>
                                            <div className="sx-info  p-t20 text-white">
                                                <h4 className="sx-tilte"><NavLink to={"/project-detail1"}>{item.title}</NavLink></h4>
                                                <p className="m-b0">{item.address}</p>
                                            </div>
                                            <a className="mfp-link" href={item.image}>
                                                <i className="fa fa-arrows-alt" />
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </ul>
                            {/* GALLERY CONTENT END */}
                            <div className="text-center load-more-btn-outer" style={{ backgroundImage: 'url(' + bgimg1 + ')' }}>
                                <button className="site-button-secondry btn-half"><span>Load More</span></button>
                            </div>
                        </div>
                    </div>
                    {/* SECTION CONTENT END  */}
                </div>

                </>
        );
    };
};

export default ProjectGridNoGap5;