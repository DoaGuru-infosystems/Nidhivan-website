import React from 'react';
import { NavLink } from 'react-router-dom';
import Banner from './../Elements/Banner';

const blogs = [
    {
        // image: new URL('./../../images/blog/blog-grid/pic4.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready

        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1600&q=80", // TEMP LIVE PREVIEW
        title: 'Weâ€™ll nail your next project, because nobody wants...',
        author: 'John',
        date: '5',
        month: 'SEP',
        comments: '5 Comment'
    },
    {
        // image: new URL('./../../images/blog/blog-grid/pic1.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready

        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&q=80", // TEMP LIVE PREVIEW
        title: 'Helping you and your house become better acquainted.',
        author: 'John',
        date: '25',
        month: 'SEP',
        comments: '5 Comment'
    },
    {
        // image: new URL('./../../images/blog/blog-grid/pic2.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready

        image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80", // TEMP LIVE PREVIEW
        title: 'Creating quality urban lifestyles, building...',
        author: 'John',
        date: '26',
        month: 'SEP',
        comments: '5 Comment'
    },
    {
        // image: new URL('./../../images/blog/blog-grid/pic3.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready

        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1600&q=80", // TEMP LIVE PREVIEW
        title: 'When it comes to your house, donâ€™t mess...',
        author: 'John',
        date: '16',
        month: 'SEP',
        comments: '3 Comment'
    },
    {
        // image: new URL('./../../images/blog/blog-grid/pic4.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready

        image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=80", // TEMP LIVE PREVIEW
        title: 'Donâ€™t get framed by the competition, trust our...',
        author: 'John',
        date: '18',
        month: 'SEP',
        comments: '5 Comment'
    },
    {
        // image: new URL('./../../images/blog/blog-grid/pic5.jpg', import.meta.url).href, // ORIGINAL DUMMY - restore when real property photos are ready

        image: "https://images.unsplash.com/photo-1745794621090-d856c53b0cc2?w=1600&q=80", // TEMP LIVE PREVIEW
        title: 'Weâ€™re the construction kings, building up great...',
        author: 'John',
        date: '15',
        month: 'SEP',
        comments: '2 Comment'
    }
]

// var bnrimg = new URL('./../../images/banner/7.jpg', import.meta.url).href; // ORIGINAL DUMMY - restore when real property photos are ready


var bnrimg = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80"; // TEMP LIVE PREVIEW

class BlogGrid extends React.Component {
    render() {
        return (
            <>
                <div className="page-content">
                    <Banner title="Blog Grid Style" pagename="Blog Grid" description="The essence of interior design will always be about people and how they live. It is about the realities of what makes for an attractive, civilized." bgimage={bnrimg}/>
                   
                    <div className="section-full py-8 md:py-20 bg-white">
                       
                    <div className="max-w-7xl mx-auto px-4">
                            <div className="masonry-outer mfp-gallery news-grid clearfix grid grid-cols-12 gap-8 ">
                                {blogs.map((item, index) => (
                                    <div className="masonry-item col-span-12 md:col-span-6 lg:col-span-4" key={index}>
                                    <div className="blog-post blog-grid date-style-2">
                                        <div className="sx-post-media sx-img-effect img-reflection">
                                            <NavLink to={"/blog-single"}><img src={item.image} alt="" /></NavLink>
                                        </div>
                                        <div className="sx-post-info p-t30">
                                            <div className="sx-post-meta ">
                                                <ul>
                                                    <li className="post-date"><strong>{item.date}</strong> <span>{item.month}</span> </li>
                                                    <li className="post-author"><NavLink to={"/blog-single"}>By <span>{item.author}</span></NavLink> </li>
                                                    <li className="post-comment"> <NavLink to={"/blog-single"}>{item.comments}</NavLink> </li>
                                                </ul>
                                            </div>
                                            <div className="sx-post-title ">
                                                <h4 className="post-title"><NavLink to={"/blog-single"}>{item.title}</NavLink></h4>
                                            </div>
                                            <div className="sx-post-readmore">
                                                <NavLink to={"/blog-single"} title="READ MORE" rel="bookmark" className="site-button-link">View More</NavLink>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                ))}
                            </div>    
                            <ul className="flex justify-center items-center space-x-2 mt-8 mb-4">
                                <li><NavLink to={"#"} className="flex items-center justify-center w-10 h-10 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 transition-colors">&laquo;</NavLink></li>
                                <li><NavLink to={"#"} className="flex items-center justify-center w-10 h-10 rounded-md bg-[#fb5455] text-white shadow-md">1</NavLink></li>
                                <li><NavLink to={"#"} className="flex items-center justify-center w-10 h-10 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 transition-colors">2</NavLink></li>
                                <li><NavLink to={"#"} className="flex items-center justify-center w-10 h-10 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 transition-colors">3</NavLink></li>
                                <li><NavLink to={"#"} className="flex items-center justify-center w-10 h-10 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 transition-colors">4</NavLink></li>
                                <li><NavLink to={"#"} className="flex items-center justify-center w-10 h-10 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 transition-colors">5</NavLink></li>
                                <li><NavLink to={"#"} className="flex items-center justify-center w-10 h-10 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 transition-colors">&raquo;</NavLink></li>
                            </ul>
                        </div>
                       
                    </div>
                    
                </div>

                </>
        );
    };
};

export default BlogGrid;