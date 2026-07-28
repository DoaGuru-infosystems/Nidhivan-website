import React, { useState, useEffect } from "react";

const ScrolToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 900) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <button 
            onClick={scrollToTop} 
            className={`scroltop transition-opacity duration-1000 fixed bottom-5 right-5 z-50 ${isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            aria-label="Scroll to top"
        >
            <span className="fa fa-angle-up relative" id="btn-vibrate" />
        </button>
    );
};

export default ScrolToTop;
