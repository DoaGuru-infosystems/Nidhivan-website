import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Blogs</h1>
                    <p className="text-gray-500">Manage your blog posts and articles.</p>
                </div>
                
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>+ Add New Blog</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Add New Blog Post</DialogTitle>
                            <DialogDescription>
                                Create a new blog post. Fill in the details below.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Post Title</Label>
                                <Input id="title" placeholder="Enter post title" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="image">Featured Image URL</Label>
                                <Input id="image" placeholder="https://example.com/image.jpg" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="content">Content</Label>
                                <Textarea id="content" placeholder="Write your blog content here..." className="min-h-[150px]" />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3">
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                            <Button onClick={() => setIsDialogOpen(false)}>Save Post</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Blog Posts</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Author</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {blogs.map((blog) => (
                                <TableRow key={blog.id}>
                                    <TableCell className="font-medium">{blog.title}</TableCell>
                                    <TableCell>{blog.author}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${blog.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                            {blog.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>{blog.date}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" className="mr-2 text-blue-600">Edit</Button>
                                        <Button variant="ghost" size="sm" className="text-red-600">Delete</Button>
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
