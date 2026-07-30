import React from 'react';
import { NavLink } from 'react-router-dom';
import Banner from '../../Elements/Banner';
import { useRef, useEffect } from 'react';

// var bnrimg = new URL('../../../images/banner/10.jpg', import.meta.url).href; // ORIGINAL DUMMY - restore when real property photos are ready


var bnrimg = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80"; // TEMP LIVE PREVIEW
var bgimg1 = new URL('../../../images/background/cross-line2.png', import.meta.url).href;

class BlogSingle extends React.Component {
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

        loadScript('/assets/js/custom.js').catch(e => console.warn('custom.js not found'));

    };
    render() {
        const { dynamicBlog } = this.props;
        const title = dynamicBlog?.title || "Blog post with image slider there are many variations of passages.";
        const date = dynamicBlog ? dynamicBlog.date : "20";
        const month = dynamicBlog ? dynamicBlog.month : "Septembar 2022";
        const author = dynamicBlog?.author || "Admin";
        const category = dynamicBlog?.category || "Architecture";
        const image = dynamicBlog?.image || "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1600&q=80";
        const shortDescription = dynamicBlog?.shortDescription || null;
        const fullDescription = dynamicBlog?.fullDescription || null;

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
                                                <div className="widget_tag_cloud m-b15">
                                                    <h5 className="tagcloud">Tags</h5>
                                                    <div className="tagcloud">
                                                        <NavLink to={"/blog-masonry"}>Kitchen</NavLink>
                                                        <NavLink to={"/blog-masonry"}>Food</NavLink>
                                                        <NavLink to={"/blog-masonry"}>Planining</NavLink>
                                                        <NavLink to={"/blog-masonry"}>Between </NavLink>
                                                        <NavLink to={"/blog-masonry"}>Chairs</NavLink>
                                                        <NavLink to={"/blog-masonry"}>Lawn</NavLink>
                                                        <NavLink to={"/blog-masonry"}>Table</NavLink>
                                                        <NavLink to={"/blog-masonry"}>Mantinance</NavLink>
                                                        <NavLink to={"/blog-masonry"}>Room</NavLink>
                                                        <NavLink to={"/blog-masonry"}>Landscape </NavLink>
                                                        <NavLink to={"/blog-masonry"}>Bedroom </NavLink>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="clearfix single-post-share">
                                                    <h5>Share this Post:</h5>
                                                    <div className="widget_social_inks">
                                                        <ul className="social-icons social-md social-square social-dark m-b0">
                                                            <li><a href="https://www.facebook.com" target="_blank" className="fa fa-facebook" /></li>
                                                            <li><a href="https://www.twitter.com" target="_blank" className="fa fa-twitter" /></li>
                                                            <li><a href="https://rss.com" target="_blank" className="fa fa-rss" /></li>
                                                            <li><a href="https://www.youtube.com" target="_blank" className="fa fa-youtube" /></li>
                                                            <li><a href="https://www.instagram.com" target="_blank" className="fa fa-instagram" /></li>
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
