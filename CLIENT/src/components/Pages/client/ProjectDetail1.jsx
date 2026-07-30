import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Banner from '../../Elements/Banner';
import SimilarProjectsCarousel from '../../Elements/SimilarProjectsCarousel';
import { fetchProjectById, getMediaUrl } from '@/lib/api';
import { MapPin, Calendar, Tag, Layers, ChevronLeft, ChevronRight } from 'lucide-react';

var bnrimg = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=80";

/* ─────────────────────────────────────────
   Swipeable Image Carousel
   Touch-swipe + arrow nav + dot indicators
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
        <div className="relative w-full overflow-hidden rounded-2xl bg-slate-900 aspect-[16/10] md:aspect-[16/9] shadow-lg shadow-slate-900/10">
            <div
                className="flex h-full transition-transform duration-500 ease-out"
                style={ { transform: `translateX(-${active * 100}%)` } }
                onTouchStart={ onTouchStart }
                onTouchMove={ onTouchMove }
                onTouchEnd={ onTouchEnd }
            >
                { images.map((src, idx) => (
                    <div key={ idx } className="w-full h-full flex-shrink-0 flex items-center justify-center bg-slate-100">
                        <img
                            src={ src }
                            alt={ `${title} — photo ${idx + 1}` }
                            className="w-full h-full object-contain select-none"
                            draggable={ false }
                        />
                    </div>
                )) }
            </div>

            { count > 1 && (
                <>
                    <button
                        onClick={ prev }
                        aria-label="Previous photo"
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-md transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#118A43]"
                    >
                        <ChevronLeft size={ 20 } />
                    </button>
                    <button
                        onClick={ next }
                        aria-label="Next photo"
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-md transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#118A43]"
                    >
                        <ChevronRight size={ 20 } />
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full">
                        { images.map((_, idx) => (
                            <button
                                key={ idx }
                                onClick={ () => goTo(idx) }
                                aria-label={ `Go to photo ${idx + 1}` }
                                className={ `transition-all rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-white ${idx === active ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/60 hover:bg-white/90'
                                    }` }
                            />
                        )) }
                    </div>

                    <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full tracking-wide">
                        { active + 1 } / { count }
                    </div>
                </>
            ) }
        </div>
    );
};

/* ─────────────────────────────────────────
   Fact row — single label/value pair
───────────────────────────────────────── */
const FactRow = ({ icon: Icon, label, value, last }) => (
    <div className={ `flex items-start gap-3 py-4 ${!last ? 'border-b border-slate-100' : ''}` }>
        <div className="w-9 h-9 rounded-lg bg-[#118A43]/10 text-[#118A43] flex items-center justify-center flex-shrink-0 mt-0.5">
            <Icon size={ 17 } />
        </div>
        <div>
            <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-0.5">{ label }</div>
            <div className="text-slate-800 font-medium">{ value || '—' }</div>
        </div>
    </div>
);

const STATUS_STYLES = {
    completed: 'bg-[#118A43]/10 text-[#118A43] border-[#118A43]/20',
    ongoing: 'bg-[#F4B54B]/15 text-[#8c6523] border-[#F4B54B]/30',
    default: 'bg-slate-100 text-slate-600 border-slate-200',
};

const StatusBadge = ({ status }) => {
    const key = (status || '').toLowerCase();
    const style = STATUS_STYLES[key] || STATUS_STYLES.default;
    return (
        <span className={ `inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide border ${style}` }>
            { status || 'Status unavailable' }
        </span>
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
                <div className="relative">
                    <Banner title="Project Details" pagename="Project Detail" description="" bgimage={ bnrimg } />
                    <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
                        <div className="animate-pulse space-y-6">
                            <div className="h-80 md:h-[420px] bg-slate-200 rounded-2xl" />
                            <div className="h-6 bg-slate-200 rounded w-1/3" />
                            <div className="h-4 bg-slate-200 rounded w-2/3" />
                        </div>
                    </div>
                </div>
            );
        }

        if (!dynamicProject) {
            return (
                <div className="relative">
                    <Banner title="Project Details" pagename="Project Detail" description="" bgimage={ bnrimg } />
                    <div className="max-w-3xl mx-auto px-4 py-20 md:py-28 text-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">This project couldn't be found</h2>
                        <p className="text-slate-500">It may have been removed, or the link might be incorrect. Take a look at similar projects below.</p>
                    </div>
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

        return (
            <div className="relative bg-[#fafaf9]">
                <Banner
                    title={ title || 'Project Details' }
                    pagename="Project Detail"
                    description=""
                    bgimage={ bnrimg }
                />

                <div className="relative py-10 md:py-20">
                    <div className="max-w-6xl mx-auto px-4 md:px-6">

                        {/* ── Carousel ── */ }
                        <ImageCarousel images={ images } title={ title } />

                        {/* ── Title row (mobile-first, appears under carousel) ── */ }
                        <div className="mt-6 md:mt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">{ title }</h1>
                                { location && (
                                    <div className="flex items-center gap-1.5 text-slate-500 mt-1.5">
                                        <MapPin size={ 15 } />
                                        <span className="text-sm">{ location }</span>
                                    </div>
                                ) }
                            </div>
                            { status && <StatusBadge status={ status } /> }
                        </div>

                        {/* ── Content grid ── */ }
                        <div className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-12 gap-8">

                            {/* Description */ }
                            <div className="md:col-span-7">
                                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
                                    <h2 className="text-lg font-bold text-slate-800 mb-4">About this project</h2>
                                    <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                                        { content || description || "Details for this project are being finalised. Please check back shortly, or get in touch with our team for more information." }
                                    </p>
                                </div>
                            </div>

                            {/* Facts card */ }
                            <div className="md:col-span-5">
                                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 md:sticky md:top-24">
                                    <h2 className="text-lg font-bold text-slate-800 mb-2">Project details</h2>
                                    <div>
                                        <FactRow icon={ Tag } label="Type" value={ displayType } />
                                        <FactRow icon={ Layers } label="Category" value={ category } />
                                        <FactRow icon={ MapPin } label="Location" value={ location } />
                                        <FactRow icon={ Calendar } label="Listed on" value={ formattedDate } last />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <SimilarProjectsCarousel />
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

    return <ProjectDetail1 { ...props } dynamicProject={ dynamicProject } loading={ loading } />;
};

export default ProjectDetail1Wrapper;