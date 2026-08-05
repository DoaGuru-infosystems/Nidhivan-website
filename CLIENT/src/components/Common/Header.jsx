import React, { useState, useEffect, useCallback } from 'react';
import Navigation from '../Common/Navigation';
import { NavLink, useLocation } from 'react-router-dom';
import { siteData } from '../../data/siteContent';
import { Menu, X, Phone, Mail, MapPin, Loader2, Search, User, MessageSquare } from 'lucide-react';
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
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isQuoteActive, setIsQuoteActive] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
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
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      message: ""
    }
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
        alert("Thank you for getting in touch! We will contact you soon.");
        reset();
        setIsQuoteActive(false);
      } else {
        alert("Failed to submit inquiry. Please try again later.");
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("An error occurred while submitting. Please try again.");
    }
  };

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsSearchActive(false);
        setIsQuoteActive(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  return (
    <>
      <style>{ `
        /* Minimal Luxury Navbar CSS */
        .fortvode-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 999;
          transition: all 0.3s ease;
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
          height: 90px;
          max-width: 1500px;
          margin: 0 auto;
          padding: 0 40px;
        }
        
        /* Logo Section */
        .logo-section {
          position: relative;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          text-align: left;
        }

        /* Menu Pill */
        .menu-pill {
          background-color: rgba(255, 255, 255, 0.97);
          border-radius: 6px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.06);
          padding: 0 24px;
          display: flex;
          align-items: center;
          height: 44px;
        }
        /* Remove pill styling for solid header */
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
          font-size: 12px;
          padding: 10px 16px !important;
          background: transparent !important;
          transition: color 0.3s ease;
        }

        .site-header .nav.navbar-nav > li > a:hover,
        .site-header .nav.navbar-nav > li > a.active {
          color: #70482B !important;
        }

        /* Outline Button */
        .book-consultation-btn {
          background-color: transparent;
          color: #D9A44A;
          border: 1px solid #D9A44A;
          text-transform: uppercase;
          font-weight: 600;
          letter-spacing: 1px;
          padding: 8px 18px;
          font-size: 11px;
          border-radius: 4px;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .book-consultation-btn:hover {
          background-color: #D9A44A;
          color: #ffffff;
        }

        /* Mobile adjustments */
        @media (max-width: 991px) {
          .custom-nav-container {
            height: 60px;
          }
          .desktop-nav { display: none !important; }
          .book-consultation-wrapper { display: none !important; }
          .logo-section::after { display: none; }
        }
        @media (min-width: 992px) {
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>

      <header
        className={ `site-header mobile-sider-drawer-menu fortvode-header ${isScrolled ? 'solid-header' : ''}` }
      >
        <div className="container-fluid p-0">
          <div className="custom-nav-container mt-2 lg:mt-4">

            {/* Extreme Left: Logo + Tagline */ }
            <div className="logo-section">
              <NavLink to="/" className="inline-block flex-shrink-0">
                <img src="/images/nidhivan logo.png" alt={ siteData.companyName } style={ { maxHeight: '52px', width: 'auto' } } />
              </NavLink>
              <span className="text-[12px] ml-3 leading-snug" style={ { fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 'bold', color: '#b45b1c', letterSpacing: '0.5px' } }>
                <span className="text-[#0dc76a]">
                  Shree Radha Krishna
                </span>  <br /> ki nagri mei apka apna farms
              </span>
            </div>

            {/* Mobile Menu Button */ }
            <button
              type="button"
              className="mobile-menu-btn ml-auto p-2"
              onClick={ () => setIsMobileMenuOpen(!isMobileMenuOpen) }
              aria-label="Toggle navigation"
              style={ { color: !isScrolled ? '#ffffff' : '#000000' } }
            >
              <Menu size={ 26 } />
            </button>

            {/* Center-Right: Menu Pill (Desktop) */ }
            <div className="desktop-nav header-nav flex-grow flex justify-center">
              <div className="menu-pill">
                <Navigation onLinkClick={ closeMobileMenu } />
              </div>
            </div>

            {/* Extreme Right: Book a Consultation Button (Desktop) */ }
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

      {/* MOBILE NAVIGATION — Drawer Overlay */ }
      { isMobileMenuOpen && (
        <div
          style={ {
            position: 'fixed',
            inset: 0,
            zIndex: 9998,
            background: 'rgba(0,0,0,0.5)',
          } }
          onClick={ closeMobileMenu }
        />
      ) }
      <div
        style={ {
          position: 'fixed',
          top: 0,
          right: isMobileMenuOpen ? 0 : '-320px',
          width: '300px',
          height: '100vh',
          background: '#fff',
          zIndex: 9999,
          transition: 'right 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          overflowY: 'auto',
          boxShadow: isMobileMenuOpen ? '-4px 0 20px rgba(0,0,0,0.15)' : 'none',
          padding: '20px',
        } }
      >
        <div style={ { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' } }>
          <img src="/images/nidhivan logo.png" alt={ siteData.companyName } style={ { height: '32px' } } />
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
            style={ { backgroundColor: '#D9A44A', color: '#fff' } }
            onClick={ (e) => { e.preventDefault(); setIsMobileMenuOpen(false); setIsQuoteActive(true); } }
          >
            BOOK A CONSULTATION
          </button>
        </div>
      </div>

      {/* CONTACT SLIDE PANEL */}
      <div
        className="contact-slide-hide"
        style={{
          backgroundImage: `url("/images/background/bg-map.png")`,
          right: isQuoteActive ? '0px' : '100%',
          transition: 'right 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 9999,
          position: 'fixed',
          top: 0,
          width: '100vw',
          height: '100vh',
          background: '#fcfcfc',
        }}
      >
        <div className="contact-nav h-full overflow-y-auto pt-20 pb-12 flex flex-col justify-center">
          <NavLink to="#" className="contact_close absolute top-6 right-8 text-[#2B2B2B] hover:text-red-600 transition-colors z-50" onClick={(e) => { e.preventDefault(); setIsQuoteActive(false); }}>
            <span style={{ fontSize: '48px', lineHeight: '1' }}>&times;</span>
          </NavLink>
          <div className="container max-w-[1000px] mx-auto px-4 mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch">
              
              {/* Left Side: Contact Info */}
              <div className="border-[8px] border-[#C49242] bg-white p-10 flex flex-col justify-center min-h-[450px]">
                <div className="space-y-8">
                  {/* Phone */}
                  <div className="flex flex-col">
                    <div className="flex items-center gap-3 mb-2">
                      <Phone size={18} className="text-[#333]" />
                      <h6 className="m-0 font-bold uppercase tracking-wider text-[#C49242] text-[13px]">Phone number</h6>
                    </div>
                    <p className="text-gray-600 ml-8 text-sm">{siteData.contactInfo.phone}</p>
                  </div>
                  {/* Email */}
                  <div className="flex flex-col">
                    <div className="flex items-center gap-3 mb-2">
                      <Mail size={18} className="text-[#333]" />
                      <h6 className="m-0 font-bold uppercase tracking-wider text-[#C49242] text-[13px]">Email address</h6>
                    </div>
                    <p className="text-gray-600 ml-8 text-sm">{siteData.contactInfo.email}</p>
                  </div>
                  {/* Address */}
                  <div className="flex flex-col">
                    <div className="flex items-center gap-3 mb-2">
                      <MapPin size={18} className="text-[#333]" />
                      <h6 className="m-0 font-bold uppercase tracking-wider text-[#C49242] text-[13px]">Address info</h6>
                    </div>
                    <p className="text-gray-600 ml-8 text-sm leading-relaxed max-w-[280px]">{siteData.contactInfo.address}</p>
                  </div>
                </div>

                {/* Socials */}
                <div className="mt-12 ml-8">
                  <ul className="flex gap-3">
                    <li><a href={siteData.contactInfo.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 border border-[#333] flex items-center justify-center font-bold hover:bg-[#C49242] hover:text-white hover:border-[#C49242] transition-colors rounded-full text-[#333] text-sm">f</a></li>
                    <li><a href={siteData.contactInfo.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 border border-[#333] flex items-center justify-center font-bold hover:bg-[#C49242] hover:text-white hover:border-[#C49242] transition-colors rounded-full text-[#333] text-sm">ig</a></li>
                    <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 border border-[#333] flex items-center justify-center font-bold hover:bg-[#C49242] hover:text-white hover:border-[#C49242] transition-colors rounded-full text-[#333] text-sm">t</a></li>
                    <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 border border-[#333] flex items-center justify-center font-bold hover:bg-[#C49242] hover:text-white hover:border-[#C49242] transition-colors rounded-full text-[#333] text-sm">yt</a></li>
                  </ul>
                </div>
              </div>

              {/* Right Side: Form */}
              <div className="bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-10 border border-gray-100 relative min-h-[450px]">
                <div className="relative z-10">
                  <div className="mb-6">
                    <h3 className="text-3xl font-bold text-[#333] mb-2" style={{ fontFamily: 'var(--font-serif)' }}>Send us a Message</h3>
                    <p className="text-gray-500 text-sm">We'll get back to you as soon as possible.</p>
                  </div>
                  
                  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <div className="relative group">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#C49242] transition-colors">
                        <User size={16} />
                      </div>
                      <Input
                        {...register("username")}
                        id="name"
                        type="text"
                        placeholder="Your Name"
                        maxLength="50"
                        onInput={(e) => { e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, ''); }}
                        className="w-full bg-white border border-gray-200 rounded-full pl-12 pr-6 py-3 h-11 focus-visible:ring-1 focus-visible:ring-[#C49242] focus-visible:border-[#C49242] placeholder-gray-400 outline-none text-sm transition-all"
                      />
                      {errors.username && <p className="text-red-500 text-xs mt-1 ml-4 font-medium">{errors.username.message}</p>}
                    </div>

                    <div className="relative group">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#C49242] transition-colors">
                        <Mail size={16} />
                      </div>
                      <Input
                        {...register("email")}
                        id="email"
                        type="email"
                        placeholder="Email Address"
                        maxLength="100"
                        className="w-full bg-white border border-gray-200 rounded-full pl-12 pr-6 py-3 h-11 focus-visible:ring-1 focus-visible:ring-[#C49242] focus-visible:border-[#C49242] placeholder-gray-400 outline-none text-sm transition-all"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1 ml-4 font-medium">{errors.email.message}</p>}
                    </div>

                    <div className="relative group">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#C49242] transition-colors">
                        <Phone size={16} />
                      </div>
                      <Input
                        {...register("phone")}
                        id="phone"
                        type="text"
                        placeholder="Phone Number"
                        maxLength="10"
                        onInput={(e) => { e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10); }}
                        className="w-full bg-white border border-gray-200 rounded-full pl-12 pr-6 py-3 h-11 focus-visible:ring-1 focus-visible:ring-[#C49242] focus-visible:border-[#C49242] placeholder-gray-400 outline-none text-sm transition-all"
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1 ml-4 font-medium">{errors.phone.message}</p>}
                    </div>

                    <div className="relative group">
                      <div className="absolute left-5 top-[16px] text-gray-400 group-focus-within:text-[#C49242] transition-colors">
                        <MessageSquare size={16} />
                      </div>
                      <Textarea
                        {...register("message")}
                        id="message"
                        placeholder="How can we help you?"
                        rows={4}
                        className="w-full bg-white border border-gray-200 rounded-2xl pl-12 pr-6 py-3.5 focus-visible:ring-1 focus-visible:ring-[#C49242] focus-visible:border-[#C49242] placeholder-gray-400 outline-none resize-none min-h-[110px] text-sm transition-all"
                      />
                      {errors.message && <p className="text-red-500 text-xs mt-1 ml-4 font-medium">{errors.message.message}</p>}
                    </div>

                    <div className="text-left pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#DBA74D] hover:bg-[#C49242] text-white py-3.5 rounded-xl font-bold tracking-wide transition-all flex justify-center items-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            <span className="uppercase text-[13px]">SUBMITTING...</span>
                          </>
                        ) : (
                          <span className="uppercase text-[13px]">SUBMIT INQUIRY</span>
                        )}
                      </button>
                    </div>
                  </form>
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