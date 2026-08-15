import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useDispatch } from 'react-redux';
import { logoutUser } from '@/store/UserSlice';
import { BookOpen, MessageSquare, Image as ImageIcon, Users, Building2, LogOut, ChevronDown, Home, Menu, X } from 'lucide-react';

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/admin/login');
    };

    const getPageTitle = () => {
        const path = location.pathname;
        if (path === '/admin/blogs/new') return 'Add New Blog';
        if (path.includes('/admin/blogs/edit/')) return 'Edit Blog Post';
        if (path.includes('/blogs')) return 'Blogs';
        if (path.includes('/testimonials')) return 'Testimonials';
        if (path.includes('/gallery')) return 'Gallery';
        if (path.includes('/leads')) return 'Contact Leads';
        if (path.includes('/projects')) return 'Projects';
        return 'Dashboard';
    };

    const navLinkClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 transition-colors border-l-4 ${
            isActive
            ? 'bg-[#118A43]/10 text-[#118A43] font-bold border-[#118A43]'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 border-transparent font-medium'
        }`;

    const closeSidebar = () => setSidebarOpen(false);

    return (
        <div className="flex min-h-screen bg-[#f8fafc]" data-lenis-prevent="true">

            {/* Mobile Backdrop Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={closeSidebar}
                />
            )}

            {/* SIDEBAR */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 shadow-sm flex flex-col
                transform transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:static lg:translate-x-0 lg:z-auto
            `}>
                <div className="p-6 border-b border-slate-100 flex justify-between items-center h-20">
                    <img
                        src="/images/nidhivan logo.png"
                        alt="Nidhivan Logo"
                        className="max-h-12 w-auto object-contain"
                    />
                    {/* Close button visible only on mobile */}
                    <button
                        className="lg:hidden p-1 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                        onClick={closeSidebar}
                        aria-label="Close sidebar"
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 py-6 flex flex-col gap-1 overflow-y-auto">
                    <NavLink to="/admin/blogs" className={navLinkClass} onClick={closeSidebar}>
                        <BookOpen size={20} />
                        Blogs
                    </NavLink>
                    <NavLink to="/admin/testimonials" className={navLinkClass} onClick={closeSidebar}>
                        <MessageSquare size={20} />
                        Testimonials
                    </NavLink>
                    <NavLink to="/admin/gallery" className={navLinkClass} onClick={closeSidebar}>
                        <ImageIcon size={20} />
                        Gallery
                    </NavLink>
                    <NavLink to="/admin/leads" className={navLinkClass} onClick={closeSidebar}>
                        <Users size={20} />
                        Contact Leads
                    </NavLink>
                    <NavLink to="/admin/projects" className={navLinkClass} onClick={closeSidebar}>
                        <Building2 size={20} />
                        Projects
                    </NavLink>
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <Button
                        variant="ghost"
                        className="w-full flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 justify-start px-4 py-3 h-auto font-medium"
                        onClick={handleLogout}
                    >
                        <LogOut size={20} />
                        Logout
                    </Button>
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
                {/* TOP HEADER */}
                <header className="h-16 lg:h-20 bg-white border-b border-slate-200 shadow-sm flex items-center justify-between px-4 lg:px-8 z-10 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        {/* Hamburger menu - only on mobile */}
                        <button
                            className="lg:hidden p-2 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                            onClick={() => setSidebarOpen(true)}
                            aria-label="Open sidebar"
                        >
                            <Menu size={22} />
                        </button>
                        <h1 className="text-lg lg:text-2xl font-bold text-slate-800 tracking-tight truncate">
                            {getPageTitle()}
                        </h1>
                    </div>

                    <div className="flex items-center gap-3 lg:gap-6">
                        {/* Go to Website Link */}
                        <a
                            href="/"
                            className="hidden sm:flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#118A43] transition-colors"
                        >
                            <Home size={18} />
                            <span>Go to Website</span>
                        </a>

                        <div className="flex items-center gap-2 lg:gap-4 group cursor-pointer relative">
                            <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-[#F4B54B]/20 text-[#F4B54B] flex items-center justify-center font-bold border border-[#F4B54B]/30 text-sm lg:text-base">
                                A
                            </div>
                            <div className="hidden sm:flex items-center gap-1">
                                <span className="font-semibold text-slate-700">Admin</span>
                                <ChevronDown size={16} className="text-slate-400 group-hover:text-slate-700 transition-colors" />
                            </div>

                            {/* Dropdown Menu */}
                            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 origin-top">
                                <div className="p-2">
                                    <a
                                        href="/"
                                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-md transition-colors"
                                    >
                                        <Home size={16} />
                                        Go to Website
                                    </a>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors text-left"
                                    >
                                        <LogOut size={16} />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* PAGE OUTLET */}
                <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
