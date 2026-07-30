import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Trash2, Plus, Quote } from 'lucide-react';
import { fetchAllTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '@/lib/api';

const TestimonialManagement = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [saving, setSaving] = useState(false);

    // Form state
    const [newClientName, setNewClientName] = useState('');
    const [newProfession, setNewProfession] = useState('');
    const [newQuote, setNewQuote] = useState('');
    const [newVideoUrl, setNewVideoUrl] = useState('');
    const [newYoutubeUrl, setNewYoutubeUrl] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');

    useEffect(() => {
        loadTestimonials();
    }, []);

    const loadTestimonials = async () => {
        const data = await fetchAllTestimonials();
        setTestimonials(data);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const openCreateDialog = () => {
        setEditingId(null);
        setNewClientName('');
        setNewProfession('');
        setNewQuote('');
        setNewVideoUrl('');
        setNewYoutubeUrl('');
        setImageFile(null);
        setPreviewUrl('');
        setIsDialogOpen(true);
    };

    const openEditDialog = (item) => {
        setEditingId(item.id);
        setNewClientName(item.name || item.client_name || '');
        setNewProfession(item.profession || item.designation || '');
        setNewQuote(item.quote || item.text_content || '');
        setNewVideoUrl(item.video_url || '');
        setNewYoutubeUrl(item.youtube_url || '');
        setImageFile(null);
        setPreviewUrl(item.image_url || item.image || '');
        setIsDialogOpen(true);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const formData = new FormData();
            formData.append('name', newClientName || 'Anonymous');
            formData.append('designation', newProfession || 'Client');
            formData.append('text_content', newQuote || 'No review provided.');
            if (newVideoUrl) formData.append('video_url', newVideoUrl);
            if (newYoutubeUrl) formData.append('youtube_url', newYoutubeUrl);
            if (imageFile) {
                formData.append('image_url', imageFile);
            }

            if (editingId) {
                await updateTestimonial(editingId, formData);
            } else {
                await createTestimonial(formData);
            }
            
            await loadTestimonials();
            setIsDialogOpen(false);
        } catch (error) {
            console.error("Save failed", error);
            // Optimistic update for fallback scenario
            if (editingId) {
                setTestimonials(prev => prev.map(t => t.id === editingId ? {
                    ...t,
                    name: newClientName,
                    profession: newProfession,
                    quote: newQuote,
                    video_url: newVideoUrl,
                    youtube_url: newYoutubeUrl,
                    image: previewUrl || t.image
                } : t));
            } else {
                setTestimonials([{
                    id: Date.now(),
                    name: newClientName,
                    profession: newProfession,
                    quote: newQuote,
                    image: previewUrl
                }, ...testimonials]);
            }
            setIsDialogOpen(false);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this testimonial?')) return;
        try {
            await deleteTestimonial(id);
            setTestimonials(prev => prev.filter(t => t.id !== id));
        } catch (error) {
            console.error("Delete failed", error);
            setTestimonials(prev => prev.filter(t => t.id !== id));
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Manage Testimonials</h2>
                    <p className="text-sm text-slate-500 mt-1">Manage client reviews and feedback.</p>
                </div>
                
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={openCreateDialog} className="bg-[#118A43] hover:bg-[#0f7a3b] text-white flex items-center gap-2">
                            <Plus size={16} />
                            Add Testimonial
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[550px] p-6 rounded-xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader className="mb-4">
                            <DialogTitle className="text-2xl text-[#1e1e1e]">{editingId ? 'Edit Testimonial' : 'Add New Testimonial'}</DialogTitle>
                            <DialogDescription className="text-slate-500">
                                {editingId ? 'Update the details below.' : 'Add a new client review to display on the website.'}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-5 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="client-name" className="text-slate-700 font-medium">Client Name</Label>
                                <Input id="client-name" value={newClientName} onChange={(e) => setNewClientName(e.target.value)} placeholder="John Doe" className="focus-visible:ring-[#118A43]" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="profession" className="text-slate-700 font-medium">Profession / Designation</Label>
                                <Input id="profession" value={newProfession} onChange={(e) => setNewProfession(e.target.value)} placeholder="CEO at TechCorp" className="focus-visible:ring-[#118A43]" />
                            </div>
                            <div className="grid gap-2">
                                <Label className="text-slate-700 font-medium">Client Photo (Optional)</Label>
                                <div className="flex gap-3 items-center">
                                    <div className="flex-1">
                                        <div className="relative">
                                            <input type="file" id="testimonial-image-upload" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                            <Label htmlFor="testimonial-image-upload" className="flex items-center justify-center w-full h-10 px-4 py-2 border border-slate-200 border-dashed rounded-md cursor-pointer hover:bg-slate-50 transition-colors text-sm text-slate-600 bg-white shadow-sm font-medium">
                                                Upload from computer
                                            </Label>
                                        </div>
                                    </div>
                                    {previewUrl && (
                                        <div className="w-12 h-12 shrink-0 rounded-full overflow-hidden border border-slate-200 bg-slate-100">
                                            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="video-url" className="text-slate-700 font-medium">Video URL (Optional)</Label>
                                <Input id="video-url" value={newVideoUrl} onChange={(e) => setNewVideoUrl(e.target.value)} placeholder="Path to video file" className="focus-visible:ring-[#118A43]" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="youtube-url" className="text-slate-700 font-medium">YouTube URL (Optional)</Label>
                                <Input id="youtube-url" value={newYoutubeUrl} onChange={(e) => setNewYoutubeUrl(e.target.value)} placeholder="YouTube embedded link" className="focus-visible:ring-[#118A43]" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="quote" className="text-slate-700 font-medium">Quote / Review</Label>
                                <Textarea id="quote" value={newQuote} onChange={(e) => setNewQuote(e.target.value)} placeholder="Write their review here..." className="min-h-[120px] focus-visible:ring-[#118A43]" />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-slate-100">
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-slate-200 text-slate-600 hover:bg-slate-50">Cancel</Button>
                            <Button onClick={handleSave} disabled={saving} className="bg-[#118A43] hover:bg-[#0f7a3b] text-white">
                                {saving ? 'Saving...' : 'Save Testimonial'}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <Card className="border-slate-200 shadow-sm overflow-hidden rounded-xl">
                <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                    <CardTitle className="text-lg text-slate-800">All Testimonials</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent bg-slate-50/50">
                                <TableHead className="w-[200px] text-slate-600 font-semibold py-4 pl-6">Client Name</TableHead>
                                <TableHead className="w-[200px] text-slate-600 font-semibold py-4">Profession</TableHead>
                                <TableHead className="text-slate-600 font-semibold py-4">Quote</TableHead>
                                <TableHead className="text-right text-slate-600 font-semibold py-4 pr-6">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {testimonials.map((item) => (
                                <TableRow key={item.id} className="hover:bg-slate-50 transition-colors border-slate-100 group">
                                    <TableCell className="font-medium text-slate-800 py-5 pl-6">
                                        <div className="flex items-center gap-3">
                                            {(item.image_url || item.image) && (
                                                <img src={item.image_url || item.image} alt={item.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0 border border-slate-200" />
                                            )}
                                            {item.name || item.client_name}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-slate-500 py-5">{item.designation || item.profession}</TableCell>
                                    <TableCell className="py-5">
                                        <div className="flex items-start gap-3 bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                                            <Quote size={14} className="text-[#F4B54B] mt-1 shrink-0" fill="currentColor" />
                                            <p className="text-slate-600 italic text-sm leading-relaxed">{item.text_content || item.quote}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right py-5 pr-6 align-top">
                                        <div className="flex justify-end gap-2 mt-2">
                                            <Button onClick={() => openEditDialog(item)} variant="ghost" size="icon" className="h-8 w-8 text-[#118A43] hover:bg-[#118A43]/10 hover:text-[#0f7a3b] opacity-0 group-hover:opacity-100 transition-opacity" title="Edit">
                                                <Pencil size={16} />
                                            </Button>
                                            <Button onClick={() => handleDelete(item.id)} variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity" title="Delete">
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {testimonials.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8 text-slate-500">
                                        No testimonials found. Add a new one!
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

export default TestimonialManagement;
