import React, { useState, useEffect, useRef, useCallback } from 'react';
import Navigation from '../Common/Navigation';
import { NavLink } from 'react-router-dom';
import { siteData } from '../../data/siteContent';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Search, X, Phone, Mail, MapPin, Menu, Loader2 } from 'lucide-react';
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

import logo from '../../images/nidhivan logo.png';
import bgMap from '../../images/background/bg-map.png';

gsap.registerPlugin(ScrollTrigger);

const Header = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isQuoteActive, setIsQuoteActive] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef(null);

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
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Header Form Data Submitted:", data);
    alert("Thank you for getting in touch! We will contact you soon.");
    reset();
    setIsQuoteActive(false);
  };

  // Sticky header with GSAP ScrollTrigger
  useGSAP(
    () => {
      const stickyHeader = headerRef.current?.querySelector('.sticky-header');
      if (!stickyHeader) return;

      ScrollTrigger.create({
        trigger: document.body,
        start: 'top -100px',
        onEnter: () => {
          stickyHeader.classList.add('is-fixed', 'color-fill');
        },
        onLeaveBack: () => {
          stickyHeader.classList.remove('is-fixed', 'color-fill');
        },
      });
    },
    { scope: headerRef }
  );

  // Close mobile menu on route change / link click
  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Close mobile menu on escape key
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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  return (
    <header ref={ headerRef } className="site-header header-style-1 nav-wide mobile-sider-drawer-menu">
      {/* Top Bar */ }
      <div className="top-bar bg-gray">
        <div className="container">
          <div className="flex justify-end">
            <ul className="list-unstyled e-p-bx">
              <li><span>Mail us:</span> <a href={`mailto:${siteData.contactInfo.email}`} style={{ color: 'inherit', textDecoration: 'none' }} className="hover:text-[#F4B54B]">{ siteData.contactInfo.email }</a></li>
              <li><span>Call us:</span> <a href={`tel:${siteData.contactInfo.phone}`} style={{ color: 'inherit', textDecoration: 'none' }} className="hover:text-[#F4B54B]">{ siteData.contactInfo.phone }</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */ }
      <div className="sticky-header main-bar-wraper navbar-expand-lg">
        <div className="main-bar header-left-gray-block bg-white">
          <div className="container clearfix">
            {/* Logo */ }
            <div className="logo-header">
              <div className="logo-header-inner logo-header-one">
                <NavLink to="/">
                  <img src={ logo } alt={ siteData.companyName } style={ { maxHeight: '70px', width: 'auto', marginLeft: '30px' } } />
                </NavLink>
              </div>
            </div>

            {/* Mobile Menu Toggle Button */ }
            <button
              id="mobile-side-drawer"
              type="button"
              className="navbar-toggler collapsed"
              onClick={ () => setIsMobileMenuOpen(!isMobileMenuOpen) }
              aria-label="Toggle navigation"
            >
              <Menu size={ 24 } />
            </button>

            {/* Extra Nav (Search + Get in touch) */ }
            <div className="extra-nav">

              <div className="extra-cell">
                <div className="contact-slide-show">
                  <NavLink
                    to="#"
                    className="get-in-touch-btn from-top"
                    onClick={ (e) => { e.preventDefault(); setIsQuoteActive(!isQuoteActive); } }
                  >
                    Get in touch
                  </NavLink>
                </div>
              </div>
            </div>

            {/* MAIN NAVIGATION — Desktop */ }
            <div className="header-nav nav-dark justify-content-start">
              <Navigation onLinkClick={ closeMobileMenu } />
            </div>

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
                <img src={ logo } alt={ siteData.companyName } style={ { height: '36px' } } />
                <button
                  onClick={ closeMobileMenu }
                  style={ { background: 'none', border: 'none', cursor: 'pointer', padding: '4px' } }
                  aria-label="Close menu"
                >
                  <X size={ 24 } />
                </button>
              </div>
              <Navigation onLinkClick={ closeMobileMenu } />
            </div>

            {/* CONTACT SLIDE PANEL */ }
            <div
              className="contact-slide-hide"
              style={ {
                backgroundImage: `url(${bgMap})`,
                right: isQuoteActive ? '0px' : '100%',
                transition: 'right 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                zIndex: 9999,
                position: 'fixed'
              } }
            >
              <div className="contact-nav h-full overflow-y-auto pt-24 pb-12">
                <NavLink to="#" className="contact_close absolute top-6 right-8 text-[#2B2B2B] hover:text-red-600 transition-colors z-50" onClick={ (e) => { e.preventDefault(); setIsQuoteActive(false); } }>
                  <span style={ { fontSize: '48px', lineHeight: '1' } }>&times;</span>
                </NavLink>
                <div className="contact-nav-form">
                  <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-12 lg:col-span-6">
                      <div className="contact-nav-info">
                        <div className="sx-icon-box-wraper left pb-8">
                          <div className="icon-xs inline-icon m-b20 scale-in-center">
                            <Phone size={ 18 } />
                          </div>
                          <div className="icon-content">
                            <h6 className="m-t0">Phone number</h6>
                            <p>{ siteData.contactInfo.phone }</p>
                          </div>
                        </div>
                        <div className="sx-icon-box-wraper left pb-8">
                          <div className="icon-xs inline-icon m-b20 scale-in-center">
                            <Mail size={ 18 } />
                          </div>
                          <div className="icon-content">
                            <h6 className="m-t0">Email address</h6>
                            <p>{ siteData.contactInfo.email }</p>
                          </div>
                        </div>
                        <div className="sx-icon-box-wraper left pb-8">
                          <div className="icon-xs inline-icon m-b20 scale-in-center">
                            <MapPin size={ 18 } />
                          </div>
                          <div className="icon-content">
                            <h6 className="m-t0">Address info</h6>
                            <p>{ siteData.contactInfo.address }</p>
                          </div>
                        </div>
                        <div className="full-social-bg">
                          <ul>
                            <li><a href={ siteData.contactInfo.facebook } target="_blank" rel="noopener noreferrer" className="facebook flex items-center justify-center font-bold">f</a></li>
                            <li><a href={ siteData.contactInfo.instagram } target="_blank" rel="noopener noreferrer" className="instagram flex items-center justify-center font-bold">ig</a></li>
                            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="twitter flex items-center justify-center font-bold">t</a></li>
                            <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="google flex items-center justify-center font-bold">yt</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                      <div className="contact-nav-field shadow-lg p-a30 bg-white" style={ { backgroundImage: `url(${bgMap})` } }>
                        <form onSubmit={ handleSubmit(onSubmit) } className="cons-contact-form2 form-transparent space-y-4">
                          <div className="relative">
                            <Input
                              { ...register("username") }
                              id="name"
                              type="text"
                              placeholder="Name"
                              className="w-full bg-transparent border-0 border-b border-gray-200 rounded-none px-0 py-3 focus-visible:ring-0 focus-visible:border-black placeholder-gray-400 shadow-none outline-none"
                            />
                            { errors.username && <p className="text-red-500 text-xs mt-1">{ errors.username.message }</p> }
                          </div>

                          <div className="relative">
                            <Input
                              { ...register("email") }
                              id="email"
                              type="email"
                              placeholder="Email"
                              className="w-full bg-transparent border-0 border-b border-gray-200 rounded-none px-0 py-3 focus-visible:ring-0 focus-visible:border-black placeholder-gray-400 shadow-none outline-none"
                            />
                            { errors.email && <p className="text-red-500 text-xs mt-1">{ errors.email.message }</p> }
                          </div>

                          <div className="relative">
                            <Input
                              { ...register("phone") }
                              id="phone"
                              type="text"
                              placeholder="Phone"
                              className="w-full bg-transparent border-0 border-b border-gray-200 rounded-none px-0 py-3 focus-visible:ring-0 focus-visible:border-black placeholder-gray-400 shadow-none outline-none"
                            />
                            { errors.phone && <p className="text-red-500 text-xs mt-1">{ errors.phone.message }</p> }
                          </div>

                          <div className="relative">
                            <Textarea
                              { ...register("message") }
                              id="message"
                              placeholder="Message"
                              rows={ 3 }
                              className="w-full bg-transparent border-0 border-b border-gray-200 rounded-none px-0 py-3 focus-visible:ring-0 focus-visible:border-black placeholder-gray-400 shadow-none outline-none resize-none min-h-[80px]"
                            />
                            { errors.message && <p className="text-red-500 text-xs mt-1">{ errors.message.message }</p> }
                          </div>

                          <div className="text-left p-t10">
                            <button
                              type="submit"
                              disabled={ isSubmitting }
                              className="bg-black text-white px-8 py-3 text-sm font-bold tracking-[2px] disabled:opacity-70 flex items-center gap-2 hover:bg-gray-900 transition-colors"
                            >
                              { isSubmitting ? (
                                <>
                                  <Loader2 size={ 16 } className="animate-spin" />
                                  <span>SUBMITTING...</span>
                                </>
                              ) : (
                                <span>SUBMIT NOW</span>
                              ) }
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SITE SEARCH */ }
            <div id="search" className={ isSearchActive ? 'open' : undefined }>
              <span className="close" onClick={ () => setIsSearchActive(false) } />
              <form role="search" id="searchform" action="/search" method="get" className="radius-xl">
                <div className="input-group">
                  <input defaultValue="" name="q" type="search" placeholder="Type to search" />
                  <span className="input-group-btn">
                    <button type="button" className="search-btn">
                      <Search size={ 18 } />
                    </button>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
