import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { siteData } from '../../data/siteContent';

const FloatingButtons = () => {
    const whatsappNumber = siteData.contactInfo.whatsapp.replace(/\D/g, '');
    const phoneNumber = siteData.contactInfo.phone.split(',')[0].trim().replace(/\D/g, '');

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
            {/* WhatsApp Button */}
            <a 
                href={`https://wa.me/91${whatsappNumber}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                aria-label="Chat on WhatsApp"
            >
                <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-75"></div>
                <WhatsAppIcon style={{ fontSize: 28 }} className="relative z-10" />
                
                {/* Tooltip */}
                <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-black/80 text-white text-xs font-semibold rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                    Chat with us
                </span>
            </a>

            {/* Phone Button */}
            <a 
                href={`tel:+91${phoneNumber}`} 
                className="group relative flex items-center justify-center w-14 h-14 bg-brand-gold text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                aria-label="Call us"
            >
                <Phone size={26} className="relative z-10" />
                
                {/* Tooltip */}
                <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-black/80 text-white text-xs font-semibold rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                    Call us now
                </span>
            </a>
        </div>
    );
};

export default FloatingButtons;
