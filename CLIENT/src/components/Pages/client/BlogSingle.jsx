import React from 'react';
import { NavLink } from 'react-router-dom';
import Banner from '../../Elements/Banner';
import { useRef, useEffect } from 'react';

// var bnrimg = new URL('../../../images/banner/10.jpg', import.meta.url).href; // ORIGINAL DUMMY - restore when real property photos are ready


var bnrimg = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80"; // TEMP LIVE PREVIEW
var bgimg1 = new URL('../../../images/background/cross-line2.png', import.meta.url).href;

class BlogSingle extends React.Component {
    componentDidMount() {
        

        

    };
    render() {
        const { dynamicBlog } = this.props;
        if (!dynamicBlog) {
            return (
                <div className="relative">
                    <Banner title="Blog Single" pagename="Blog Single" description="" bgimage={bnrimg}/>
                    <div className="relative py-8 md:pt-20 md:pb-12">
                        <div className="max-w-7xl mx-auto px-4 text-center">
                            <h2 className="text-2xl font-semibold text-gray-600">Blog not found or loading...</h2>
                        </div>
                    </div>
                </div>
            );
        }

        const title = dynamicBlog.title;
        const date = dynamicBlog.date;
        const month = dynamicBlog.month;
        const author = dynamicBlog.author || "Admin";
        const category = dynamicBlog.category || "Architecture";
        const image = dynamicBlog.image;
        const shortDescription = dynamicBlog.shortDescription;
        const fullDescription = dynamicBlog.fullDescription;

        return (
            <>
                <div className="relative ">
                    <Banner title="Blog Single Style" pagename="Blog Single" description="The essence of interior design will always be about people and how they live. It is about the realities of what makes for an attractive, civilized." bgimage={bnrimg}/>
                    {/* SECTION CONTENT START */}
                    <div className="relative py-8 md:pt-20 md:pb-12">
                        <div className="max-w-7xl mx-auto px-4">
                            <div className="blog-single-space max-w900 ml-auto mr-auto">
                                {/* BLOG START */}
                                <div className="blog-post blog-detail text-[#2B2B2B]">
                                    <div className="sx-post-media">
                                        <div className="portfolio-item">
                                            <img className="img-responsive" src={image} alt=""/>
                                        </div>
                                    </div>
                                    <div className="sx-post-meta  m-t20">
                                        <ul>
                                            <li className="post-date"><strong>{date} </strong> <span>{month}</span> </li>
                                            <li className="post-author"><NavLink to={"#"}>By <span>{author}</span></NavLink> </li>
                                            <li className="post-category"><NavLink to={"#"}><span>{category}</span></NavLink> </li>
                                        </ul>
                                    </div>
                                    <div className="sx-post-title m-t20 m-b20">
                                        <h3 className="post-title font-bold text-3xl md:text-4xl text-slate-900 leading-tight">{title}</h3>
                                    </div>
                                    {shortDescription && (
                                        <p className="text-base text-slate-600 italic mt-3 mb-4 border-l-4 border-[#F4B54B] pl-4">{shortDescription}</p>
                                    )}
                                    <div className="sx-post-text">
                                        {fullDescription ? (
                                            // Dynamic blog: render stored HTML (including <script>/<style>)
                                            // Script execution is handled by DynamicHtmlRenderer below
                                            <DynamicHtmlRenderer html={fullDescription} />
                                        ) : (
                                            // Static fallback: hardcoded demo content for non-dynamic pages
                                            <>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta.</p>
                                            <p>
                                            </p><blockquote className="bdr-1 bdr-solid bdr-gray author-quote">
                                                <h4 className="m-b0">We let our quality work and commitment to customer satisfaction be our slogan. quality you deserve and dependability you can count on.<i className="fa fa-quote-left" /> </h4>
                                                <div className="p-t15">
                                                    <strong>Jessica Mcdade</strong>
                                                    <span>Interior Designer</span>
                                                </div>
                                            </blockquote>
                                            <div className="grid grid-cols-12 gap-8">
                                                <div className="col-span-12 md:col-span-6">
                                                    <div className="sx-box m-b30">
                                                        <div className="sx-media">
                                                            {/* <img src={new URL('../../../images/blog/default/thum1.jpg', import.meta.url).href} alt=""/> ORIGINAL DUMMY */}
                                                            <img src={"https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=80"} alt=""/> {/* TEMP LIVE PREVIEW */}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-span-12 md:col-span-6">
                                                    <div className="sx-box m-b30">
                                                        <div className="sx-media">
                                                            {/* <img src={new URL('../../../images/blog/default/thum2.jpg', import.meta.url).href} alt="" /> ORIGINAL DUMMY */}
                                                            <img src={"https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1600&q=80"} alt="" /> {/* TEMP LIVE PREVIEW */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. remaining essentially unchanged. It was popularised in the with the . Proin tincidunt tellus ac porta volutpat. Cras mattis congue lacus id bibendum. Mauris ut sodales libero. Maecenas feugiat sit amet enim in accumsan. Here, then, is what I wanted to tell you of my architecture. I created it with courage and idealism, but also with an awareness of the fact that what is important is life, friends, and attempting to make this unjust world a better place in which to live.</p>
                                            </>
                                        )}
                                    </div>
                                    <div className="autor-post-tag-share p-a30 bg-gray">
                                        <div className="grid grid-cols-12 gap-8">

                                            <div className="col-span-12">
                                                <div className="clearfix single-post-share">
                                                    <h5>Share this Post:</h5>
                                                    <div className="widget_social_inks">
                                                        <ul className="social-icons social-md social-square social-dark m-b0 flex gap-2">
                                                            <li>
                                                                <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="flex items-center justify-center w-10 h-10 bg-white border border-gray-200 hover:bg-[#F4B54B] hover:text-white transition-colors group">
                                                                    <svg className="text-gray-500 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="https://www.twitter.com" target="_blank" rel="noreferrer" className="flex items-center justify-center w-10 h-10 bg-white border border-gray-200 hover:bg-[#F4B54B] hover:text-white transition-colors group">
                                                                    <svg className="text-gray-500 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="https://rss.com" target="_blank" rel="noreferrer" className="flex items-center justify-center w-10 h-10 bg-white border border-gray-200 hover:bg-[#F4B54B] hover:text-white transition-colors group">
                                                                    <svg className="text-gray-500 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11a9 9 0 0 1 9 9"></path><path d="M4 4a16 16 0 0 1 16 16"></path><circle cx="5" cy="19" r="1"></circle></svg>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="https://www.youtube.com" target="_blank" rel="noreferrer" className="flex items-center justify-center w-10 h-10 bg-white border border-gray-200 hover:bg-[#F4B54B] hover:text-white transition-colors group">
                                                                    <svg className="text-gray-500 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="flex items-center justify-center w-10 h-10 bg-white border border-gray-200 hover:bg-[#F4B54B] hover:text-white transition-colors group">
                                                                    <svg className="text-gray-500 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>


                            </div>
                        </div>
                    </div>
                    {/* SECTION CONTENT END */}
                </div>

                </>
        );
    };
};

import { useParams } from 'react-router-dom';
import { fetchBlogBySlug, getMediaUrl } from '@/lib/api';
import { useState } from 'react';

/* ─────────────────────────────────────────
   DynamicHtmlRenderer
   Renders raw/unsanitized HTML (including <script> and <style>) and
   re-executes any <script> tags after mount, because React's
   dangerouslySetInnerHTML intentionally does NOT execute injected scripts.

   NOTE: Intentionally rendering raw/unsanitized HTML (including <script>) —
   this is a conscious tradeoff for a single-trusted-admin context.
   Revisit with sanitization (e.g. DOMPurify) before this becomes
   multi-admin or exposed to any non-trusted input source.
───────────────────────────────────────── */
const DynamicHtmlRenderer = ({ html }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;
        // Find all <script> elements injected by dangerouslySetInnerHTML
        const scripts = containerRef.current.querySelectorAll('script');
        scripts.forEach((oldScript) => {
            const newScript = document.createElement('script');
            // Copy all attributes (type, src, async, etc.)
            Array.from(oldScript.attributes).forEach((attr) => {
                newScript.setAttribute(attr.name, attr.value);
            });
            // Copy inline script content
            if (oldScript.textContent) {
                newScript.textContent = oldScript.textContent;
            }
            // Replace old (non-executing) script with new live script element
            oldScript.parentNode.replaceChild(newScript, oldScript);
        });
    }, [html]); // Re-run if html changes

    return (
        <div
            ref={containerRef}
            className="dynamic-blog-content"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
};

const BlogSingleWrapper = (props) => {
    const { id } = useParams(); // 'id' holds the slug from the URL based on route setup
    const [dynamicBlog, setDynamicBlog] = useState(null);

    useEffect(() => {
        const loadBlog = async () => {
            if (id) {
                try {
                    const response = await fetchBlogBySlug(id);
                    const blogData = response.data || response;
                    if (blogData) {
                        setDynamicBlog({
                            ...blogData,
                            title: blogData.title,
                            date: new Date(blogData.published_date).getDate(),
                            month: new Date(blogData.published_date).toLocaleString('default', { month: 'short' }) + ' ' + new Date(blogData.published_date).getFullYear(),
                            author: blogData.author,
                            category: blogData.category,
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
