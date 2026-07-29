import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import { getBlogs, saveBlogs } from '@/lib/dataStore';
import BlogContentEditor from './components/BlogContentEditor';

const BlogEditor = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // present = edit mode, absent = new mode
    const isEditMode = !!id;

    const [form, setForm] = useState({
        title: '',
        image: '',
        shortDescription: '',
        fullDescription: '',
    });
    const [saving, setSaving] = useState(false);
    const [imageError, setImageError] = useState(false);

    // Load existing blog data in edit mode
    useEffect(() => {
        if (isEditMode) {
            const blogs = getBlogs();
            const existing = blogs.find(b => b.id.toString() === id);
            if (existing) {
                setForm({
                    title: existing.title || '',
                    image: existing.image || '',
                    shortDescription: existing.shortDescription || '',
                    fullDescription: existing.fullDescription || '',
                });
            } else {
                // Blog not found — go back
                navigate('/admin/blogs');
            }
        }
    }, [id, isEditMode, navigate]);

    const handleSave = () => {
        setSaving(true);
        const blogs = getBlogs();

        if (isEditMode) {
            const updated = blogs.map(b =>
                b.id.toString() === id ? { ...b, ...form } : b
            );
            saveBlogs(updated);
        } else {
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
            saveBlogs([newBlog, ...blogs]);
        }

        setTimeout(() => {
            setSaving(false);
            navigate('/admin/blogs');
        }, 400);
    };

    const setField = (key, val) => setForm(f => ({ ...f, [key]: val }));

    return (
        <div className="min-h-screen bg-[#f8fafc]">
            {/* ─── Top Bar ─── */}
            <div className="sticky top-0 z-20 bg-white border-b border-slate-200 shadow-sm px-8 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/admin/blogs')}
                        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors text-sm font-medium"
                    >
                        <ArrowLeft size={16} />
                        Back to Blogs
                    </button>
                    <div className="w-px h-5 bg-slate-200" />
                    <h1 className="text-xl font-bold text-slate-800">
                        {isEditMode ? 'Edit Blog Post' : 'New Blog Post'}
                    </h1>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        onClick={() => navigate('/admin/blogs')}
                        className="border-slate-200 text-slate-600 hover:bg-slate-50"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-[#118A43] hover:bg-[#0f7a3b] text-white flex items-center gap-2 min-w-[130px]"
                    >
                        <Save size={16} />
                        {saving ? 'Saving...' : isEditMode ? 'Update Post' : 'Publish Post'}
                    </Button>
                </div>
            </div>

            {/* ─── Main Content ─── */}
            <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">

                {/* ── 1. Post Title ── */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-3">
                    <Label htmlFor="blog-title" className="text-slate-700 font-semibold text-base">
                        Post Title
                    </Label>
                    <Input
                        id="blog-title"
                        value={form.title}
                        onChange={e => setField('title', e.target.value)}
                        placeholder="Enter a compelling blog title..."
                        className="text-lg h-12 focus-visible:ring-[#118A43] border-slate-200"
                    />
                </div>

                {/* ── 2. Featured Image ── */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-3">
                    <Label htmlFor="blog-image" className="text-slate-700 font-semibold text-base">
                        Featured Image
                    </Label>
                    <div className="flex gap-3">
                        <Input
                            id="blog-image"
                            value={form.image}
                            onChange={e => { setField('image', e.target.value); setImageError(false); }}
                            placeholder="https://example.com/your-image.jpg"
                            className="flex-1 focus-visible:ring-[#118A43] border-slate-200"
                        />
                    </div>

                    {/* Image Preview */}
                    {form.image && !imageError ? (
                        <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                            <img
                                src={form.image}
                                alt="Featured image preview"
                                className="w-full h-56 object-cover"
                                onError={() => setImageError(true)}
                            />
                            <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                                <Eye size={12} /> Preview
                            </div>
                        </div>
                    ) : (
                        <div className="w-full h-40 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center text-slate-400 gap-2">
                            <Eye size={28} className="opacity-40" />
                            <span className="text-sm">Paste an image URL above to see preview</span>
                        </div>
                    )}
                </div>

                {/* ── 3. Short Description ── */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-3">
                    <div>
                        <Label htmlFor="blog-short-desc" className="text-slate-700 font-semibold text-base">
                            Short Description
                        </Label>
                        <p className="text-xs text-slate-400 mt-0.5">Shown on blog listing cards and home page previews</p>
                    </div>
                    <Textarea
                        id="blog-short-desc"
                        value={form.shortDescription}
                        onChange={e => setField('shortDescription', e.target.value)}
                        placeholder="Write a brief summary that entices readers to click and read more..."
                        className="min-h-[100px] focus-visible:ring-[#118A43] border-slate-200 resize-none"
                    />
                    <p className="text-xs text-slate-400 text-right">
                        {form.shortDescription.length} characters
                    </p>
                </div>

                {/* ── 4. Full Description ── */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-3">
                    <div>
                        <Label className="text-slate-700 font-semibold text-base">
                            Full Description
                        </Label>
                        <p className="text-xs text-slate-400 mt-0.5">Shown on the blog detail page — supports rich text or raw HTML/CSS/JavaScript</p>
                    </div>
                    <BlogContentEditor
                        value={form.fullDescription}
                        onChange={html => setField('fullDescription', html)}
                    />
                </div>

                {/* ── Bottom Save Bar ── */}
                <div className="flex justify-end gap-3 pb-6">
                    <Button
                        variant="outline"
                        onClick={() => navigate('/admin/blogs')}
                        className="border-slate-200 text-slate-600 hover:bg-slate-50 px-6"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-[#118A43] hover:bg-[#0f7a3b] text-white flex items-center gap-2 px-8"
                    >
                        <Save size={16} />
                        {saving ? 'Saving...' : isEditMode ? 'Update Post' : 'Publish Post'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default BlogEditor;
