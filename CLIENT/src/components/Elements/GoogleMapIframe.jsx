import React from 'react';

const GoogleMapIframe = () => {
    return (
        <div className="container mx-auto px-4 my-12 relative group">
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
