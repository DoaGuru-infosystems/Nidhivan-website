import React from 'react';
import { NavLink } from 'react-router-dom';
import Banner from '../../Elements/Banner';
import { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBlogBySlug, getMediaUrl } from '@/lib/api';
import { Calendar, User, Tag, Share2, Link as LinkIcon } from 'lucide-react';

var bnrimg = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80"; // TEMP LIVE PREVIEW

/* ─────────────────────────────────────────
   DynamicHtmlRenderer
───────────────────────────────────────── */
const DynamicHtmlRenderer = ({ html }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const scripts = containerRef.current.querySelectorAll('script');
        scripts.forEach((oldScript) => {
            const newScript = document.createElement('script');
            Array.from(oldScript.attributes).forEach((attr) => {
                newScript.setAttribute(attr.name, attr.value);
            });
            if (oldScript.textContent) {
                newScript.textContent = oldScript.textContent;
            }
            oldScript.parentNode.replaceChild(newScript, oldScript);
        });
    }, [html]);

    return (
        <>
            <style>{`
                .dynamic-blog-content h1, 
                .dynamic-blog-content h2, 
                .dynamic-blog-content h3, 
                .dynamic-blog-content h4, 
                .dynamic-blog-content h5, 
                .dynamic-blog-content h6 {
                    color: #885023 !important;
                }
            `}</style>
            <div
                ref={containerRef}
                className="dynamic-blog-content"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </>
    );
};

