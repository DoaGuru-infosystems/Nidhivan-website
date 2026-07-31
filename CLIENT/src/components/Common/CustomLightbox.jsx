import React from 'react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/counter.css";

/**
 * CustomLightbox - A reusable, premium lightbox component wrapping yet-another-react-lightbox.
 * Supports Previous/Next, Keyboard Nav, Swipe, Click outside to close (built-in features of the library),
 * Fullscreen, Zoom, and Image Counter plugins.
 * 
 * @param {boolean} open - Whether the lightbox is open
 * @param {function} close - Function to call on close
 * @param {number} index - Initial slide index
 * @param {Array<{src: string, alt?: string, title?: string, description?: string}>} slides - Array of slide objects
 */
const CustomLightbox = ({ open, close, index, slides }) => {
    return (
        <Lightbox
            open={open}
            close={close}
            index={index}
            slides={slides}
            plugins={[Fullscreen, Counter, Zoom]}
            carousel={{
                finite: false, // infinite loop for prev/next
                preload: 2, // Preload next and previous images
            }}
            animation={{
                fade: 300, // Smooth fade animation
                swipe: 300
            }}
            controller={{
                closeOnBackdropClick: true, // Click outside to close
            }}
            counter={{
                container: { style: { top: 0, left: 0, padding: "16px" } }
            }}
        />
    );
};

export default CustomLightbox;
