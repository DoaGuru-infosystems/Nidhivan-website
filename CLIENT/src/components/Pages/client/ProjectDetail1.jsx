import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import SimilarProjectsCarousel from '../../Elements/SimilarProjectsCarousel';
import { fetchProjectById, getMediaUrl, submitContactForm } from '@/lib/api';
import { MapPin, Calendar, Tag, Layers, ChevronLeft, ChevronRight, Phone, Mail } from 'lucide-react';

var bnrimg = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=80";

/* ─────────────────────────────────────────
   Swipeable Image Carousel
───────────────────────────────────────── */
const ImageCarousel = ({ images, title }) => {
    const [active, setActive] = useState(0);
    const touchStartX = useRef(null);
    const touchDeltaX = useRef(0);

    const count = images.length;
    const goTo = (idx) => setActive(((idx % count) + count) % count);
    const next = () => goTo(active + 1);
    const prev = () => goTo(active - 1);

    const onTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
        touchDeltaX.current = 0;
    };
    const onTouchMove = (e) => {
        if (touchStartX.current === null) return;
        touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
    };
    const onTouchEnd = () => {
        if (Math.abs(touchDeltaX.current) > 50) {
            touchDeltaX.current < 0 ? next() : prev();
        }
        touchStartX.current = null;
        touchDeltaX.current = 0;
    };

    if (count === 0) return null;

    return (
        <div className="relative w-full overflow-hidden rounded-2xl bg-slate-900 aspect-[16/10] shadow-lg mb-10">
            <div
                className="flex h-full transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${active * 100}%)` }}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                {images.map((src, idx) => (
                    <div key={idx} className="w-full h-full flex-shrink-0 flex items-center justify-center bg-slate-100">
                        <img
                            src={src}
                            alt={`${title} — photo ${idx + 1}`}
                            className="w-full h-full object-contain select-none"
                            draggable={false}
                        />
                    </div>
                ))}
            </div>

            {count > 1 && (
                <>
                    <button
                        onClick={prev}
                        aria-label="Previous photo"
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-brand-gold text-brand-ink hover:text-white flex items-center justify-center shadow-md transition-colors"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={next}
                        aria-label="Next photo"
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-brand-gold text-brand-ink hover:text-white flex items-center justify-center shadow-md transition-colors"
                    >
                        <ChevronRight size={20} />
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 py-2 rounded-full">
                        {images.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => goTo(idx)}
                                aria-label={`Go to photo ${idx + 1}`}
                                className={`transition-all rounded-full ${idx === active ? 'w-6 h-2 bg-brand-gold' : 'w-2 h-2 bg-white/60 hover:bg-white/90'}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

/* ─────────────────────────────────────────
   Fact row
───────────────────────────────────────── */
const FactRow = ({ icon: Icon, label, value, last }) => (
    <div className={`flex items-start gap-3 py-4 ${!last ? 'border-b border-gray-100' : ''}`}>
        <div className="w-10 h-10 rounded-lg bg-brand-green/10 text-brand-green flex items-center justify-center flex-shrink-0">
            <Icon size={18} />
        </div>
        <div>
            <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">{label}</div>
            <div className="text-brand-ink font-bold">{value || '—'}</div>
        </div>
    </div>
);

const STATUS_STYLES = {
    completed: 'bg-brand-green/10 text-brand-green border-brand-green/20',
    ongoing: 'bg-brand-gold/15 text-yellow-700 border-brand-gold/30',
    default: 'bg-gray-100 text-gray-600 border-gray-200',
};

const StatusBadge = ({ status }) => {
    const key = (status || '').toLowerCase();
    const style = STATUS_STYLES[key] || STATUS_STYLES.default;
    return (
        <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase border ${style}`}>
            {status || 'Status unavailable'}
        </span>
    );
};

