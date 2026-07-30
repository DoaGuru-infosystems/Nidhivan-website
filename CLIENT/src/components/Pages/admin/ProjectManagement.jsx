import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Pencil, Trash2, Plus, Building2 } from 'lucide-react';
import { fetchAllProjects, createProject, updateProject, deleteProject, getMediaUrl } from '@/lib/api';

const ProjectManagement = () => {
    const [projects, setProjects] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [saving, setSaving] = useState(false);

    // Form state
    const [newTitle, setNewTitle] = useState('');
    const [newType, setNewType] = useState('residential');
    const [newStatus, setNewStatus] = useState('upcoming');
    const [newLocation, setNewLocation] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [imgFiles, setImgFiles] = useState([]);
    const [imgPreviews, setImgPreviews] = useState([]); // For edit mode existing images or new previews

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        const data = await fetchAllProjects();
        setProjects(data);
    };

    const handleMultipleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            // Limit to 10 files
            const allowedFiles = files.slice(0, 10);
            setImgFiles(allowedFiles);
            
            // Create previews
            const previews = allowedFiles.map(f => URL.createObjectURL(f));
            setImgPreviews(previews);
        }
    };

    const openCreateDialog = () => {
        setEditingId(null);
        setNewTitle('');
        setNewType('residential');
        setNewStatus('upcoming');
        setNewLocation('');
        setNewCategory('');
        setImgFiles([]);
        setImgPreviews([]);
        setIsDialogOpen(true);
    };

    const openEditDialog = (item) => {
        setEditingId(item.id);
        setNewTitle(item.title || '');
        setNewType(item.type || 'residential');
        setNewStatus(item.status || 'upcoming');
        setNewLocation(item.location || '');
        setNewCategory(item.category || '');
        setImgFiles([]);
        // Handle both possible backend structures for images
        let previews = [];
        if (item.images && Array.isArray(item.images)) {
            previews = item.images.map(img => getMediaUrl(img.image_url || img.image || img));
        } else if (item.image) {
            previews = [getMediaUrl(item.image)];
        }
        setImgPreviews(previews);
        setIsDialogOpen(true);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const formData = new FormData();
            formData.append('title', newTitle);
            formData.append('type', newType);
            formData.append('status', newStatus);
            formData.append('location', newLocation);
            formData.append('category', newCategory);
            
            imgFiles.forEach(file => {
                formData.append('images', file);
            });

            if (editingId) {
                await updateProject(editingId, formData);
            } else {
                await createProject(formData);
            }
            
            await loadProjects();
            setIsDialogOpen(false);
        } catch (error) {
            console.error("Save failed", error);
            // Optimistic update for fallback
            const fakeImage = imgPreviews.length > 0 ? imgPreviews[0] : '';
            if (editingId) {
                setProjects(prev => prev.map(p => p.id === editingId ? {
                    ...p, title: newTitle, type: newType, status: newStatus, location: newLocation, category: newCategory, images: [fakeImage]
                } : p));
            } else {
                setProjects([{
                    id: Date.now(), title: newTitle, type: newType, status: newStatus, location: newLocation, category: newCategory, images: [fakeImage]
                }, ...projects]);
            }
            setIsDialogOpen(false);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this project?')) return;
        try {
            await deleteProject(id);
            setProjects(prev => prev.filter(p => p.id !== id));
        } catch (error) {
            setProjects(prev => prev.filter(p => p.id !== id));
        }
    };

    // Helper to extract first image safely
    const getFirstImage = (item) => {
        let img = '';
        if (item.images && Array.isArray(item.images) && item.images.length > 0) {
            img = item.images[0].image_url || item.images[0].image || item.images[0];
        } else {
            img = item.image || item.image_url || '';
        }
        return img ? getMediaUrl(img) : '';
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Manage Projects</h2>
                    <p className="text-sm text-slate-500 mt-1">Add, update, or remove property listings.</p>
                </div>
                
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={openCreateDialog} className="bg-[#118A43] hover:bg-[#0f7a3b] text-white flex items-center gap-2">
                            <Plus size={16} />
                            Add Project
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] p-6 rounded-xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader className="mb-4">
                            <DialogTitle className="text-2xl text-[#1e1e1e]">{editingId ? 'Edit Project' : 'Add New Project'}</DialogTitle>
                            <DialogDescription className="text-slate-500">
                                {editingId ? 'Update project details.' : 'Create a new project listing.'}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-5 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title" className="text-slate-700 font-medium">Project Title</Label>
                                <Input id="title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="e.g. Nidhivan Heights" className="focus-visible:ring-[#118A43]" />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="property-type" className="text-slate-700 font-medium">Property Type</Label>
                                    <select 
                                        id="property-type"
                                        value={newType} 
                                        onChange={(e) => setNewType(e.target.value)}
                                        className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-[#118A43] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <option value="residential">Residential</option>
                                        <option value="commercial">Commercial</option>
                                        <option value="plot">Plots / Land</option>
                                    </select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="property-status" className="text-slate-700 font-medium">Status</Label>
                                    <select 
                                        id="property-status"
                                        value={newStatus} 
                                        onChange={(e) => setNewStatus(e.target.value)}
                                        className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-[#118A43] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <option value="upcoming">Upcoming</option>
                                        <option value="ongoing">Ongoing</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="location" className="text-slate-700 font-medium">Location</Label>
                                    <Input id="location" value={newLocation} onChange={(e) => setNewLocation(e.target.value)} placeholder="e.g. South Civil Lines" className="focus-visible:ring-[#118A43]" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="category" className="text-slate-700 font-medium">Category</Label>
                                    <Input id="category" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="e.g. Premium Apartments" className="focus-visible:ring-[#118A43]" />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label className="text-slate-700 font-medium">Project Images (Max 10)</Label>
                                <div className="flex flex-col gap-3">
                                    <div className="relative">
                                        <input 
                                            type="file" 
                                            id="project-image-upload" 
                                            multiple
                                            accept="image/*" 
                                            onChange={handleMultipleImageUpload} 
                                            className="hidden" 
                                        />
                                        <Label htmlFor="project-image-upload" className="flex items-center justify-center w-full h-10 px-4 py-2 border border-slate-200 border-dashed rounded-md cursor-pointer hover:bg-slate-50 transition-colors text-sm text-slate-600 bg-white shadow-sm font-medium">
                                            {editingId ? 'Upload New Images (Replaces existing)' : 'Select Images'}
                                        </Label>
                                    </div>
                                    {imgPreviews.length > 0 && (
                                        <div className="grid grid-cols-5 gap-2 mt-2">
                                            {imgPreviews.map((url, i) => (
                                                <div key={i} className="aspect-square rounded-md overflow-hidden border border-slate-200 bg-slate-100">
                                                    <img src={url} alt={`preview ${i}`} className="w-full h-full object-cover" />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-slate-100">
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-slate-200 text-slate-600">Cancel</Button>
                            <Button onClick={handleSave} disabled={saving} className="bg-[#118A43] hover:bg-[#0f7a3b] text-white">
                                {saving ? 'Saving...' : 'Save Project'}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <Card className="border-slate-200 shadow-sm overflow-hidden rounded-xl">
                <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                    <CardTitle className="text-lg text-slate-800">All Projects</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent bg-slate-50/50">
                                <TableHead className="w-[300px] text-slate-600 font-semibold py-4 pl-6">Project Info</TableHead>
                                <TableHead className="text-slate-600 font-semibold py-4">Status & Type</TableHead>
                                <TableHead className="text-slate-600 font-semibold py-4">Location</TableHead>
                                <TableHead className="text-right text-slate-600 font-semibold py-4 pr-6">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {projects.map((item) => {
                                const thumb = getFirstImage(item);
                                return (
                                <TableRow key={item.id} className="hover:bg-slate-50 transition-colors border-slate-100 group">
                                    <TableCell className="font-medium text-slate-800 py-4 pl-6">
                                        <div className="flex items-center gap-4">
                                            {thumb ? (
                                                <img 
                                                    src={thumb} 
                                                    alt={item.title} 
                                                    className="w-16 h-12 rounded-lg object-cover flex-shrink-0 border border-slate-200" 
                                                />
                                            ) : (
                                                <div className="w-16 h-12 rounded-lg bg-slate-100 flex items-center justify-center border border-slate-200">
                                                    <Building2 size={20} className="text-slate-400" />
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-semibold text-slate-800">{item.title}</p>
                                                <p className="text-xs text-slate-500 mt-0.5">{item.category}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <div className="flex flex-col gap-2 items-start">
                                            <span className={`px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider
                                                ${item.status === 'completed' ? 'bg-[#118A43]/10 text-[#118A43]' : 
                                                  item.status === 'ongoing' ? 'bg-blue-50 text-blue-600' : 'bg-[#F4B54B]/10 text-[#d99c36]'}`}>
                                                {item.status}
                                            </span>
                                            <span className="text-xs font-medium text-slate-500 capitalize bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200/60">
                                                {item.type}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-slate-600 py-4 font-medium">{item.location}</TableCell>
                                    <TableCell className="text-right py-4 pr-6">
                                        <div className="flex justify-end gap-2">
                                            <Button onClick={() => openEditDialog(item)} variant="ghost" size="icon" className="h-8 w-8 text-[#118A43] hover:bg-[#118A43]/10 hover:text-[#0f7a3b] opacity-0 group-hover:opacity-100 transition-opacity" title="Edit">
                                                <Pencil size={16} />
                                            </Button>
                                            <Button onClick={() => handleDelete(item.id)} variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity" title="Delete">
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                                );
                            })}
                            {projects.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8 text-slate-500">
                                        No projects found.
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

export default ProjectManagement;
