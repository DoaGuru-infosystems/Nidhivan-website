import React from 'react';
import { NavLink } from 'react-router-dom';
import Banner from './../Elements/Banner';
import Projects6 from './../Elements/Projects6';
import ReactPlayer from 'react-player';
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

// var bnrimg = new URL('./../../images/banner/2.jpg', import.meta.url).href; // ORIGINAL DUMMY - restore when real property photos are ready


var bnrimg = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=80"; // TEMP LIVE PREVIEW

class ProjectDetail1 extends React.Component {
    
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
                    <Banner title="Project Details" pagename="Project Detail" description="The essence of interior design will always be about people and how they live. It is about the realities of what makes for an attractive, civilized." bgimage={bnrimg} />

                    {/* SECTION CONTENT START */}
                    <div className="section-full p-tb80 inner-page-padding stick_in_parent">
                        <div className="container">
                            <div className="grid grid-cols-12 gap-8">
                                <div className="col-span-12 md:col-span-7 lg:col-span-7 sticky_column">
                                    <div className="project-detail-containt">
                                        <div className="bg-white text-black">
                                            <h3>A multitask profession which creates any land in beautiful creation </h3>
                                            <p> Designers think everything done by someone else is awful, and that they could do it better themselves, which explains why I designed my own living room carpet, I suppose. the architect represents neither a Dionysian nor an Apollinian condition: here it is the mighty act of will, the will which moves mountains, the intoxication of the strong will, which demands artistic expression. The most powerful men have always inspired the architects; the architect has always been influenced by power.</p>
                                            <div className="product-block">
                                                <ul>
                                                    <li>
                                                        <h4 className="m-b10">Date</h4>
                                                        <p>October 10, 2022</p>
                                                    </li>
                                                    <li>
                                                        <h4 className="m-b10">Client</h4>
                                                        <p>Studio Massimo, Italy</p>
                                                    </li>
                                                    <li>
                                                        <h4 className="m-b10">Project type</h4>
                                                        <p>Contruction, Brading</p>
                                                    </li>
                                                    <li>
                                                        <h4 className="m-b10">Location</h4>
                                                        <p>Mountain View CA 94043</p>
                                                    </li>
                                                    <li>
                                                        <h4 className="m-b10">Year</h4>
                                                        <p>2022</p>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="m-b0">
                                                <div className="sx-divider divider-1px  bg-black"><i className="icon-dot c-square" /></div>
                                            </div>
                                            <ul className="social-icons social-square social-darkest m-b0">
                                            <li><a href="https://www.facebook.com" target="_blank" className="fa fa-facebook" /></li>
                                                <li><a href="https://twitter.com" target="_blank" className="fa fa-twitter" /></li>
                                                <li><a href="https://in.linkedin.com" target="_blank" className="fa fa-linkedin" /></li>
                                                <li><a href="https://rss.com" target="_blank" className="fa fa-rss" /></li>
                                                <li><a href="https://www.youtube.com" target="_blank" className="fa fa-youtube" /></li>
                                                <li><a href="https://www.instagram.com" target="_blank" className="fa fa-instagram" /></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-5 lg:col-span-5">
                                    <div className="project-detail-outer">
                                        <div className="project-detail-pic m-b30">
                                            <div className="sx-media">
                                                {/* <img src={new URL('./../../images/projects/portrait/pic7.jpg', import.meta.url).href} alt="" /> ORIGINAL DUMMY - restore when real property photos are ready */}

                                                <img src={"https://images.unsplash.com/photo-1745794621090-d856c53b0cc2?w=1600&q=80"} alt="" /> {/* TEMP LIVE PREVIEW */}
                                            </div>
                                        </div>
                                        <div className="project-detail-pic m-b30">
                                            <div className="sx-media">
                                                {/* <img src={new URL('./../../images/projects/portrait/pic4.jpg', import.meta.url).href} alt="" /> ORIGINAL DUMMY - restore when real property photos are ready */}

                                                <img src={"https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1600&q=80"} alt="" /> {/* TEMP LIVE PREVIEW */}
                                            </div>
                                        </div>
                                        <div className="project-detail-pic m-b30">
                                            <div className="sx-media">
                                                {/* <img src={new URL('./../../images/projects/portrait/pic5.jpg', import.meta.url).href} alt="" /> ORIGINAL DUMMY - restore when real property photos are ready */}

                                                <img src={"https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=80"} alt="" /> {/* TEMP LIVE PREVIEW */}
                                            </div>
                                        </div>
                                        <div className="sx-box">
                                            <div className="sx-thum-bx sx-img-overlay1 sx-img-effect yt-thum-box">
                                                <img src="https://img.youtube.com/vi/Oy2QIiSQT2U/0.jpg" alt="" />
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <button className="play-now">
                                                            <i className="icon fa fa-play" />
                                                            <span className="ripple" />
                                                        </button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[800px] p-0 bg-transparent border-none shadow-none">
                                                        <ReactPlayer url='https://www.youtube.com/watch?v=Oy2QIiSQT2U' width="100%" height="450px" />
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="project-detail-containt-2 m-t50">
                                <h3>Creating a sustainable future through building preservation, green architecture, and smart design</h3>
                                <p className="m-b0"> Designers think everything done by someone else is awful, and that they could do it better themselves, which explains why I designed my own living room carpet, I suppose. the architect represents neither a Dionysian nor an Apollinian condition: here it is the mighty act of will, the will which moves mountains, the intoxication of the strong will, which demands artistic expression. The most powerful men have always inspired the architects; the architect has always been influenced by power.</p>
                            </div>
                        </div>
                    </div>
                    {/* SECTION CONTENT END  */}
                    <Projects6 />
                </div>
                </>
        );
    };
};

export default ProjectDetail1;