/* ─────────────────────────────────────────
   Inquire Form Sidebar
───────────────────────────────────────── */
const InquireForm = ({ projectName }) => {
    const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const data = {
                name: formData.name,
                email: formData.email,
                mobile_no: formData.phone,
                subject: `Inquiry for ${projectName}`,
                message: "I am interested in this project. Please contact me with more details."
            };
            const response = await submitContactForm(data);
            if (response && response.success) {
                alert("Thank you! Your inquiry has been sent.");
                setFormData({ name: '', phone: '', email: '' });
            } else {
                alert("Failed to submit inquiry. Please try again later.");
            }
        } catch (error) {
            alert("An error occurred while submitting.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-brand-ink rounded-2xl shadow-xl p-8 border-t-4 border-brand-gold sticky top-24">
            <h3 className="text-2xl font-bold text-white mb-2 heading-font">Inquire Now</h3>
            <p className="text-gray-300 text-sm mb-6">Interested in this property? Leave your details and we will get back to you.</p>
            
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div>
                    <input required type="text" placeholder="Your Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3.5 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-brand-gold bg-white/10 text-white placeholder-gray-400" />
                </div>
                <div>
                    <input required type="tel" placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3.5 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-brand-gold bg-white/10 text-white placeholder-gray-400" />
                </div>
                <div>
                    <input required type="email" placeholder="Email Address" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3.5 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-brand-gold bg-white/10 text-white placeholder-gray-400" />
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-brand-gold hover:bg-white text-brand-ink font-bold py-4 rounded-md transition-colors shadow-md disabled:opacity-70 uppercase tracking-wider mt-2">
                    {isSubmitting ? "Sending..." : "Request Details"}
                </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-700 space-y-4">
                <a href="tel:+919876543210" className="flex items-center gap-3 text-white hover:text-brand-gold transition-colors">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"><Phone size={18} /></div>
                    <span className="font-bold">+91 98765 43210</span>
                </a>
                <a href="mailto:info@nidhivandeveloper.com" className="flex items-center gap-3 text-white hover:text-brand-gold transition-colors">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"><Mail size={18} /></div>
                    <span className="font-bold">info@nidhivandeveloper.com</span>
                </a>
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────
   Main presentational component
───────────────────────────────────────── */
class ProjectDetail1 extends React.Component {
    render() {
        const { dynamicProject, loading } = this.props;

        if (loading) {
            return (
                <div className="min-h-screen bg-bg-cream pt-32 pb-20 px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="animate-pulse space-y-6">
                            <div className="h-96 bg-gray-200 rounded-2xl" />
                            <div className="h-8 bg-gray-200 rounded w-1/3" />
                            <div className="h-4 bg-gray-200 rounded w-2/3" />
                        </div>
                    </div>
                </div>
            );
        }

        if (!dynamicProject) {
            return (
                <div className="min-h-screen bg-bg-cream pt-32 pb-20 px-4 flex flex-col justify-center items-center">
                    <h2 className="text-3xl font-bold text-brand-ink mb-4 heading-font">Project Not Found</h2>
                    <p className="text-gray-500 mb-8">It may have been removed, or the link might be incorrect.</p>
                    <SimilarProjectsCarousel />
                </div>
            );
        }

        const {
            title,
            type,
            category,
            location,
            status,
            content,
            description,
            created_at,
            images = [],
        } = dynamicProject;

        const displayType = type || category;
        const formattedDate = created_at
            ? new Date(created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
            : null;
            
        const heroImage = images.length > 0 ? images[0] : bnrimg;

        return (
            <div className="relative bg-bg-cream">
                
                {/* ── Hero Image with Title Overlay ── */}
                <div className="relative w-full h-[60vh] min-h-[400px] flex flex-col justify-end">
                    <div className="absolute inset-0">
                        <img src={heroImage} alt={title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/60 to-transparent"></div>
                    </div>
                    
                    <div className="relative z-10 max-w-7xl mx-auto w-full px-4 pb-16">
                        {status && <div className="mb-4"><StatusBadge status={status} /></div>}
                        <h1 className="text-4xl md:text-6xl font-bold text-brand-gold heading-font mb-4 drop-shadow-lg">{title}</h1>
                        {location && (
                            <div className="flex items-center gap-2 text-white/90 text-lg">
                                <MapPin size={20} className="text-brand-green" />
                                <span>{location}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="relative py-16">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                            {/* ── Main Content (Left) ── */}
                            <div className="lg:col-span-8">
                                
                                <ImageCarousel images={images} title={title} />
                                
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-10">
                                    <h2 className="text-2xl font-bold text-brand-ink mb-6 heading-font border-b border-gray-100 pb-4">Project Overview</h2>
                                    <div className="text-gray-600 leading-relaxed whitespace-pre-line text-lg">
                                        {content || description || "Details for this project are being finalised. Please check back shortly, or get in touch with our team for more information."}
                                    </div>
                                </div>
                                
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                                    <h2 className="text-2xl font-bold text-brand-ink mb-6 heading-font border-b border-gray-100 pb-4">Key Details</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                                        <FactRow icon={Tag} label="Type" value={displayType} />
                                        <FactRow icon={Layers} label="Category" value={category} />
                                        <FactRow icon={MapPin} label="Location" value={location} />
                                        <FactRow icon={Calendar} label="Listed on" value={formattedDate} last />
                                    </div>
                                </div>

                            </div>

                            {/* ── Sidebar (Right) ── */}
                            <div className="lg:col-span-4">
                                <InquireForm projectName={title} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white py-16 border-t border-gray-100">
                    <SimilarProjectsCarousel />
                </div>
            </div>
        );
    }
}

/* ─────────────────────────────────────────
   Data-fetching wrapper
───────────────────────────────────────── */
const ProjectDetail1Wrapper = (props) => {
    const { id } = useParams();
    const [dynamicProject, setDynamicProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        const loadProject = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const data = await fetchProjectById(id);
                const projectData = data?.data || data;
                if (!cancelled && projectData) {
                    const imageUrls = (projectData.images || [])
                        .map((img) => getMediaUrl(img.image_url || img.image || img))
                        .filter(Boolean);

                    setDynamicProject({ ...projectData, images: imageUrls });
                }
            } catch (error) {
                console.error('Failed to load project', error);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        loadProject();
        return () => { cancelled = true; };
    }, [id]);

    return <ProjectDetail1 {...props} dynamicProject={dynamicProject} loading={loading} />;
};

export default ProjectDetail1Wrapper;