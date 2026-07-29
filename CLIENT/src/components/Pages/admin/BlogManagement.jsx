import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Trash2, Plus } from 'lucide-react';
import { getBlogs, saveBlogs } from '@/lib/dataStore';

const BlogManagement = () => {
    const [blogs, setBlogs] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Form state
    const [newTitle, setNewTitle] = useState('');
    const [newImage, setNewImage] = useState('');
    const [newContent, setNewContent] = useState('');

    useEffect(() => {
        setBlogs(getBlogs());
    }, []);

    const handleSave = () => {
        const newBlog = {
            id: Date.now(),
            title: newTitle || 'Untitled Blog',
            image: newImage || 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1600&q=80',
            content: newContent,
            date: new Date().getDate().toString(),
            month: new Date().toLocaleString('default', { month: 'short' }).toUpperCase(),
            fullDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            author: 'Admin',
            comments: '0 Comment',
            status: 'Published'
        };
        const updated = [newBlog, ...blogs];
        setBlogs(updated);
        saveBlogs(updated);
        setIsDialogOpen(false);
        
        // Reset
        setNewTitle('');
        setNewImage('');
        setNewContent('');
    };

    const handleDelete = (id) => {
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
                
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-[#118A43] hover:bg-[#0f7a3b] text-white flex items-center gap-2">
                            <Plus size={16} />
                            Add New Blog
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[550px] p-6 rounded-xl">
                        <DialogHeader className="mb-4">
                            <DialogTitle className="text-2xl text-[#1e1e1e]">Add New Blog Post</DialogTitle>
                            <DialogDescription className="text-slate-500">
                                Create a new blog post. Fill in the details below.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-5 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title" className="text-slate-700 font-medium">Post Title</Label>
                                <Input id="title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Enter post title" className="focus-visible:ring-[#118A43]" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="image" className="text-slate-700 font-medium">Featured Image URL</Label>
                                <Input id="image" value={newImage} onChange={(e) => setNewImage(e.target.value)} placeholder="https://example.com/image.jpg" className="focus-visible:ring-[#118A43]" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="content" className="text-slate-700 font-medium">Content</Label>
                                <Textarea id="content" value={newContent} onChange={(e) => setNewContent(e.target.value)} placeholder="Write your blog content here..." className="min-h-[160px] focus-visible:ring-[#118A43]" />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-slate-100">
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-slate-200 text-slate-600 hover:bg-slate-50">Cancel</Button>
                            <Button onClick={handleSave} className="bg-[#118A43] hover:bg-[#0f7a3b] text-white">Save Post</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <Card className="border-slate-200 shadow-sm overflow-hidden rounded-xl">
                <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                    <CardTitle className="text-lg text-slate-800">All Blog Posts</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent bg-slate-50/50">
                                <TableHead className="w-[400px] text-slate-600 font-semibold py-4 pl-6">Title</TableHead>
                                <TableHead className="text-slate-600 font-semibold py-4">Date</TableHead>
                                <TableHead className="text-slate-600 font-semibold py-4">Status</TableHead>
                                <TableHead className="text-slate-600 font-semibold py-4">Author</TableHead>
                                <TableHead className="text-right text-slate-600 font-semibold py-4 pr-6">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {blogs.map((item) => (
                                <TableRow key={item.id} className="hover:bg-slate-50 transition-colors border-slate-100">
                                    <TableCell className="font-medium text-slate-800 py-4 pl-6">{item.title}</TableCell>
                                    <TableCell className="text-slate-600 py-4">{item.fullDate || item.date}</TableCell>
                                    <TableCell className="py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide 
                                            ${item.status === 'Published' ? 'bg-[#118A43]/10 text-[#118A43] border border-[#118A43]/20' : 
                                              'bg-[#F4B54B]/10 text-[#d99c36] border border-[#F4B54B]/30'}`}>
                                            {item.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-slate-600 py-4">{item.author}</TableCell>
                                    <TableCell className="text-right py-4 pr-6">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-[#118A43] hover:bg-[#118A43]/10 hover:text-[#0f7a3b]" title="Edit">
                                                <Pencil size={16} />
                                            </Button>
                                            <Button onClick={() => handleDelete(item.id)} variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-700" title="Delete">
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
