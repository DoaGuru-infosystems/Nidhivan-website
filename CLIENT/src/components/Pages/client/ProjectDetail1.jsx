import React from 'react';
import { NavLink } from 'react-router-dom';
import Banner from '../../Elements/Banner';
import SimilarProjectsCarousel from '../../Elements/SimilarProjectsCarousel';
import ReactPlayer from 'react-player';
import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog";

// var bnrimg = new URL('../../../images/banner/2.jpg', import.meta.url).href; // ORIGINAL DUMMY - restore when real property photos are ready


var bnrimg = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=80"; // TEMP LIVE PREVIEW

class ProjectDetail1 extends React.Component {
    
    
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
                                                        <p>{new Date(dynamicProject.created_at).toLocaleDateString()}</p>
                                                    </li>
                                                    <li>
                                                        <h4 className="m-b10">Status</h4>
                                                        <p>{status}</p>
                                                    </li>
                                                    <li>
                                                        <h4 className="m-b10">Project type</h4>
                                                        <p>{type}</p>
                                                    </li>
                                                    <li>
                                                        <h4 className="m-b10">Location</h4>
                                                        <p>{location}</p>
                                                    </li>
                                                    <li>
                                                        <h4 className="m-b10">Category</h4>
                                                        <p>{dynamicProject.category}</p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-5 lg:col-span-5">
                                    <div className="project-detail-outer">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {dynamicProject.images && dynamicProject.images.length > 0 ? (
                                                dynamicProject.images.map((img, idx) => (
                                                    <div className="project-detail-pic" key={idx}>
                                                        <div className="sx-media rounded-lg overflow-hidden h-full">
                                                            <img src={getMediaUrl(img.image_url || img.image || img)} alt={`${title} - Image ${idx + 1}`} className="w-full h-full object-cover" style={{minHeight: "250px"}}/>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="project-detail-pic">
                                                    <div className="sx-media rounded-lg overflow-hidden">
                                                        <img src={image} alt={title} className="w-full h-full object-cover" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Removing dummy bottom text since no description field exists yet */}
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
