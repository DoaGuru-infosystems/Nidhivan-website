import React from 'react';
import { NavLink } from 'react-router-dom';
import Banner from '../../Elements/Banner';
import SimilarProjectsCarousel from '../../Elements/SimilarProjectsCarousel';
import ReactPlayer from 'react-player';
import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog";

// var bnrimg = new URL('../../../images/banner/2.jpg', import.meta.url).href; // ORIGINAL DUMMY - restore when real property photos are ready


var bnrimg = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=80"; // TEMP LIVE PREVIEW

class ProjectDetail1 extends React.Component {
    
    };
    render() {
        const { dynamicProject } = this.props;
        if (!dynamicProject) {
            return (
                <div className="relative">
                    <Banner title="Project Details" pagename="Project Detail" description="" bgimage={bnrimg} />
                    <div className="relative py-8 md:py-20">
                        <div className="max-w-7xl mx-auto px-4 text-center">
                            <h2 className="text-2xl font-semibold text-gray-600">Project not found or loading...</h2>
                        </div>
                    </div>
                </div>
            );
        }

        const title = dynamicProject.title;
        const type = dynamicProject.type || dynamicProject.category;
        const location = dynamicProject.location;
        const status = dynamicProject.status;
        const image = dynamicProject.image;
        
        return (
            <>
                <div className="relative">
                    <Banner title="Project Details" pagename="Project Detail" description="The essence of interior design will always be about people and how they live. It is about the realities of what makes for an attractive, civilized." bgimage={bnrimg} />

                    {/* SECTION CONTENT START */}
                    <div className="relative py-8 md:py-20 stick_in_parent">
                        <div className="max-w-7xl mx-auto px-4">
                            <div className="grid grid-cols-12 gap-8">
                                <div className="col-span-12 md:col-span-7 lg:col-span-7 sticky_column">
                                    <div className="project-detail-containt">
                                        <div className="bg-white text-[#2B2B2B]">
                                            <h3>{title}</h3>
                                            <p>{dynamicProject.content || dynamicProject.description || "No description available for this project."}</p>
                                            <div className="product-block">
                                                <ul>
                                                    <li>
                                                        <h4 className="m-b10">Date</h4>
                                                        <p>October 10, 2022</p>
                                                    </li>
                                                    <li>
                                                        <h4 className="m-b10">Status</h4>
                                                        <p>{status}</p>
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
                                                {/* <img src={new URL('../../../images/projects/portrait/pic7.jpg', import.meta.url).href} alt="" /> ORIGINAL DUMMY - restore when real property photos are ready */}

                                                <img src={image} alt="" /> {/* TEMP LIVE PREVIEW */}
                                            </div>
                                        </div>
                                        <div className="project-detail-pic m-b30">
                                            <div className="sx-media">
                                                {/* <img src={new URL('../../../images/projects/portrait/pic4.jpg', import.meta.url).href} alt="" /> ORIGINAL DUMMY - restore when real property photos are ready */}

                                                <img src={"https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1600&q=80"} alt="" /> {/* TEMP LIVE PREVIEW */}
                                            </div>
                                        </div>
                                        <div className="project-detail-pic m-b30">
                                            <div className="sx-media">
                                                {/* <img src={new URL('../../../images/projects/portrait/pic5.jpg', import.meta.url).href} alt="" /> ORIGINAL DUMMY - restore when real property photos are ready */}

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
                    <SimilarProjectsCarousel />
                </div>
                </>
        );
    };
};

import { useParams } from 'react-router-dom';
import { fetchProjectById, getMediaUrl } from '@/lib/api';
import { useState, useEffect } from 'react';

const ProjectDetail1Wrapper = (props) => {
    const { id } = useParams();
    const [dynamicProject, setDynamicProject] = useState(null);

    useEffect(() => {
        const loadProject = async () => {
            if (id) {
                try {
                    const data = await fetchProjectById(id);
                    const projectData = data.data || data;
                    if (projectData) {
                        setDynamicProject({
                            ...projectData,
                            image: projectData.images && projectData.images.length > 0 ? getMediaUrl(projectData.images[0].image_url || projectData.images[0].image || projectData.images[0]) : null
                        });
                    }
                } catch (error) {
                    console.error("Failed to load project", error);
                }
            }
        };
        loadProject();
    }, [id]);

    return <ProjectDetail1 {...props} dynamicProject={dynamicProject} />;
};

export default ProjectDetail1Wrapper;
