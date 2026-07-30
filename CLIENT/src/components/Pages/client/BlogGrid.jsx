import React from 'react';
import { NavLink } from 'react-router-dom';
import Banner from '../../Elements/Banner';
import { fetchAllBlogsClient, getMediaUrl } from '@/lib/api';



// var bnrimg = new URL('../../../images/banner/7.jpg', import.meta.url).href; // ORIGINAL DUMMY - restore when real property photos are ready


var bnrimg = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80"; // TEMP LIVE PREVIEW

class BlogGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dynamicBlogs: [],
            currentPage: 1,
            blogsPerPage: 5
        };
    }

    handlePageChange = (pageNumber, e) => {
        if(e) e.preventDefault();
        this.setState({ currentPage: pageNumber });
        window.scrollTo({ top: 300, behavior: 'smooth' });
    };

    async componentDidMount() {
        try {
            const response = await fetchAllBlogsClient();
            const data = response.data || response;
            const published = data.map(b => ({
                ...b,
                image: b.image_url ? getMediaUrl(b.image_url) : "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1600&q=80",
                month: new Date(b.published_date).toLocaleString('default', { month: 'short' }),
                date: new Date(b.published_date).getDate()
            }));
            this.setState({ dynamicBlogs: published });
        } catch (error) {
            console.error("Failed to load blogs", error);
        }
    }

    render() {
        const { dynamicBlogs, currentPage, blogsPerPage } = this.state;
        
        // Calculate pagination variables
        const indexOfLastBlog = currentPage * blogsPerPage;
        const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
        const currentBlogs = dynamicBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
        const totalPages = Math.ceil(dynamicBlogs.length / blogsPerPage);

        return (
            <>
                <div className="relative">
                    <Banner title="Blog Grid Style" pagename="Blog Grid" description="The essence of interior design will always be about people and how they live. It is about the realities of what makes for an attractive, civilized." bgimage={bnrimg}/>
                   
                    <div className="relative py-8 md:py-20 bg-white">
                       
                    <div className="max-w-7xl mx-auto px-4">
                        {dynamicBlogs.length === 0 ? (
                            <div className="text-center py-20 text-gray-500 text-xl font-medium w-full">
                                No blogs available
                            </div>
                        ) : (
                            <div className="masonry-outer mfp-gallery news-grid clearfix grid grid-cols-12 gap-8 ">
                                {currentBlogs.map((item, index) => (
                                    <div className="masonry-item col-span-12 md:col-span-6 lg:col-span-4" key={index}>
                                    <div className="blog-post blog-grid date-style-2">
                                        <div className="sx-post-media sx-img-effect img-reflection">
                                            <NavLink to={item.slug ? `/blog-single/${item.slug}` : "/blog-single"}><img src={item.image} alt="" className="w-full h-56 object-cover" /></NavLink>
                                        </div>
                                        <div className="sx-post-info p-t30">
                                            <div className="sx-post-meta ">
                                                <ul>
                                                    <li className="post-date"><strong>{item.date}</strong> <span>{item.month}</span> </li>
                                                    <li className="post-author"><NavLink to={item.slug ? `/blog-single/${item.slug}` : "/blog-single"}>By <span>{item.author || 'Admin'}</span></NavLink> </li>

                                                </ul>
                                            </div>
                                            <div className="sx-post-title ">
                                                <h4 className="post-title"><NavLink to={item.slug ? `/blog-single/${item.slug}` : "/blog-single"}>{item.title}</NavLink></h4>
                                            </div>
                                            {item.shortDescription && (
                                                <p className="text-sm text-gray-600 mt-2 mb-3 line-clamp-2">{item.shortDescription}</p>
                                            )}
                                            <div className="sx-post-readmore">
                                                <NavLink to={item.slug ? `/blog-single/${item.slug}` : "/blog-single"} title="READ MORE" rel="bookmark" className="site-button-link">View More</NavLink>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                ))}
                            </div>
                        )}
                            
                            {/* Pagination */}
                            {totalPages > 1 && (
                                <ul className="flex justify-center items-center space-x-2 mt-8 mb-4">
                                    <li>
                                        <button 
                                            onClick={(e) => currentPage > 1 && this.handlePageChange(currentPage - 1, e)} 
                                            className={`flex items-center justify-center w-10 h-10 rounded-md border border-gray-300 transition-colors ${currentPage === 1 ? 'bg-gray-50 text-gray-300 cursor-not-allowed' : 'bg-white text-gray-500 hover:bg-gray-100'}`}
                                            disabled={currentPage === 1}
                                        >&laquo;</button>
                                    </li>
                                    
                                    {[...Array(totalPages)].map((_, i) => (
                                        <li key={i}>
                                            <button 
                                                onClick={(e) => this.handlePageChange(i + 1, e)} 
                                                className={`flex items-center justify-center w-10 h-10 rounded-md shadow-sm transition-colors ${currentPage === i + 1 ? 'bg-[#9C652A] text-white font-bold' : 'border border-gray-300 bg-white text-gray-500 hover:bg-gray-100'}`}
                                            >
                                                {i + 1}
                                            </button>
                                        </li>
                                    ))}
                                    
                                    <li>
                                        <button 
                                            onClick={(e) => currentPage < totalPages && this.handlePageChange(currentPage + 1, e)} 
                                            className={`flex items-center justify-center w-10 h-10 rounded-md border border-gray-300 transition-colors ${currentPage === totalPages ? 'bg-gray-50 text-gray-300 cursor-not-allowed' : 'bg-white text-gray-500 hover:bg-gray-100'}`}
                                            disabled={currentPage === totalPages}
                                        >&raquo;</button>
                                    </li>
                                </ul>
                            )}
                        </div>
                       
                    </div>
                    
                </div>

                </>
        );
    };
};

export default BlogGrid;
