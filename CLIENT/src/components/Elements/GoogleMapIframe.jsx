import React from 'react';

const GoogleMapIframe = () => {
    var bgimg1 = new URL('../../images/background/cross-line2.png', import.meta.url).href;
    return (
        <div className="container mx-auto px-4 my-12 relative group">
            {/* TITLE START */}
            <div className="mb-10 text-center flex flex-col items-center">
                <div className="sx-separator-outer separator-center mb-4">
                    <div className="sx-separator bg-white bg-moving bg-repeat-x" style={{ backgroundImage: 'url(' + bgimg1 + ')' }}>
                        <h3 className="sep-line-one">Our Location</h3>
                    </div>
                </div>
                <p className="text-gray-600">Find us easily with the map below and visit our property for a closer look.</p>
            </div>
            {/* TITLE END */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                {/* Map container with scale effect on hover */}
                <div className="w-full transition-transform duration-700 ease-in-out group-hover:scale-105">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d140421.5403602272!2d79.9863052!3d23.2009608!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3981a93beb4f2109%3A0x25a49f129e64eb29!2sNidhivan%20Farms!5e1!3m2!1sen!2sin!4v1785240302415!5m2!1sen!2sin" 
                        width="100%" 
                        height="450" 
                        style={{ border: 0, display: 'block' }} 
                        allowFullScreen="" 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Nidhivan Farms Location"
                    ></iframe>
                </div>
                
                {/* Red Theme Accent border at the top of the map */}
                <div className="absolute top-0 left-0 w-full h-1 bg-[#fb5455] z-10"></div>
            </div>
        </div>
    );
};

export default GoogleMapIframe;
