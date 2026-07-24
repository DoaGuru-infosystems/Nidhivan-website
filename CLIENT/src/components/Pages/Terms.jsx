import React from 'react';
import Banner from './../Elements/Banner';

var bnrimg = new URL('./../../images/banner/bg-1.jpg', import.meta.url).href;

class Terms extends React.Component {
    render() {
        return (
            <>
                <div className="page-content">
                    <Banner title="Terms & Conditions" pagename="Terms & Conditions" description="Please read our terms and conditions carefully before using our services." bgimage={bnrimg}/>
                    
                    <div className="section-full p-tb80 inner-page-padding">
                        <div className="container">
                            <div className="section-content">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h3>1. Introduction</h3>
                                        <p>Welcome to our terms and conditions. These terms govern your use of our website and services. By accessing or using our services, you agree to be bound by these terms.</p>
                                        
                                        <h3>2. Intellectual Property</h3>
                                        <p>All content included on this site, such as text, graphics, logos, images, and software, is the property of our company and protected by international copyright laws.</p>
                                        
                                        <h3>3. User Responsibilities</h3>
                                        <p>You agree to use our website only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the website.</p>
                                        
                                        <h3>4. Changes to Terms</h3>
                                        <p>We reserve the right to modify these terms at any time. We will notify users of any changes by updating the terms on our website. Your continued use of the site implies acceptance of the updated terms.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };
};

export default Terms;
