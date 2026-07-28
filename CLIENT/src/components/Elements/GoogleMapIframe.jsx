import React from 'react';

const GoogleMapIframe = () => {
    return (
        <div className="w-full relative group">
            {/* Adding a subtle grayscale filter that clears on hover for a premium look that matches the theme */}
            <div className="w-full grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">
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
    );
};

export default GoogleMapIframe;
