import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Trash2, Plus } from 'lucide-react';
import { getBlogs, saveBlogs } from '@/lib/dataStore';
import BlogContentEditor from './components/BlogContentEditor';

const EMPTY_FORM = {
    title: '',
    image: '',
    shortDescription: '',
    fullDescription: '',
};

const BlogManagement = () => {
    const [blogs, setBlogs] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingId, setEditingId] = useState(null); // null = Add mode, id = Edit mode
    const [form, setForm] = useState(EMPTY_FORM);

    useEffect(() => {
        setBlogs(getBlogs());
    }, []);

    const openAdd = () => {
        setEditingId(null);
        setForm(EMPTY_FORM);
        setIsDialogOpen(true);
    };

    const openEdit = (blog) => {
        setEditingId(blog.id);
        setForm({
            title: blog.title || '',
            image: blog.image || '',
            shortDescription: blog.shortDescription || '',
            fullDescription: blog.fullDescription || '',
        });
        setIsDialogOpen(true);
    };

    const handleSave = () => {
        let updated;
        if (editingId !== null) {
            // Edit existing
            updated = blogs.map(b =>
                b.id === editingId
                    ? { ...b, ...form }
                    : b
            );
        } else {
            // Add new
            const newBlog = {
                id: Date.now(),
                title: form.title || 'Untitled Blog',
                image: form.image || 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1600&q=80',
                shortDescription: form.shortDescription,
                fullDescription: form.fullDescription,
                date: new Date().getDate().toString().padStart(2, '0'),
                month: new Date().toLocaleString('default', { month: 'short' }).toUpperCase(),
                fullDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                author: 'Admin',
                comments: '0 Comment',
                status: 'Published',
            };
            updated = [newBlog, ...blogs];
        }
        setBlogs(updated);
        saveBlogs(updated);
        setIsDialogOpen(false);
        setForm(EMPTY_FORM);
        setEditingId(null);
    };

    const handleDelete = (id) => {
        if (!window.confirm('Delete this blog post?')) return;
        const updated = blogs.filter(b => b.id !== id);
        setBlogs(updated);
        saveBlogs(updated);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Manage Blogs</h2>
                    <p className="text-sm text-slate-500 mt-1">Create, edit, and manage your blog posts.</p>
                </div>

                <Button onClick={openAdd} className="bg-[#118A43] hover:bg-[#0f7a3b] text-white flex items-center gap-2">
                    <Plus size={16} />
                    Add New Blog
                </Button>
            </div>

            {/* Add / Edit Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={(open) => { if (!open) { setIsDialogOpen(false); setForm(EMPTY_FORM); setEditingId(null); } }}>
                <DialogContent className="sm:max-w-[820px] max-h-[90vh] overflow-y-auto p-6 rounded-xl">
                    <DialogHeader className="mb-4">
                        <DialogTitle className="text-2xl text-[#1e1e1e]">
                            {editingId !== null ? 'Edit Blog Post' : 'Add New Blog Post'}
                        </DialogTitle>
                        <DialogDescription className="text-slate-500">
                            {editingId !== null
                                ? 'Update the blog post details below.'
                                : 'Fill in the details to create a new blog post.'}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-5 py-2">
                        {/* 1. Title */}
                        <div className="grid gap-2">
                            <Label htmlFor="blog-title" className="text-slate-700 font-medium">Post Title</Label>
                            <Input
                                id="blog-title"
                                value={form.title}
                                onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))}
                                placeholder="Enter post title"
                                className="focus-visible:ring-[#118A43]"
                            />
                        </div>

                        {/* 2. Featured Image */}
                        <div className="grid gap-2">
                            <Label htmlFor="blog-image" className="text-slate-700 font-medium">Featured Image URL</Label>
                            <Input
                                id="blog-image"
                                value={form.image}
                                onChange={(e) => setForm(f => ({ ...f, image: e.target.value }))}
                                placeholder="https://example.com/image.jpg"
                                className="focus-visible:ring-[#118A43]"
                            />
                            {form.image && (
                                <img
                                    src={form.image}
                                    alt="Preview"
                                    className="mt-1 h-28 w-full object-cover rounded-lg border border-slate-200"
                                    onError={(e) => e.target.style.display = 'none'}
                                />
                            )}
                        </div>

                        {/* 3. Short Description */}
                        <div className="grid gap-2">
                            <Label htmlFor="blog-short-desc" className="text-slate-700 font-medium">
                                Short Description
                                <span className="ml-2 text-xs font-normal text-slate-400">(shown in blog list / preview cards)</span>
                            </Label>
                            <Textarea
                                id="blog-short-desc"
                                value={form.shortDescription}
                                onChange={(e) => setForm(f => ({ ...f, shortDescription: e.target.value }))}
                                placeholder="Brief summary shown in blog listings..."
                                className="min-h-[80px] focus-visible:ring-[#118A43]"
                            />
                        </div>

                        {/* 4. Full Description (Editor) */}
                        <div className="grid gap-2">
                            <Label className="text-slate-700 font-medium">
                                Full Description
                                <span className="ml-2 text-xs font-normal text-slate-400">(shown on the blog detail page)</span>
                            </Label>
                            <BlogContentEditor
                                value={form.fullDescription}
                                onChange={(html) => setForm(f => ({ ...f, fullDescription: html }))}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
                        <Button
                            variant="outline"
                            onClick={() => { setIsDialogOpen(false); setForm(EMPTY_FORM); setEditingId(null); }}
                            className="border-slate-200 text-slate-600 hover:bg-slate-50"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSave}
                            className="bg-[#118A43] hover:bg-[#0f7a3b] text-white"
                        >
                            {editingId !== null ? 'Update Post' : 'Save Post'}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <Card className="border-slate-200 shadow-sm overflow-hidden rounded-xl">
                <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                    <CardTitle className="text-lg text-slate-800">All Blog Posts</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent bg-slate-50/50">
                                <TableHead className="w-[300px] text-slate-600 font-semibold py-4 pl-6">Title</TableHead>
                                <TableHead className="text-slate-600 font-semibold py-4">Short Description</TableHead>
                                <TableHead className="text-slate-600 font-semibold py-4">Date</TableHead>
                                <TableHead className="text-slate-600 font-semibold py-4">Status</TableHead>
                                <TableHead className="text-right text-slate-600 font-semibold py-4 pr-6">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {blogs.map((item) => (
                                <TableRow key={item.id} className="hover:bg-slate-50 transition-colors border-slate-100">
                                    <TableCell className="font-medium text-slate-800 py-4 pl-6">
                                        <div className="flex items-center gap-3">
                                            {item.image && (
                                                <img src={item.image} alt="" className="w-10 h-10 rounded object-cover flex-shrink-0" />
                                            )}
                                            <span className="line-clamp-2">{item.title}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-slate-500 py-4 text-sm max-w-[220px]">
                                        <span className="line-clamp-2">{item.shortDescription || '—'}</span>
                                    </TableCell>
                                    <TableCell className="text-slate-600 py-4">{item.fullDate || item.date}</TableCell>
                                    <TableCell className="py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide 
                                            ${item.status === 'Published' ? 'bg-[#118A43]/10 text-[#118A43] border border-[#118A43]/20' :
                                              'bg-[#F4B54B]/10 text-[#d99c36] border border-[#F4B54B]/30'}`}>
                                            {item.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right py-4 pr-6">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-[#118A43] hover:bg-[#118A43]/10 hover:text-[#0f7a3b]"
                                                title="Edit"
                                                onClick={() => openEdit(item)}
                                            >
                                                <Pencil size={16} />
                                            </Button>
                                            <Button
                                                onClick={() => handleDelete(item.id)}
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-700"
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {blogs.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8 text-slate-500">
                                        No blogs found. Add a new one!
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
