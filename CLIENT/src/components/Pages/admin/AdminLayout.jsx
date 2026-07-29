import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { logoutAdmin } from './utils/auth';

const AdminLayout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutAdmin();
        navigate('/admin/login');
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
                {/* SIDEBAR */}
                <aside className="w-64 bg-white border-r shadow-sm flex flex-col">
                    <div className="p-6 border-b">
                        <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
                    </div>
                    <nav className="flex-1 p-4 space-y-2">
                        <NavLink 
                            to="/admin/blogs" 
                            className={({ isActive }) => `block px-4 py-2 rounded-md transition-colors ${isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-gray-100 text-gray-700'}`}
                        >
                            Blogs
                        </NavLink>
                        <NavLink 
                            to="/admin/testimonials" 
                            className={({ isActive }) => `block px-4 py-2 rounded-md transition-colors ${isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-gray-100 text-gray-700'}`}
                        >
                            Testimonials
                        </NavLink>
                        <NavLink 
                            to="/admin/gallery" 
                            className={({ isActive }) => `block px-4 py-2 rounded-md transition-colors ${isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-gray-100 text-gray-700'}`}
                        >
                            Gallery
                        </NavLink>
                        <NavLink 
                            to="/admin/leads" 
                            className={({ isActive }) => `block px-4 py-2 rounded-md transition-colors ${isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-gray-100 text-gray-700'}`}
                        >
                            Contact Leads
                        </NavLink>
                        <NavLink 
                            to="/admin/projects" 
                            className={({ isActive }) => `block px-4 py-2 rounded-md transition-colors ${isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-gray-100 text-gray-700'}`}
                        >
                            Projects
                        </NavLink>
                    </nav>
                    <div className="p-4 border-t">
                        <Button variant="outline" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50" onClick={handleLogout}>
                            Logout
                        </Button>
                    </div>
                </aside>

                {/* MAIN CONTENT AREA */}
                <main className="flex-1 p-8 overflow-y-auto h-screen">
                    <Outlet />
                </main>
            </div>
    );
};

export default AdminLayout;
