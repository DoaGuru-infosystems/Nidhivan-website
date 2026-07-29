import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Trash2, Plus } from 'lucide-react';

// Static dummy data
const DUMMY_BLOGS = [
    { id: 1, title: 'Top 10 Interior Design Trends 2026', date: 'Oct 15, 2025', status: 'Published', author: 'Admin' },
    { id: 2, title: 'How to Choose the Right Commercial Space', date: 'Nov 02, 2025', status: 'Draft', author: 'Admin' },
    { id: 3, title: 'The Future of Smart Homes in India', date: 'Dec 12, 2025', status: 'Published', author: 'Admin' },
];

const BlogManagement = () => {
    const [blogs, setBlogs] = useState(DUMMY_BLOGS);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

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
                                <Input id="title" placeholder="Enter post title" className="focus-visible:ring-[#118A43]" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="image" className="text-slate-700 font-medium">Featured Image URL</Label>
                                <Input id="image" placeholder="https://example.com/image.jpg" className="focus-visible:ring-[#118A43]" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="content" className="text-slate-700 font-medium">Content</Label>
                                <Textarea id="content" placeholder="Write your blog content here..." className="min-h-[160px] focus-visible:ring-[#118A43]" />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-slate-100">
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-slate-200 text-slate-600 hover:bg-slate-50">Cancel</Button>
                            <Button onClick={() => setIsDialogOpen(false)} className="bg-[#118A43] hover:bg-[#0f7a3b] text-white">Save Post</Button>
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
                                <TableHead className="text-slate-600 font-semibold py-4">Title</TableHead>
                                <TableHead className="text-slate-600 font-semibold py-4">Author</TableHead>
                                <TableHead className="text-slate-600 font-semibold py-4">Status</TableHead>
                                <TableHead className="text-slate-600 font-semibold py-4">Date</TableHead>
                                <TableHead className="text-right text-slate-600 font-semibold py-4 pr-6">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {blogs.map((blog) => (
                                <TableRow key={blog.id} className="hover:bg-slate-50 transition-colors border-slate-100">
                                    <TableCell className="font-medium text-slate-800 py-4">{blog.title}</TableCell>
                                    <TableCell className="text-slate-600 py-4">{blog.author}</TableCell>
                                    <TableCell className="py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${blog.status === 'Published' ? 'bg-[#118A43]/10 text-[#118A43] border border-[#118A43]/20' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                                            {blog.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-slate-500 py-4">{blog.date}</TableCell>
                                    <TableCell className="text-right py-4 pr-6">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-[#118A43] hover:bg-[#118A43]/10 hover:text-[#0f7a3b]" title="Edit">
                                                <Pencil size={16} />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-700" title="Delete">
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default BlogManagement;
