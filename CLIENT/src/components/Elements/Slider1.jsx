import React, { useRef, useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { siteData } from '../../data/siteContent';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay, Navigation } from 'swiper/modules';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ChevronLeft, ChevronRight, PhoneCall, MessageCircle, Mail } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

// Import slider images
// import slide1 from '../../images/main-slider/slider1/slide1.jpg'; // ORIGINAL DUMMY - restore when real property photos are ready
const slide1 = "/images/slide1.jpg"; // TEMP LIVE PREVIEW
// import slide2 from '../../images/main-slider/slider1/slide2.jpg'; // ORIGINAL DUMMY - restore when real property photos are ready
const slide2 = "/images/slide2.jpg"; // TEMP LIVE PREVIEW
// import slide3 from '../../images/main-slider/slider1/slide3.jpg'; // ORIGINAL DUMMY - restore when real property photos are ready
const slide3 = "/images/slide3.jpg"; // TEMP LIVE PREVIEW

gsap.registerPlugin(useGSAP);

const slides = [
 {
  image: slide3,
  tagline: "JABALPUR'S TRUSTED FARMHOUSE DESTINATION",
  title: "Apna Farmhouse,\nAb Har Family Ke Budget Mein.",
  description:
    "Nidhivan Developers brings affordable farmhouse projects near Jabalpur where nature, peace and smart investment come together. Your dream farmhouse is now closer than ever.",
},
  {
    image: slide1,
    tagline: "सपनों की ज़मीन • अपनों के नाम",
    title: "शहर की भागदौड़ से दूर,  सुकून भरे खेत के बीच अपना फार्महाउस",
    description: "जहाँ बच्चों की हँसी हो... बड़ों की शामें सुकून भरी हों... और हर वीकेंड एक नई याद बन जाए।\nअब अपना फार्महाउस खरीदना पहले से कहीं ज़्यादा आसान है।",
  },
  {
  image: slide2,
  tagline: "LIVE CLOSE TO NATURE • INVEST CLOSE TO HOME",
  title: "Jabalpur Ke Paas...\nApna Sapno Ka Farmhouse.",
  description:
    "Weekend getaway ho ya future investment, hamare legally verified farmhouse projects aapke budget aur family dono ko dhyan mein rakhkar develop kiye gaye hain.",
},
];

