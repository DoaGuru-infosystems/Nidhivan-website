import React from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { logoutAdmin } from './utils/auth';
import { BookOpen, MessageSquare, Image as ImageIcon, Users, Building2, LogOut, ChevronDown } from 'lucide-react';
import logo from '../../../images/nidhivan logo.png';

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logoutAdmin();
        navigate('/admin/login');
    };

    // Helper to get page title based on route
    const getPageTitle = () => {
        const path = location.pathname;
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

    return (
        <div className="flex min-h-screen bg-[#f8fafc]">
            {/* SIDEBAR */}
            <aside className="w-64 bg-white border-r border-slate-200 shadow-sm flex flex-col z-10">
                <div className="p-6 border-b border-slate-100 flex justify-center items-center h-20">
                    <img 
                        src={logo} 
                        alt="Nidhivan Logo" 
                        className="max-h-12 w-auto object-contain"
                    />
                </div>
                
                <nav className="flex-1 py-6 flex flex-col gap-1">
                    <NavLink to="/admin/blogs" className={navLinkClass}>
                        <BookOpen size={20} />
                        Blogs
                    </NavLink>
                    <NavLink to="/admin/testimonials" className={navLinkClass}>
                        <MessageSquare size={20} />
                        Testimonials
                    </NavLink>
                    <NavLink to="/admin/gallery" className={navLinkClass}>
                        <ImageIcon size={20} />
                        Gallery
                    </NavLink>
                    <NavLink to="/admin/leads" className={navLinkClass}>
                        <Users size={20} />
                        Contact Leads
                    </NavLink>
                    <NavLink to="/admin/projects" className={navLinkClass}>
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
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* TOP HEADER */}
                <header className="h-20 bg-white border-b border-slate-200 shadow-sm flex items-center justify-between px-8 z-10">
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                        {getPageTitle()}
                    </h1>
                    
                    <div className="flex items-center gap-4 group cursor-pointer relative">
                        <div className="w-10 h-10 rounded-full bg-[#F4B54B]/20 text-[#F4B54B] flex items-center justify-center font-bold border border-[#F4B54B]/30">
                            A
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="font-semibold text-slate-700">Admin</span>
                            <ChevronDown size={16} className="text-slate-400 group-hover:text-slate-700 transition-colors" />
                        </div>

                        {/* Dropdown Menu (Hover based for simplicity, or we can use a small absolute div) */}
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 origin-top">
                            <div className="p-2">
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
                </header>

                {/* PAGE OUTLET */}
                <main className="flex-1 p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
