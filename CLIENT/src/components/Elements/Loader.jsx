import React, { useState, useEffect } from "react";

const Loader = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Wait for page load or simply timeout
        const handleLoad = () => {
            // Slight delay to allow for smooth transition
            setTimeout(() => setIsLoading(false), 500);
        };

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
            // Fallback timeout in case load event never fires or takes too long
            const timeoutId = setTimeout(handleLoad, 3000);
            return () => {
                window.removeEventListener("load", handleLoad);
                clearTimeout(timeoutId);
            };
        }
    }, []);

    if (!isLoading) return null;

    return (
        <div className="loading-area fixed inset-0 z-[99999] bg-white transition-opacity duration-1000">
            <div className="loading-box" />
            <div className="loading-pic" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <i className="flaticon-home" style={{ fontSize: '80px', color: '#fff', animation: 'pulse 1.5s infinite' }} />
            </div>
        </div>
    );
};

export default Loader;
