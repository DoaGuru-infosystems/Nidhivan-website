import React, { useState, useEffect } from 'react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { NavLink } from 'react-router-dom';
import { siteData } from '../../data/siteContent';
import { Maximize } from 'lucide-react';
import { fetchAllProjects, getMediaUrl } from '@/lib/api';

const HomeProjectsFilter = () => {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [allProjects, setAllProjects] = useState([]);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const response = await fetchAllProjects();
                const data = response.data || response;

                const dynamic = data.map(item => ({
                    ...item,
                    address: item.location,
                    imgUrl:
                        item.images && item.images.length > 0
                            ? getMediaUrl(
                                item.images[0].image_url ||
                                item.images[0].image ||
                                item.images[0]
                            )
                            : null
                }));

                setAllProjects(dynamic);
            } catch (error) {
                console.error("Failed to load projects:", error);
            }
        };

        loadProjects();
    }, []);

    return (
        <div className="relative py-8 md:pt-20 md:pb-12 bg-white">

            <div className="section-content">

                {/* =========================
                    TITLE SECTION
                ========================== */}
                <div className="max-w-7xl mx-auto px-4">

                    <div className="mb-10 text-center flex flex-col items-center">

                        <div className="sx-separator-outer separator-center mb-4">

                            <div className="sx-separator bg-white bg-moving bg-repeat-x">

                                <h3 className="sep-line-one">
                                    Delivered With Trust
                                </h3>

                            </div>

                        </div>

                        <p className="max-w-2xl text-gray-600">
                            Completed projects that families proudly call their
                            second home, and new affordable farmhouse
                            destinations around Jabalpur that are on the way.
                        </p>

                    </div>

                </div>


                {/* =========================
                    PROJECTS SECTION
                ========================== */}
                <div className="w-full">

                    <div className="max-w-7xl mx-auto px-4">

                        { allProjects.length === 0 ? (

                            <div className="text-center w-full py-12 text-gray-500 text-xl font-medium">
                                No projects available
                            </div>

                        ) : (

                            <div
                                className="
                                    flex
                                    flex-nowrap
                                    gap-6
                                    overflow-x-auto
                                    overflow-y-hidden
                                    pb-6
                                    scrollbar-thin
                                "
                            >

                                { allProjects.map((item, index) => (

                                    <div
                                        key={ `${item.id}-${index}` }
                                        className="
                                            flex-shrink-0
                                            w-[280px]
                                            sm:w-[320px]
                                            md:w-[350px]
                                            lg:w-[380px]
                                        "
                                    >

                                        <div className="sx-box image-hover-block relative group">

                                            {/* =========================
                                                PROJECT IMAGE
                                            ========================== */}
                                            <div className="sx-thum-bx overflow-hidden">

                                                { item.imgUrl ? (

                                                    <NavLink
                                                        to={ `/project-detail/${item.id}` }
                                                    >

                                                        <img
                                                            src={ item.imgUrl }
                                                            alt={ item.title || "Project" }
                                                            style={ {
                                                                height: '400px'
                                                            } }
                                                            className="
                                                                w-full
                                                                object-cover
                                                                transition-transform
                                                                duration-500
                                                                group-hover:scale-110
                                                                cursor-pointer
                                                            "
                                                        />

                                                    </NavLink>

                                                ) : (

                                                    <div
                                                        className="
                                                            w-full
                                                            h-[400px]
                                                            bg-gray-100
                                                            flex
                                                            items-center
                                                            justify-center
                                                            text-gray-500
                                                        "
                                                    >
                                                        Image not available
                                                    </div>

                                                ) }

                                            </div>


                                            {/* =========================
                                                PROJECT INFORMATION
                                            ========================== */}
                                            <div
                                                className="
                                                    sx-info
                                                    p-t20
                                                    text-white
                                                    absolute
                                                    bottom-0
                                                    left-0
                                                    w-full
                                                    bg-gradient-to-t
                                                    from-black/80
                                                    via-black/40
                                                    to-transparent
                                                    p-6
                                                    transition-all
                                                    duration-300
                                                    pointer-events-none
                                                "
                                            >

                                                <h4
                                                    className="
                                                        sx-tilte
                                                        text-xl
                                                        font-bold
                                                        mb-1
                                                        pointer-events-auto
                                                        !opacity-100
                                                    "
                                                >

                                                    <NavLink
                                                        to={ `/project-detail/${item.id}` }
                                                        className="text-white"
                                                    >
                                                        { item.title }
                                                    </NavLink>

                                                </h4>


                                                <p
                                                    className="
                                                        m-b0
                                                        text-sm
                                                        text-gray-200
                                                        !opacity-100
                                                    "
                                                >
                                                    { item.location }
                                                </p>

                                            </div>


                                            {/* =========================
                                                LIGHTBOX BUTTON
                                            ========================== */}
                                            { item.imgUrl && (

                                                <button
                                                    type="button"
                                                    className="
                                                        cursor-pointer
                                                        absolute
                                                        top-4
                                                        right-4
                                                        bg-white
                                                        w-10
                                                        h-10
                                                        rounded-full
                                                        flex
                                                        items-center
                                                        justify-center
                                                        text-[#2B2B2B]
                                                        opacity-0
                                                        group-hover:opacity-100
                                                        transition-opacity
                                                        duration-300
                                                        shadow-md
                                                        border-none
                                                    "
                                                    onClick={ (e) => {
                                                        e.preventDefault();
                                                        setLightboxIndex(index);
                                                        setLightboxOpen(true);
                                                    } }
                                                >

                                                    <Maximize size={ 16 } />

                                                </button>

                                            ) }

                                        </div>

                                    </div>

                                )) }

                            </div>

                        ) }

                    </div>

                </div>

            </div>


            {/* =========================
                LIGHTBOX
            ========================== */}
            <Lightbox
                open={ lightboxOpen }
                close={ () => setLightboxOpen(false) }
                index={ lightboxIndex }
                slides={ allProjects
                    .filter(item => item.imgUrl)
                    .map(item => ({
                        src: item.imgUrl
                    }))
                }
            />

        </div>
    );
};

export default HomeProjectsFilter;