import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getBlogs, saveBlogs } from '@/lib/dataStore';

const BlogManagement = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setBlogs(getBlogs());
    }, []);

    const handleDelete = (id) => {
        if (!window.confirm('Are you sure you want to delete this blog post?')) return;
        const updated = blogs.filter(b => b.id !== id);
        setBlogs(updated);
        saveBlogs(updated);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Manage Blogs</h2>
                    <p className="text-sm text-slate-500 mt-1">Create, edit, and manage your blog posts.</p>
                </div>
                <Button
                    onClick={() => navigate('/admin/blogs/new')}
                    className="bg-[#118A43] hover:bg-[#0f7a3b] text-white flex items-center gap-2"
                >
                    <Plus size={16} />
                    Add New Blog
                </Button>
            </div>

            {/* Table */}
            <Card className="border-slate-200 shadow-sm overflow-hidden rounded-xl">
                <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                    <CardTitle className="text-lg text-slate-800">All Blog Posts ({blogs.length})</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent bg-slate-50/50">
                                <TableHead className="w-[280px] text-slate-600 font-semibold py-4 pl-6">Post</TableHead>
                                <TableHead className="text-slate-600 font-semibold py-4">Short Description</TableHead>
                                <TableHead className="text-slate-600 font-semibold py-4">Date</TableHead>
                                <TableHead className="text-slate-600 font-semibold py-4">Status</TableHead>
                                <TableHead className="text-right text-slate-600 font-semibold py-4 pr-6">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {blogs.map((item) => (
                                <TableRow
                                    key={item.id}
                                    className="hover:bg-slate-50 transition-colors border-slate-100 cursor-pointer"
                                    onClick={() => navigate(`/admin/blogs/edit/${item.id}`)}
                                >
                                    <TableCell className="py-4 pl-6">
                                        <div className="flex items-center gap-3">
                                            {item.image ? (
                                                <img
                                                    src={item.image}
                                                    alt=""
                                                    className="w-12 h-12 rounded-lg object-cover flex-shrink-0 border border-slate-100"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                                                    <FileText size={18} className="text-slate-400" />
                                                </div>
                                            )}
                                            <span className="font-medium text-slate-800 line-clamp-2 text-sm leading-snug">
                                                {item.title}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-slate-500 py-4 text-sm max-w-[220px]">
                                        <span className="line-clamp-2">{item.shortDescription || '—'}</span>
                                    </TableCell>
                                    <TableCell className="text-slate-600 py-4 text-sm whitespace-nowrap">
                                        {item.fullDate || item.date}
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide 
                                            ${item.status === 'Published'
                                                ? 'bg-[#118A43]/10 text-[#118A43] border border-[#118A43]/20'
                                                : 'bg-[#F4B54B]/10 text-[#d99c36] border border-[#F4B54B]/30'}`}>
                                            {item.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right py-4 pr-6" onClick={e => e.stopPropagation()}>
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-[#118A43] hover:bg-[#118A43]/10 hover:text-[#0f7a3b]"
                                                title="Edit"
                                                onClick={(e) => { e.stopPropagation(); navigate(`/admin/blogs/edit/${item.id}`); }}
                                            >
                                                <Pencil size={16} />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-700"
                                                title="Delete"
                                                onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {blogs.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-16 text-slate-500">
                                        <div className="flex flex-col items-center gap-3">
                                            <FileText size={32} className="text-slate-300" />
                                            <p className="font-medium">No blog posts yet</p>
                                            <p className="text-sm text-slate-400">Click "Add New Blog" to create your first post</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default BlogManagement;
