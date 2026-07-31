import React from 'react';
import { NavLink } from 'react-router-dom';
import Banner from '../../Elements/Banner';
import { fetchAllBlogsClient, getMediaUrl } from '@/lib/api';
import { ChevronRight, Calendar, User } from 'lucide-react';

var bnrimg = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80"; // TEMP LIVE PREVIEW

class BlogGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dynamicBlogs: [],
            currentPage: 1,
            blogsPerPage: 6
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
                date: new Date(b.published_date).getDate(),
                year: new Date(b.published_date).getFullYear()
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
            <div className="relative bg-bg-cream min-h-screen">
                <Banner title="News & Insights" pagename="Blogs" description="Stay updated with the latest trends, tips, and news in real estate and architecture." bgimage={bnrimg}/>
               
                <div className="relative py-12 md:py-24">
                    <div className="max-w-7xl mx-auto px-4">
                        {dynamicBlogs.length === 0 ? (
                            <div className="text-center py-20 text-gray-500 text-xl font-medium w-full bg-white rounded-2xl shadow-sm border border-gray-100">
                                No blogs available at the moment.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {currentBlogs.map((item, index) => (
                                    <div key={index} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
                                        
                                        {/* Image Container */}
                                        <div className="relative h-64 overflow-hidden">
                                            <NavLink to={item.slug ? `/blog-single/${item.slug}` : "/blog-single"} className="block w-full h-full">
                                                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                            </NavLink>
                                            
                                            {/* Date Badge */}
                                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md text-center border border-white/20">
                                                <span className="block text-2xl font-bold text-brand-gold leading-none">{item.date}</span>
                                                <span className="block text-xs font-semibold uppercase text-brand-ink tracking-wider mt-1">{item.month}</span>
                                            </div>
                                        </div>
                                        
                                        {/* Content */}
                                        <div className="p-8 flex-grow flex flex-col border-b-4 border-transparent group-hover:border-brand-gold transition-colors duration-300">
                                            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
                                                <span className="flex items-center gap-1.5"><User size={14} className="text-brand-gold" /> {item.author || 'Admin'}</span>
                                            </div>
                                            
                                            <h4 className="text-2xl font-bold mb-4 heading-font text-brand-ink group-hover:text-brand-gold transition-colors">
                                                <NavLink to={item.slug ? `/blog-single/${item.slug}` : "/blog-single"}>{item.title}</NavLink>
                                            </h4>
                                            
                                            {item.shortDescription && (
                                                <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                                                    {item.shortDescription}
                                                </p>
                                            )}
                                            
                                            <div className="mt-auto pt-4 border-t border-gray-100">
                                                <NavLink to={item.slug ? `/blog-single/${item.slug}` : "/blog-single"} className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-brand-ink hover:text-brand-gold transition-colors">
                                                    Read Article <ChevronRight size={16} className="text-brand-gold" />
                                                </NavLink>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        
                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="mt-16 flex justify-center">
                                <ul className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                                    <li>
                                        <button 
                                            onClick={(e) => currentPage > 1 && this.handlePageChange(currentPage - 1, e)} 
                                            className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-brand-ink hover:bg-gray-100'}`}
                                            disabled={currentPage === 1}
                                        >&laquo;</button>
                                    </li>
                                    
                                    {[...Array(totalPages)].map((_, i) => (
                                        <li key={i}>
                                            <button 
                                                onClick={(e) => this.handlePageChange(i + 1, e)} 
                                                className={`flex items-center justify-center w-10 h-10 rounded-full transition-all font-bold ${currentPage === i + 1 ? 'bg-brand-gold text-brand-ink shadow-md scale-110' : 'text-gray-500 hover:bg-gray-100'}`}
                                            >
                                                {i + 1}
                                            </button>
                                        </li>
                                    ))}
                                    
                                    <li>
                                        <button 
                                            onClick={(e) => currentPage < totalPages && this.handlePageChange(currentPage + 1, e)} 
                                            className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-brand-ink hover:bg-gray-100'}`}
                                            disabled={currentPage === totalPages}
                                        >&raquo;</button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };
};

export default BlogGrid;