class BlogSingle extends React.Component {
    render() {
        const { dynamicBlog } = this.props;
        
        if (!dynamicBlog) {
            return (
                <div className="relative bg-bg-cream min-h-screen pt-32 pb-20">
                    <div className="max-w-7xl mx-auto px-4 text-center">
                        <div className="animate-pulse space-y-6 max-w-3xl mx-auto">
                            <div className="h-96 bg-gray-200 rounded-2xl" />
                            <div className="h-8 bg-gray-200 rounded w-2/3 mx-auto" />
                            <div className="h-4 bg-gray-200 rounded w-full" />
                            <div className="h-4 bg-gray-200 rounded w-full" />
                            <div className="h-4 bg-gray-200 rounded w-4/5 mx-auto" />
                        </div>
                    </div>
                </div>
            );
        }

        const title = dynamicBlog.title;
        const date = dynamicBlog.date;
        const month = dynamicBlog.month;
        const author = dynamicBlog.author || "Admin";
        const category = dynamicBlog.category || "General";
        const keywords = dynamicBlog.keywords || [];
        const image = dynamicBlog.image || bnrimg;
        const shortDescription = dynamicBlog.shortDescription;
        const fullDescription = dynamicBlog.fullDescription;

        return (
            <div className="relative bg-bg-cream min-h-screen">
                
                {/* ── Hero Image with Title Overlay ── */}
                <div className="relative w-full h-[60vh] min-h-[450px] flex flex-col justify-end">
                    <div className="absolute inset-0">
                        <img src={image} alt={title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/70 to-transparent"></div>
                    </div>
                    
                    <div className="relative z-10 max-w-5xl mx-auto w-full px-4 pb-16 text-center">
                        <div className="mb-6 flex items-center justify-center gap-4 text-white/90 text-sm font-bold uppercase tracking-widest">
                            <span className="bg-brand-gold text-brand-ink px-4 py-1.5 rounded-full">{category}</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white heading-font mb-6 leading-tight drop-shadow-lg">{title}</h1>
                        <div className="flex items-center justify-center gap-6 text-white/80 text-sm font-semibold tracking-wide">
                            <div className="flex items-center gap-2"><User size={16} className="text-brand-gold"/> By {author}</div>
                            <div className="flex items-center gap-2"><Calendar size={16} className="text-brand-gold"/> {month}</div>
                        </div>
                    </div>
                </div>

                {/* ── Content Layout ── */}
                <div className="relative py-16 md:py-24">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                            
                            {/* ── Main Content (Left) ── */}
                            <div className="lg:col-span-8">
                                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
                                    {shortDescription && (
                                        <p className="text-xl md:text-2xl text-gray-500 italic mb-10 leading-relaxed font-light border-l-4 border-brand-gold pl-6">
                                            "{shortDescription}"
                                        </p>
                                    )}
                                    
                                    <div className="text-gray-700 leading-loose text-lg">
                                        {fullDescription ? (
                                            <DynamicHtmlRenderer html={fullDescription} />
                                        ) : (
                                            <div className="text-gray-400 italic">Content is missing for this blog post.</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            
                            {/* ── Sidebar (Right) ── */}
                            <div className="lg:col-span-4">
                                <div className="sticky top-24 space-y-8">
                                    
                                    {/* Share Widget */}
                                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                            <Share2 size={24} className="text-brand-gold" />
                                            <h3 className="text-2xl font-bold text-brand-ink heading-font">Share</h3>
                                        </div>
                                        
                                        <div className="flex flex-col gap-3">
                                            <button className="flex items-center justify-between px-6 py-3 rounded-xl bg-gray-50 hover:bg-brand-ink hover:text-brand-gold text-gray-700 font-bold transition-colors group">
                                                <div className="flex items-center gap-3">
                                                    <svg className="w-[18px] h-[18px] group-hover:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg> Facebook
                                                </div>
                                            </button>
                                            <button className="flex items-center justify-between px-6 py-3 rounded-xl bg-gray-50 hover:bg-brand-ink hover:text-brand-gold text-gray-700 font-bold transition-colors group">
                                                <div className="flex items-center gap-3">
                                                    <svg className="w-[18px] h-[18px] group-hover:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg> Twitter
                                                </div>
                                            </button>
                                            <button className="flex items-center justify-between px-6 py-3 rounded-xl bg-gray-50 hover:bg-brand-ink hover:text-brand-gold text-gray-700 font-bold transition-colors group">
                                                <div className="flex items-center gap-3">
                                                    <svg className="w-[18px] h-[18px] group-hover:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg> LinkedIn
                                                </div>
                                            </button>
                                            <button onClick={() => {navigator.clipboard.writeText(window.location.href); alert('Link copied to clipboard!');}} className="flex items-center justify-between px-6 py-3 rounded-xl bg-gray-50 hover:bg-brand-gold hover:text-brand-ink text-gray-700 font-bold transition-colors group mt-2 border border-gray-200">
                                                <div className="flex items-center gap-3">
                                                    <LinkIcon size={18} /> Copy Link
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                    
                                    {/* Keywords Widget */}
                                    {keywords && keywords.length > 0 && (
                                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                                <Tag size={24} className="text-brand-gold" />
                                                <h3 className="text-2xl font-bold text-brand-ink heading-font">Tags</h3>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {keywords.map((kw, idx) => (
                                                    <span key={idx} className="px-3 py-1.5 bg-brand-green/10 text-brand-gold rounded-lg text-sm font-semibold">
                                                        {kw}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Author Widget */}
                                    <div className="bg-brand-ink rounded-2xl p-8 shadow-xl border-t-4 border-brand-gold">
                                        <h3 className="text-xl font-bold text-white mb-2 heading-font">About the Author</h3>
                                        <div className="flex items-center gap-4 mt-6">
                                            <div className="w-16 h-16 rounded-full bg-brand-gold flex items-center justify-center text-brand-ink font-bold text-2xl">
                                                {author.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-bold text-brand-gold">{author}</h4>
                                                <p className="text-gray-400 text-sm">Content Creator</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}

const BlogSingleWrapper = (props) => {
    const { id } = useParams();
    const [dynamicBlog, setDynamicBlog] = useState(null);

    useEffect(() => {
        const loadBlog = async () => {
            if (id) {
                try {
                    const response = await fetchBlogBySlug(id);
                    const blogData = response.data || response;
                    if (blogData) {
                        const parseKeywords = (kwString) => {
                            if (!kwString) return [];
                            if (kwString.includes(',')) {
                                return kwString.split(',').map(k => k.trim()).filter(Boolean);
                            }
                            return kwString.split(/\s+/).filter(Boolean);
                        };

                        setDynamicBlog({
                            ...blogData,
                            title: blogData.title,
                            date: new Date(blogData.published_date).getDate(),
                            month: new Date(blogData.published_date).toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric' }),
                            author: blogData.author,
                            category: blogData.category,
                            keywords: parseKeywords(blogData.meta_keywords || blogData.keywords),
                            image: blogData.image_url ? getMediaUrl(blogData.image_url) : null,
                            shortDescription: blogData.short_description,
                            fullDescription: blogData.content
                        });
                    }
                } catch (error) {
                    console.error("Failed to load blog", error);
                }
            }
        };
        loadBlog();
    }, [id]);

    return <BlogSingle {...props} dynamicBlog={dynamicBlog} />;
};

export default BlogSingleWrapper;
