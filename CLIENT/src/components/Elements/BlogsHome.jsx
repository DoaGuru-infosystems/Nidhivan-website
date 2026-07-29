import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getBlogs } from '@/lib/dataStore';

var bgimg1 = new URL('../../images/background/cross-line2.png', import.meta.url).href;

const BlogsHome = () => {
    const [latestBlogs, setLatestBlogs] = useState([]);

    useEffect(() => {
        // Get all published blogs and take the latest 5
        const dynamic = getBlogs().filter(b => b.status === 'Published');
        setLatestBlogs(dynamic.slice(0, 5));
    }, []);

    if (latestBlogs.length === 0) return null;

    return (
        <div className="section-full p-t80 p-b50 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                {/* TITLE START */}
                <div className="section-head">
                    <div className="sx-separator-outer separator-left">
                        <div className="sx-separator bg-white bg-moving bg-repeat-x" style={{ backgroundImage: 'url(' + bgimg1 + ')' }}>
                            <h3 className="sep-line-one">Latest Blogs</h3>
                        </div>
                    </div>
                </div>
                {/* TITLE END */}
                
                <div className="grid grid-cols-12 gap-8">
                    {latestBlogs.map((item, index) => (
                        <div className="col-span-12 md:col-span-6 lg:col-span-4" key={index}>
                            <div className="blog-post blog-grid date-style-2 h-full flex flex-col shadow-sm rounded-lg overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="sx-post-media sx-img-effect img-reflection">
                                    <NavLink to={item.id ? `/blog-single/${item.id}` : "/blog-single"}><img src={item.image} alt="" className="w-full h-56 object-cover" /></NavLink>
                                </div>
                                <div className="sx-post-info p-6 flex flex-col flex-grow">
                                    <div className="sx-post-meta mb-3">
                                        <ul className="flex items-center text-sm text-gray-500 gap-4">
                                            <li className="post-date text-[#118A43]"><strong>{item.date}</strong> <span className="ml-1 uppercase">{item.month}</span> </li>
                                            <li className="post-author"><NavLink to={item.id ? `/blog-single/${item.id}` : "/blog-single"} className="hover:text-[#118A43]">By <span>{item.author}</span></NavLink> </li>
                                        </ul>
                                    </div>
                                    <div className="sx-post-title mb-3">
                                        <h4 className="post-title text-xl font-semibold leading-snug"><NavLink to={item.id ? `/blog-single/${item.id}` : "/blog-single"} className="hover:text-[#118A43]">{item.title}</NavLink></h4>
                                    </div>
                                    {item.shortDescription && (
                                        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{item.shortDescription}</p>
                                    )}
                                    <div className="sx-post-readmore mt-auto pt-2 border-t border-gray-100">
                                        <NavLink to={item.id ? `/blog-single/${item.id}` : "/blog-single"} title="READ MORE" rel="bookmark" className="text-sm font-semibold text-[#118A43] hover:text-[#0f7a3b]">View More &rarr;</NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogsHome;
