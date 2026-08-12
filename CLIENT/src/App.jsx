import React from 'react';
import Components from './components/Components';
import ScrolToTop from './components/Elements/ScrolToTop';
import Loader from "./components/Elements/Loader";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const App = () => {

  useGSAP(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Sitewide GSAP Parallax Backgrounds (replacing stellar.js)
    const parallaxElements = document.querySelectorAll('.bg-parallax');
    parallaxElements.forEach((el) => {
      // Default to 0.5 if no ratio is provided
      const ratioStr = el.getAttribute('data-stellar-background-ratio');
      const ratio = ratioStr ? parseFloat(ratioStr) : 0.5;

      // Calculate how much the background should move
      // If ratio is 0.5, we move it half the element's height
      // The background usually needs background-attachment: fixed or a slightly larger size
      gsap.fromTo(el,
        { backgroundPosition: '50% 0px' },
        {
          backgroundPosition: `50% ${window.innerHeight * ratio}px`,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    });

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  });

  return (
    <div className="App">
      <Components />
      <ScrolToTop />
      <Loader />
    </div>
  );
}

export default App;