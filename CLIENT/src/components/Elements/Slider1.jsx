import React, { useRef, useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';
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
const slide1 = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80"; // TEMP LIVE PREVIEW
// import slide2 from '../../images/main-slider/slider1/slide2.jpg'; // ORIGINAL DUMMY - restore when real property photos are ready
const slide2 = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80"; // TEMP LIVE PREVIEW
// import slide3 from '../../images/main-slider/slider1/slide3.jpg'; // ORIGINAL DUMMY - restore when real property photos are ready
const slide3 = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80"; // TEMP LIVE PREVIEW

gsap.registerPlugin(useGSAP);

const slides = [
  {
    image: slide3,
    tagline: siteData.companyName,
    title: siteData.taglines[0],
    description: 'Invest with confidence. We offer legally verified properties with guaranteed high returns.',
  },
  {
    image: slide1,
    tagline: siteData.companyName,
    title: siteData.taglines[1],
    description: 'Invest with confidence. We offer legally verified properties with guaranteed high returns.',
  },
  {
    image: slide2,
    tagline: siteData.companyName,
    title: siteData.taglines[2],
    description: 'Invest with confidence. We offer legally verified properties with guaranteed high returns.',
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
        clipPath: 'inset(0 100% 0 0)',
      },
      {
        y: 0,
        opacity: 1,
        clipPath: 'inset(0 0% 0 0)',
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
    <div ref={containerRef} className="hero-slider-container" style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      <Swiper
        modules={[EffectFade, Autoplay, Navigation]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={800}
        loop={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        navigation={{
          prevEl,
          nextEl,
        }}
        onSlideChangeTransitionStart={animateSlide}
        onAfterInit={animateSlide}
        style={{ width: '100%', height: '100%' }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            {/* Background Image */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
              }}
            />
            {/* Dark Overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.4) 100%)',
                zIndex: 1,
              }}
            />
            {/* Content */}
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                height: '100%',
                padding: '0 5%',
                maxWidth: '900px',
              }}
            >
              {/* Company Name / Tagline */}
              <p
                data-animate
                style={{
                  fontSize: 'clamp(12px, 2vw, 20px)',
                  fontWeight: 500,
                  letterSpacing: '6px',
                  color: 'rgba(255,255,255,0.85)',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                {slide.tagline}
              </p>
              {/* Main Title */}
              <h1
                data-animate
                style={{
                  fontSize: 'clamp(28px, 5vw, 64px)',
                  fontWeight: 800,
                  lineHeight: 1.15,
                  color: '#ffffff',
                  marginBottom: '20px',
                  fontFamily: 'var(--font-serif)',
                }}
              >
                {slide.title}
              </h1>
              {/* Description */}
              <p
                data-animate
                style={{
                  fontSize: 'clamp(14px, 1.5vw, 18px)',
                  lineHeight: 1.7,
                  color: 'rgba(255,255,255,0.85)',
                  marginBottom: '32px',
                  maxWidth: '700px',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                {slide.description}
              </p>
              {/* CTA Buttons */}
              <div data-animate style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <a
                  href={`tel:${siteData.contactInfo.phone}`}
                  className="site-button"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 24px',
                    fontSize: '14px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <PhoneCall size={18} />
                  <span>Call Us</span>
                </a>
                <a
                  href={`https://wa.me/91${siteData.contactInfo.phone.replace(/\D/g, '').replace(/^0/, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="site-button"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 24px',
                    fontSize: '14px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    transition: 'all 0.3s ease',
                    backgroundColor: '#25D366', // WhatsApp color
                    borderColor: '#25D366',
                    color: '#fff',
                  }}
                >
                  <MessageCircle size={18} />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={`mailto:${siteData.contactInfo.email}`}
                  className="site-button"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 24px',
                    fontSize: '14px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Mail size={18} />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Arrows */}
      <button
        ref={(node) => setPrevEl(node)}
        aria-label="Previous slide"
        style={{
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
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
        }}
      >
        <ChevronLeft size={22} />
      </button>
      <button
        ref={(node) => setNextEl(node)}
        aria-label="Next slide"
        style={{
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
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
        }}
      >
        <ChevronRight size={22} />
      </button>

      {/* Left Social Bar */}
      <div
        style={{
          position: 'absolute',
          left: '20px',
          bottom: '30px',
          zIndex: 10,
          display: 'flex',
          gap: '20px',
        }}
      >
        {['LinkedIn', 'Twitter', 'Facebook'].map((name) => (
          <a
            key={name}
            href={`https://www.${name.toLowerCase()}.com`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '13px',
              fontWeight: 500,
              textDecoration: 'none',
              letterSpacing: '1px',
              transition: 'color 0.3s ease',
              fontFamily: 'var(--font-sans)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
          >
            {name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Slider1;
