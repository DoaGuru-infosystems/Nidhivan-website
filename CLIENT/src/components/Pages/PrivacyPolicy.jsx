import React from 'react';
import Banner from './../Elements/Banner';

// var bnrimg = new URL('./../../images/banner/bg-1.jpg', import.meta.url).href; // ORIGINAL DUMMY - restore when real property photos are ready

var bnrimg = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80"; // TEMP LIVE PREVIEW

class PrivacyPolicy extends React.Component {
    render() {
        return (
            <>
                <div className="relative">
                    <Banner title="Privacy Policy" pagename="Privacy Policy" description="We value your privacy. Learn how we collect, use, and protect your data." bgimage={bnrimg}/>
                    
                    <div className="relative py-8 md:py-20">
                        <div className="max-w-7xl mx-auto px-4">
                            <div className="section-content">
                                <div>
                                        <h3>1. Information Collection</h3>
                                        <p>We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us.</p>
                                        
                                        <h3>2. Use of Information</h3>
                                        <p>We may use the information we collect about you to provide, maintain, and improve our services, including, for example, to facilitate payments, send receipts, provide products and services you request.</p>
                                        
                                        <h3>3. Sharing of Information</h3>
                                        <p>We do not share your personal information with third parties without your consent, except in the following circumstances or as described in this Privacy Policy: with vendors, consultants, and other service providers who need access to such information.</p>
                                        
                                        <h3>4. Security</h3>
                                        <p>We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };
};

export default PrivacyPolicy;
