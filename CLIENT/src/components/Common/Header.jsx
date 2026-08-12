import React, { useState, useEffect, useCallback } from 'react';
import Navigation from '../Common/Navigation';
import { NavLink, useLocation } from 'react-router-dom';
import { siteData } from '../../data/siteContent';
import { Menu, X, Phone, Mail, MapPin, Loader2, User, MessageSquare } from 'lucide-react';
import { submitContactForm } from '../../lib/api';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

const formSchema = z.object({
  username: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

const Header = () => {
  const [isQuoteActive, setIsQuoteActive] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "", email: "", phone: "", message: "" }
  });

  const onSubmit = async (data) => {
    try {
      const formData = {
        name: data.username,
        email: data.email,
        mobile_no: data.phone || "Not Provided",
        subject: "Header Contact Inquiry",
        message: data.message
      };
      const response = await submitContactForm(formData);
      if (response && response.success) {
        setIsSuccess(true);
        reset();
      } else {
        alert("Failed to submit inquiry. Please try again later.");
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("An error occurred while submitting. Please try again.");
    }
  };

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsQuoteActive(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  return (
    <>
      <style>{ `
        .fortvode-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 999;
         transition: all 0.3s ease;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  backface-visibility: hidden;
  will-change: transform;
        }
        .fortvode-header.solid-header {
          background-color: #ffffff;
          box-shadow: 0 2px 10px rgba(0,0,0,0.06);
        }

        .custom-nav-container {
  display: flex !important;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 130px;
  padding: 12px 40px;
  max-width: 1600px;
  margin: 0 auto;
}

        .logo-section {
          position: relative;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          text-align: left;
          min-width: 0;
          background-color: rgb(255, 255, 255);
          padding: 10px 15px;
          border-radius: 40px;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .solid-header .logo-section {
          background-color: transparent;
          box-shadow: none;
          /* Keep the same padding so content doesn't shift when background disappears */
          padding: 10px 15px;
        }

        .logo-img {
          height: 135px;
          width: auto;
          flex-shrink: 0;
        }

        .logo-tagline {
          font-family: var(--font-serif);
          font-style: italic;
          font-weight: bold;
          color: #b45b1c;
          letter-spacing: 0.5px;
          font-size: 16px;
          margin-left: 14px;
          line-height: 1.4;
          white-space: nowrap;
        }

        .menu-pill {
          background-color: rgba(255, 255, 255, 0.97);
          border-radius: 6px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.06);
          padding: 0 24px;
          display: flex;
          align-items: center;
          height: 56px;
        }
        .solid-header .menu-pill {
          background-color: transparent;
          box-shadow: none;
          padding: 0;
        }

        .site-header .nav.navbar-nav {
          display: flex;
          align-items: center;
          margin: 0;
          padding: 0;
        }

        .site-header .nav.navbar-nav > li > a {
          color: #111111 !important;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 600;
          font-size: 14px;
          padding: 14px 20px !important;
          background: transparent !important;
          transition: color 0.3s ease;
        }

        .site-header .nav.navbar-nav > li > a:hover,
        .site-header .nav.navbar-nav > li > a.active {
          color: #70482B !important;
        }

        .book-consultation-btn {
          background-color: transparent;
          color: #D9A44A;
          border: 1px solid #D9A44A;
          text-transform: uppercase;
          font-weight: 600;
          letter-spacing: 1px;
          padding: 10px 22px;
          font-size: 13px;
          border-radius: 4px;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          white-space: nowrap;
        }
        .book-consultation-btn:hover {
          background-color: #D9A44A;
          color: #ffffff;
        }

        .mobile-menu-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 44px;
          min-height: 44px;
          flex-shrink: 0;
        }

        /* ===== Mobile breakpoint ===== */
        @media (max-width: 991px) {
          .custom-nav-container {
            min-height: 70px;
            padding: 10px 16px;
          }
          .logo-img {
            height: 60px;
          }
          .logo-tagline {
            display: none;
          }
          .logo-section {
            padding: 6px 10px;
            border-radius: 30px;
          }
          .desktop-nav { display: none !important; }
          .book-consultation-wrapper { display: none !important; }
        }

        /* For very small screens */
        @media (max-width: 374px) {
          .custom-nav-container {
            padding: 8px 12px;
            min-height: 60px;
          }
          .logo-img {
            height: 52px;
          }
          .logo-section {
            padding: 5px 8px;
            border-radius: 20px;
          }
        }

        /* show tagline again once there's a bit more room */
        @media (min-width: 420px) and (max-width: 991px) {
          .logo-tagline {
            display: block;
            font-size: 12px;
            margin-left: 8px;
            white-space: normal;
            max-width: 140px;
            line-height: 1.3;
          }
        }

        @media (min-width: 992px) {
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>

      <header className={ `site-header mobile-sider-drawer-menu fortvode-header ${isScrolled ? 'solid-header' : ''}` }>
        <div className="container-fluid p-0">
          <div className="custom-nav-container mt-2 lg:mt-4">

            {/* Logo + Tagline */ }
            <div className="logo-section">
              <NavLink to="/" className="inline-block flex-shrink-0">
                <img src="/images/nidhivan logo.png" alt={ siteData.companyName } className="logo-img" />
              </NavLink>

            </div>

            {/* Mobile Menu Button */ }
            <button
              type="button"
              className="mobile-menu-btn ml-auto p-2"
              onClick={ () => setIsMobileMenuOpen(!isMobileMenuOpen) }
              aria-label="Toggle navigation"
              style={ { color: isScrolled || isMobileMenuOpen ? '#000000' : '#ffffff' } }
            >
              { isMobileMenuOpen ? <X size={ 24 } /> : <Menu size={ 24 } /> }
            </button>

            {/* Desktop Nav */ }
            <div className="desktop-nav header-nav flex-grow flex justify-center">
              <div className="menu-pill">
                <Navigation onLinkClick={ closeMobileMenu } />
              </div>
            </div>

            {/* Book Consultation (Desktop) */ }
            <div className="book-consultation-wrapper ml-auto">
              <button
                className="book-consultation-btn"
                onClick={ (e) => { e.preventDefault(); setIsQuoteActive(!isQuoteActive); } }
              >
                BOOK A CONSULTATION
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* MOBILE DRAWER OVERLAY */ }
      { isMobileMenuOpen && (
        <div
          style={ { position: 'fixed', inset: 0, zIndex: 9998, background: 'rgba(0,0,0,0.5)' } }
          onClick={ closeMobileMenu }
        />
      ) }

      {/* MOBILE DRAWER */ }
      <div
        style={ {
          position: 'fixed',
          top: 0,
          right: isMobileMenuOpen ? 0 : 'min(-300px, -85vw)',
          width: 'min(300px, 85vw)',
          height: '100vh',
          background: '#fff',
          zIndex: 9999,
          transition: 'right 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          overflowY: 'auto',
          overflowX: 'hidden',
          boxShadow: isMobileMenuOpen ? '-4px 0 20px rgba(0,0,0,0.15)' : 'none',
          padding: '16px',
        } }
      >
        <div style={ { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' } }>
          <img src="/images/nidhivan logo.png" alt={ siteData.companyName } style={ { height: '40px', width: 'auto' } } />
          <button
            onClick={ closeMobileMenu }
            style={ { background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#000' } }
            aria-label="Close menu"
          >
            <X size={ 24 } />
          </button>
        </div>
        <div className="nav-dark">
          <Navigation onLinkClick={ closeMobileMenu } />
        </div>
        <div className="mt-8 pt-6 border-t border-gray-100">
          <button
            className="book-consultation-btn w-full"
            style={ { backgroundColor: '#D9A44A', color: '#fff', height: '46px' } }
            onClick={ (e) => { e.preventDefault(); setIsMobileMenuOpen(false); setIsQuoteActive(true); } }
          >
            BOOK A CONSULTATION
          </button>
        </div>
      </div>

      {/* CONTACT SLIDE PANEL */ }
      <div
        className="contact-slide-hide"
        style={ {
          backgroundImage: `url("/images/background/bg-map.png")`,
          right: isQuoteActive ? '0px' : '100%',
          transition: 'right 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 9999,
          position: 'fixed',
          top: 0,
          width: '100%',
          height: '100vh',
          background: '#fcfcfc',
          overflowX: 'hidden',
        } }
      >
        <div className="contact-nav h-full overflow-y-auto pt-16 sm:pt-20 pb-10 sm:pb-12 flex flex-col justify-center">
          <NavLink
            to="#"
            className="contact_close absolute top-4 right-5 sm:top-6 sm:right-8 text-[#2B2B2B] hover:text-red-600 transition-colors z-50"
            onClick={ (e) => { e.preventDefault(); setIsQuoteActive(false); } }
          >
            <span style={ { fontSize: '36px', lineHeight: '1' } } className="sm:text-[48px]">&times;</span>
          </NavLink>

          <div className="container max-w-[1000px] mx-auto px-4 mt-6 sm:mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-stretch">

              {/* Left: Contact Info */ }
              <div className="border-[4px] sm:border-[8px] border-[#C49242] bg-white p-5 sm:p-10 flex flex-col justify-center min-h-0 md:min-h-[450px]">
                <div className="space-y-6 sm:space-y-8">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-3 mb-2">
                      <Phone size={ 16 } className="text-[#333] flex-shrink-0" />
                      <h6 className="m-0 font-bold uppercase tracking-wider text-[#C49242] text-[12px] sm:text-[13px]">Phone number</h6>
                    </div>
                    <div className="ml-7 sm:ml-8 flex flex-col gap-1">
                      {siteData.contactInfo.phone.split(',').map((num, idx) => (
                        <a key={idx} href={`tel:${num.trim()}`} className="text-gray-600 text-sm hover:text-[#C49242] transition-colors">{num.trim()}</a>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center gap-3 mb-2">
                      <Mail size={ 16 } className="text-[#333] flex-shrink-0" />
                      <h6 className="m-0 font-bold uppercase tracking-wider text-[#C49242] text-[12px] sm:text-[13px]">Email address</h6>
                    </div>
                    <p className="text-gray-600 ml-7 sm:ml-8 text-sm break-all">{ siteData.contactInfo.email }</p>
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center gap-3 mb-2">
                      <MapPin size={ 16 } className="text-[#333] flex-shrink-0" />
                      <h6 className="m-0 font-bold uppercase tracking-wider text-[#C49242] text-[12px] sm:text-[13px]">Address info</h6>
                    </div>
                    <p className="text-gray-600 ml-7 sm:ml-8 text-sm leading-relaxed">{ siteData.contactInfo.address }</p>
                  </div>
                </div>

                <div className="mt-8 sm:mt-12 ml-7 sm:ml-8">
                  <ul className="flex gap-3">
                    <li>
                      <a href={ siteData.contactInfo.facebook } target="_blank" rel="noopener noreferrer"
                        className="w-9 h-9 border border-[#333] flex items-center justify-center font-bold hover:bg-[#C49242] hover:text-white hover:border-[#C49242] transition-colors rounded-full text-[#333] text-sm">
                        f
                      </a>
                    </li>
                    <li>
                      <a href={ siteData.contactInfo.instagram } target="_blank" rel="noopener noreferrer"
                        className="w-9 h-9 border border-[#333] flex items-center justify-center font-bold hover:bg-[#C49242] hover:text-white hover:border-[#C49242] transition-colors rounded-full text-[#333] text-sm">
                        I
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right: Form */ }
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-5 sm:p-10 border border-gray-100 relative min-h-0 md:min-h-[450px]">
                <div className="relative z-10">
                  <div className="mb-5 sm:mb-6">
                    <h3 className="text-xl sm:text-3xl font-bold text-[#333] mb-2" style={ { fontFamily: 'var(--font-serif)' } }>
                      Send us a Message
                    </h3>
                    <p className="text-gray-500 text-sm">We'll get back to you as soon as possible.</p>
                  </div>

                  {isSuccess ? (
                    <div className="flex flex-col items-center justify-center text-center py-8 min-h-[300px]">
                      <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
                      <p className="text-gray-500 mb-6 text-sm">Your message has been sent successfully. We will get back to you shortly.</p>
                      <button 
                        onClick={() => setIsSuccess(false)}
                        className="bg-[#DBA74D] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-[#C49242] transition-colors text-sm"
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                  <form onSubmit={ handleSubmit(onSubmit) } className="flex flex-col gap-4">
                    <div className="relative group">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#C49242] transition-colors">
                        <User size={ 16 } />
                      </div>
                      <Input
                        { ...register("username") }
                        id="name"
                        type="text"
                        placeholder="Your Name"
                        maxLength="50"
                        onInput={ (e) => { e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, ''); } }
                        className="w-full bg-white border border-gray-200 rounded-full pl-12 pr-6 py-3 h-12 focus-visible:ring-1 focus-visible:ring-[#C49242] focus-visible:border-[#C49242] placeholder-gray-400 outline-none text-sm transition-all"
                      />
                      { errors.username && <p className="text-red-500 text-xs mt-1 ml-4 font-medium">{ errors.username.message }</p> }
                    </div>

                    <div className="relative group">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#C49242] transition-colors">
                        <Mail size={ 16 } />
                      </div>
                      <Input
                        { ...register("email") }
                        id="email"
                        type="email"
                        placeholder="Email Address"
                        maxLength="100"
                        className="w-full bg-white border border-gray-200 rounded-full pl-12 pr-6 py-3 h-12 focus-visible:ring-1 focus-visible:ring-[#C49242] focus-visible:border-[#C49242] placeholder-gray-400 outline-none text-sm transition-all"
                      />
                      { errors.email && <p className="text-red-500 text-xs mt-1 ml-4 font-medium">{ errors.email.message }</p> }
                    </div>

                    <div className="relative group">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#C49242] transition-colors">
                        <Phone size={ 16 } />
                      </div>
                      <Input
                        { ...register("phone") }
                        id="phone"
                        type="text"
                        placeholder="Phone Number"
                        maxLength="10"
                        onInput={ (e) => { e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10); } }
                        className="w-full bg-white border border-gray-200 rounded-full pl-12 pr-6 py-3 h-12 focus-visible:ring-1 focus-visible:ring-[#C49242] focus-visible:border-[#C49242] placeholder-gray-400 outline-none text-sm transition-all"
                      />
                      { errors.phone && <p className="text-red-500 text-xs mt-1 ml-4 font-medium">{ errors.phone.message }</p> }
                    </div>

                    <div className="relative group">
                      <div className="absolute left-5 top-[16px] text-gray-400 group-focus-within:text-[#C49242] transition-colors">
                        <MessageSquare size={ 16 } />
                      </div>
                      <Textarea
                        { ...register("message") }
                        id="message"
                        placeholder="How can we help you?"
                        rows={ 4 }
                        className="w-full bg-white border border-gray-200 rounded-2xl pl-12 pr-6 py-3.5 focus-visible:ring-1 focus-visible:ring-[#C49242] focus-visible:border-[#C49242] placeholder-gray-400 outline-none resize-none min-h-[100px] sm:min-h-[110px] text-sm transition-all"
                      />
                      { errors.message && <p className="text-red-500 text-xs mt-1 ml-4 font-medium">{ errors.message.message }</p> }
                    </div>

                    <div className="text-left pt-2">
                      <button
                        type="submit"
                        disabled={ isSubmitting }
                        className="w-full bg-[#DBA74D] hover:bg-[#C49242] text-white py-3.5 rounded-xl font-bold tracking-wide transition-all flex justify-center items-center gap-2 min-h-[48px]"
                      >
                        { isSubmitting ? (
                          <>
                            <Loader2 size={ 18 } className="animate-spin" />
                            <span className="uppercase text-[13px]">SUBMITTING...</span>
                          </>
                        ) : (
                          <span className="uppercase text-[13px]">SUBMIT INQUIRY</span>
                        ) }
                      </button>
                    </div>
                  </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;