const Slider1 = () => {
  const containerRef = useRef(null);
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);

  // Animate text layers on each slide change
  const animateSlide = useCallback((swiper) => {
    const activeSlide = swiper.slides[swiper.activeIndex];
    if (!activeSlide) return;

    const elements = activeSlide.querySelectorAll('[data-animate]');
    // Kill any running tweens on these elements
    elements.forEach((el) => gsap.killTweensOf(el));

    gsap.fromTo(
      elements,
      {
        y: 60,
        opacity: 0,
        clipPath: 'inset(-50% 100% -50% -50%)',
      },
      {
        y: 0,
        opacity: 1,
        clipPath: 'inset(-50% -50% -50% -50%)',
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.15,
      }
    );
  }, []);

  // Cleanup all GSAP tweens on unmount
  useGSAP(
    () => {
      // Initial entrance animation handled by Swiper's onSlideChange
      return () => {
        // Cleanup: kill all tweens inside the container
        if (containerRef.current) {
          const allAnimated = containerRef.current.querySelectorAll('[data-animate]');
          allAnimated.forEach((el) => gsap.killTweensOf(el));
        }
      };
    },
    { scope: containerRef }
  );

  return (
    <div ref={ containerRef } className="hero-slider-container" style={ { position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' } }>
      <Swiper
        modules={ [EffectFade, Autoplay, Navigation] }
        effect="fade"
        fadeEffect={ { crossFade: true } }
        speed={ 800 }
        loop={ true }
        autoplay={ {
          delay: 6000,
          disableOnInteraction: false,
        } }
        navigation={ {
          prevEl,
          nextEl,
        } }
        onSlideChangeTransitionStart={ animateSlide }
        onAfterInit={ animateSlide }
        style={ { width: '100%', height: '100%' } }
      >
        { slides.map((slide, index) => (
          <SwiperSlide key={ index }>
            {/* Background Image */ }
            <div
              style={ {
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
              } }
            />
            {/* Dark Overlay */ }
            <div
              style={ {
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.677) 0%, rgba(0, 0, 0, 0.209) 100%)',
                zIndex: 1,
              } }
            />
            {/* Content */ }
            <div className="relative z-10 flex flex-col justify-center h-full px-4 sm:px-8 md:px-12 lg:px-[5%] max-w-[1090px]">
              {/* Company Name / Tagline */ }
              <div className="flex items-center gap-4 mb-6">
                <span className="w-12 h-[2px] bg-[#C9A96A]" />

                <p
                  data-animate
                  className="font-extrabold tracking-[0.18em] text-white/90 uppercase m-0 font-sans drop-shadow-md text-[10px] sm:text-xs md:text-[clamp(12px,1vw,14px)]"
                >
                  { slide.tagline }
                </p>
              </div>
              {/* Main Title */ }
              <h1
                data-animate
                className="font-extrabold leading-tight text-white mb-4 md:mb-5 font-serif whitespace-pre-line text-[28px] sm:text-4xl md:text-5xl lg:text-[clamp(40px,5vw,64px)]"
              >
                { slide.title }
              </h1>
              {/* Description */ }
              <p
                data-animate
                className="leading-relaxed text-white/85 mb-6 md:mb-8 max-w-[700px] font-sans whitespace-pre-line text-[13px] sm:text-sm md:text-base lg:text-lg"
              >
                { slide.description }
              </p>
              {/* CTA Buttons */ }
              <div data-animate className="flex flex-row gap-2 sm:gap-4 flex-wrap w-full sm:w-auto">
                <a
                  href={ `tel:${siteData.contactInfo.phone.split(',')[0].trim()}` }
                  target="_blank"
                  rel="noreferrer"
                  className="site-button flex-1 sm:flex-none flex justify-center items-center gap-1 sm:gap-2 px-2 sm:px-6 py-2 sm:py-3 text-[10px] sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300"
                >
                  <PhoneCall size={ 18 } />
                  <span className="hidden sm:inline">Call Us</span>
                  <span className="sm:hidden">Call</span>
                </a>
                <a
                  href={ `https://wa.me/91${siteData.contactInfo.whatsapp.replace(/\D/g, '').replace(/^0/, '')}` }
                  target="_blank"
                  rel="noreferrer"
                  className="site-button flex-1 sm:flex-none flex justify-center items-center gap-1 sm:gap-2 px-2 sm:px-6 py-2 sm:py-3 text-[10px] sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 !bg-[#25D366] !border-[#25D366] !text-white"
                >
                  <WhatsAppIcon style={{ fontSize: 18 }} />
                  <span className="hidden sm:inline">WhatsApp</span>
                  <span className="sm:hidden">Chat</span>
                </a>
                <a
                  href={ `mailto:${siteData.contactInfo.email}` }
                  target="_blank"
                  rel="noreferrer"
                  className="site-button flex-1 sm:flex-none flex justify-center items-center gap-1 sm:gap-2 px-2 sm:px-6 py-2 sm:py-3 text-[10px] sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300"
                >
                  <Mail size={ 18 } />
                  <span className="hidden sm:inline">Email</span>
                  <span className="sm:hidden">Mail</span>
                </a>
              </div>
            </div>
          </SwiperSlide>
        )) }
      </Swiper>

      {/* Custom Navigation Arrows */ }
      <button
        ref={ (node) => setPrevEl(node) }
        aria-label="Previous slide"
        style={ {
          position: 'absolute',
          bottom: '30px',
          right: '90px',
          zIndex: 10,
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(255,255,255,0.25)',
          borderRadius: '4px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          color: '#fff',
        } }
        onMouseEnter={ (e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
        } }
        onMouseLeave={ (e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
        } }
      >
        <ChevronLeft size={ 22 } />
      </button>
      <button
        ref={ (node) => setNextEl(node) }
        aria-label="Next slide"
        style={ {
          position: 'absolute',
          bottom: '30px',
          right: '30px',
          zIndex: 10,
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(255,255,255,0.25)',
          borderRadius: '4px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          color: '#fff',
        } }
        onMouseEnter={ (e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
        } }
        onMouseLeave={ (e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
        } }
      >
        <ChevronRight size={ 22 } />
      </button>

      {/* Left Social Bar */ }
      <div className="absolute left-5 bottom-8 z-10 flex gap-4">
        <a href={ siteData.contactInfo.facebook } className="w-10 h-10 rounded-full bg-brand-green/20 text-brand-gold flex items-center justify-center hover:bg-brand-gold hover:text-brand-ink transition-colors group border border-brand-green/30 backdrop-blur-sm shadow-lg" target="_blank" rel="noreferrer">
          <svg className="group-hover:text-brand-ink" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
        </a>
        <a href={ siteData.contactInfo.instagram } className="w-10 h-10 rounded-full bg-brand-green/20 text-brand-gold flex items-center justify-center hover:bg-brand-gold hover:text-brand-ink transition-colors group border border-brand-green/30 backdrop-blur-sm shadow-lg" target="_blank" rel="noreferrer">
          <svg className="group-hover:text-brand-ink" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
        </a>
      </div>
    </div>
  );
};

export default Slider1;
