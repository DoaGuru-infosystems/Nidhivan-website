import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { ArrowLeft, Save, Eye } from 'lucide-react';
import { fetchBlogById, createBlog, updateBlog } from '@/lib/api';
import BlogContentEditor from './components/BlogContentEditor';

const BlogEditor = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // present = edit mode, absent = new mode
    const isEditMode = !!id;

    const [form, setForm] = useState({
        title: '',
        shortDescription: '',
        fullDescription: '',
        author: '',
        category: '',
        meta_title: '',
        meta_description: '',
        meta_keywords: '',
        is_published: true
    });
    
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(isEditMode);

    useEffect(() => {
        if (isEditMode) {
            const loadData = async () => {
                try {
                    const data = await fetchBlogById(id);
                    if (data) {
                        setForm({
                            title: data.title || '',
                            shortDescription: data.short_description || data.shortDescription || '',
                            fullDescription: data.content || data.fullDescription || '',
                            author: data.author || '',
                            category: data.category || '',
                            meta_title: data.meta_title || '',
                            meta_description: data.meta_description || '',
                            meta_keywords: data.meta_keywords || '',
                            is_published: data.is_published === 1 || data.is_published === true || data.status === 'Published'
                        });
                        setPreviewUrl(data.image_url || data.image || '');
                    } else {
                        navigate('/admin/blogs');
                    }
                } catch (err) {
                    console.error('Error fetching blog', err);
                    navigate('/admin/blogs');
                } finally {
                    setLoading(false);
                }
            };
            loadData();
        }
    }, [id, isEditMode, navigate]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const formData = new FormData();
            formData.append('title', form.title);
            formData.append('short_description', form.shortDescription);
            formData.append('content', form.fullDescription);
            formData.append('author', form.author);
            formData.append('category', form.category);
            formData.append('meta_title', form.meta_title);
            formData.append('meta_description', form.meta_description);
            formData.append('meta_keywords', form.meta_keywords);
            formData.append('is_published', form.is_published);

            if (imageFile) {
                formData.append('image', imageFile);
            }

            if (isEditMode) {
                await updateBlog(id, formData);
            } else {
                await createBlog(formData);
            }

            navigate('/admin/blogs');
        } catch (error) {
            console.error("Failed to save blog:", error);
            // Optimistic navigate for offline demo purposes
            navigate('/admin/blogs');
        } finally {
            setSaving(false);
        }
    };

    const setField = (key, val) => setForm(f => ({ ...f, [key]: val }));

    if (loading) {
        return <div className="p-8 text-center text-slate-500">Loading editor...</div>;
    }

    return (
        <div className="min-h-screen bg-[#f8fafc]">
            {/* Top Bar */}
            <div className="sticky top-0 z-20 bg-white border-b border-slate-200 shadow-sm px-8 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/admin/blogs')} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors text-sm font-medium">
                        <ArrowLeft size={16} />
                        Back to Blogs
                    </button>
                    <div className="w-px h-5 bg-slate-200" />
                    <h1 className="text-xl font-bold text-slate-800">
                        {isEditMode ? 'Edit Blog Post' : 'New Blog Post'}
                    </h1>
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="outline" onClick={() => navigate('/admin/blogs')} className="border-slate-200 text-slate-600 hover:bg-slate-50">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={saving} className="bg-[#118A43] hover:bg-[#0f7a3b] text-white flex items-center gap-2 min-w-[130px]">
                        <Save size={16} />
                        {saving ? 'Saving...' : isEditMode ? 'Update Post' : 'Publish Post'}
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
                    {/* Status Toggle */}
                    <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-lg">
                        <div>
                            <Label className="text-slate-700 font-semibold text-base">Publish Status</Label>
                            <p className="text-sm text-slate-500">Determine whether this post is visible on the live site.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-slate-600">{form.is_published ? 'Published' : 'Draft'}</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="sr-only peer" 
                                    checked={form.is_published} 
                                    onChange={(e) => setField('is_published', e.target.checked)} 
                                />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#118A43]/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#118A43]"></div>
                            </label>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="blog-title" className="text-slate-700 font-semibold text-base">Post Title</Label>
                        <Input id="blog-title" value={form.title} onChange={e => setField('title', e.target.value)} placeholder="Enter a compelling blog title..." className="text-lg h-12 focus-visible:ring-[#118A43] border-slate-200" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <Label htmlFor="blog-author" className="text-slate-700 font-semibold text-base">Author</Label>
                            <Input id="blog-author" value={form.author} onChange={e => setField('author', e.target.value)} placeholder="e.g. John Doe" className="focus-visible:ring-[#118A43] border-slate-200" />
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="blog-category" className="text-slate-700 font-semibold text-base">Category</Label>
                            <Input id="blog-category" value={form.category} onChange={e => setField('category', e.target.value)} placeholder="e.g. Architecture, Real Estate..." className="focus-visible:ring-[#118A43] border-slate-200" />
                        </div>
                    </div>
                </div>

                {/* Featured Image */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-3">
                    <Label className="text-slate-700 font-semibold text-base">Featured Image</Label>
                    <div className="flex flex-col gap-3">
                        <div className="relative">
                            <input type="file" id="blog-image-upload" accept="image/*" onChange={handleImageUpload} className="hidden" />
                            <Label htmlFor="blog-image-upload" className="flex items-center justify-center w-full h-10 px-4 py-2 border border-slate-200 border-dashed rounded-md cursor-pointer hover:bg-slate-50 transition-colors text-sm text-slate-600 bg-slate-50 shadow-sm font-medium">
                                Upload image from computer
                            </Label>
                        </div>
                    </div>
                    {previewUrl ? (
                        <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                            <img src={previewUrl} alt="Featured preview" className="w-full h-56 object-cover" />
                        </div>
                    ) : (
                        <div className="w-full h-40 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center text-slate-400 gap-2">
                            <Eye size={28} className="opacity-40" />
                            <span className="text-sm">Upload an image to see preview</span>
                        </div>
                    )}
                </div>

                {/* Short Description */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-3">
                    <div>
                        <Label htmlFor="blog-short-desc" className="text-slate-700 font-semibold text-base">Short Description</Label>
                        <p className="text-xs text-slate-400 mt-0.5">Shown on blog listing cards and home page previews</p>
                    </div>
                    <Textarea id="blog-short-desc" value={form.shortDescription} onChange={e => setField('shortDescription', e.target.value)} placeholder="Write a brief summary..." className="min-h-[100px] focus-visible:ring-[#118A43] border-slate-200 resize-none" />
                </div>

                {/* Full Description */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-3">
                    <div>
                        <Label className="text-slate-700 font-semibold text-base">Full Description (Content)</Label>
                    </div>
                    <BlogContentEditor value={form.fullDescription} onChange={html => setField('fullDescription', html)} />
                </div>

                {/* SEO Metadata */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
                    <div>
                        <Label className="text-slate-700 font-semibold text-lg">SEO Metadata</Label>
                        <p className="text-sm text-slate-500">Improve search engine ranking.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="meta-title">Meta Title</Label>
                            <Input id="meta-title" value={form.meta_title} onChange={e => setField('meta_title', e.target.value)} placeholder="SEO Title" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="meta-keywords">Meta Keywords</Label>
                            <Input id="meta-keywords" value={form.meta_keywords} onChange={e => setField('meta_keywords', e.target.value)} placeholder="comma, separated, keywords" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="meta-desc">Meta Description</Label>
                            <Textarea id="meta-desc" value={form.meta_description} onChange={e => setField('meta_description', e.target.value)} placeholder="SEO Description" className="min-h-[80px]" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BlogEditor;
