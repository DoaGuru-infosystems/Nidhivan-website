import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Pencil, Trash2, Plus, Building2, ImagePlus, X } from 'lucide-react';
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
    const [newDescription, setNewDescription] = useState('');
    const [newNoOfUnits, setNewNoOfUnits] = useState('');
    const [newNoOfSaleUnits, setNewNoOfSaleUnits] = useState('');
    const [newLandArea, setNewLandArea] = useState('');
    const [newMapEmbedUrl, setNewMapEmbedUrl] = useState('');
    const [newAmenities, setNewAmenities] = useState([]);
    const [newAmenityInput, setNewAmenityInput] = useState('');
    const [newSpecifications, setNewSpecifications] = useState([]);
    const [newSpecInput, setNewSpecInput] = useState('');
    const [existingImages, setExistingImages] = useState([]);
    const [newFiles, setNewFiles] = useState([]);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        const data = await fetchAllProjects();
        setProjects(data);
    };

    const processFiles = (filesArray) => {
        const currentCount = existingImages.length + newFiles.length;
        let allowedSpace = 10 - currentCount;
        
        if (allowedSpace <= 0) {
            alert("Maximum 10 images allowed.");
            return;
        }

        const validFiles = [];
        for (let i = 0; i < filesArray.length; i++) {
            const file = filesArray[i];
            if (file.size > 5 * 1024 * 1024) {
                alert(`File ${file.name} is larger than maximum upload size (5MB).`);
                continue;
            }
            const isDuplicate = newFiles.some(f => f.name === file.name && f.size === file.size);
            if (!isDuplicate && validFiles.length < allowedSpace) {
                validFiles.push(file);
            }
        }

        if (validFiles.length > 0) {
            setNewFiles(prev => [...prev, ...validFiles]);
        }
    };

    const handleFileSelect = (e) => {
        if (e.target.files) {
            processFiles(Array.from(e.target.files));
        }
        e.target.value = '';
    };

    const onDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const onDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const onDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files) {
            processFiles(Array.from(e.dataTransfer.files));
        }
    };

    const removeExistingImage = (idx) => {
        setExistingImages(prev => prev.filter((_, i) => i !== idx));
    };

    const removeNewFile = (idx) => {
        setNewFiles(prev => prev.filter((_, i) => i !== idx));
    };

    const openCreateDialog = () => {
        setEditingId(null);
        setNewTitle('');
        setNewType('residential');
        setNewStatus('upcoming');
        setNewLocation('');
        setNewCategory('');
        setNewDescription('');
        setNewNoOfUnits('');
        setNewNoOfSaleUnits('');
        setNewLandArea('');
        setNewMapEmbedUrl('');
        setNewAmenities([]);
        setNewAmenityInput('');
        setNewSpecifications([]);
        setNewSpecInput('');
        setExistingImages([]);
        setNewFiles([]);
        setIsDialogOpen(true);
    };

    const openEditDialog = (item) => {
        setEditingId(item.id);
        setNewTitle(item.title || '');
        setNewType(item.type || 'residential');
        setNewStatus(item.status || 'upcoming');
        setNewLocation(item.location || '');
        setNewCategory(item.category || '');
        setNewDescription(item.description || '');
        setNewNoOfUnits(item.no_of_units || '');
        setNewNoOfSaleUnits(item.no_of_sale_units || '');
        setNewLandArea(item.land_area || '');
        setNewMapEmbedUrl(item.map_embed_url || '');
        setNewAmenities(item.amenities || []);
        setNewAmenityInput('');
        setNewSpecifications(item.specifications || []);
        setNewSpecInput('');
        setNewFiles([]);
        let existing = [];
        if (item.images && Array.isArray(item.images)) {
            existing = item.images.map(img => {
                const fileStr = img.image_url || img.image || img;
                return { file: fileStr, preview: getMediaUrl(fileStr) };
            });
        } else if (item.image) {
            existing = [{ file: item.image, preview: getMediaUrl(item.image) }];
        }
        setExistingImages(existing);
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
            formData.append('description', newDescription);
            formData.append('noOfUnits', newNoOfUnits);
            formData.append('noOfSaleUnits', newNoOfSaleUnits);
            formData.append('landArea', newLandArea);
            formData.append('mapEmbedUrl', newMapEmbedUrl);
            formData.append('amenities', JSON.stringify(newAmenities));
            formData.append('specifications', JSON.stringify(newSpecifications));
            
            const retainedImages = existingImages.map(img => img.file);
            formData.append('retainedImages', JSON.stringify(retainedImages));
            
            newFiles.forEach(file => {
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
            const fakeImage = existingImages.length > 0 ? existingImages[0].preview : (newFiles.length > 0 ? URL.createObjectURL(newFiles[0]) : '');
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
                                        <option value="farmhouse">Farmhouse / Farm Land</option>
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
                                    <Input id="category" value={newCategory} onChange={e => setNewCategory(e.target.value)} placeholder="e.g. Premium Apartments" className="focus-visible:ring-[#118A43]" />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="noOfUnits" className="text-slate-700 font-medium">No. of Units</Label>
                                    <Input id="noOfUnits" type="number" min="0" value={newNoOfUnits} onChange={e => setNewNoOfUnits(e.target.value)} placeholder="e.g. 125" className="focus-visible:ring-[#118A43]" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="noOfSaleUnits" className="text-slate-700 font-medium">No. of Sale Units</Label>
                                    <Input id="noOfSaleUnits" type="number" min="0" value={newNoOfSaleUnits} onChange={e => setNewNoOfSaleUnits(e.target.value)} placeholder="e.g. 30" className="focus-visible:ring-[#118A43]" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="landArea" className="text-slate-700 font-medium">Land Area</Label>
                                    <Input id="landArea" value={newLandArea} onChange={e => setNewLandArea(e.target.value)} placeholder="e.g. 1.78 acre" className="focus-visible:ring-[#118A43]" />
                                </div>
                            </div>
                            
                            <div className="grid gap-2">
                                <Label htmlFor="mapEmbedUrl" className="text-slate-700 font-medium">Google Maps Embed Link</Label>
                                <Input id="mapEmbedUrl" value={newMapEmbedUrl} onChange={e => setNewMapEmbedUrl(e.target.value)} placeholder="Paste embed link from Google Maps → Share → Embed a map" className="focus-visible:ring-[#118A43]" />
                                <span className="text-xs text-slate-500">Google Maps → open the location → Share → Embed a map tab → Copy HTML → paste only the src="..." URL here.</span>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="description" className="text-slate-700 font-medium">Project Details (Overview)</Label>
                                    <textarea 
                                        id="description" 
                                        value={newDescription} 
                                        onChange={e => setNewDescription(e.target.value)} 
                                        className="flex min-h-[120px] w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#118A43] disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Enter full description of the project..."
                                    />
                                </div>
                            </div>

                            <div className="grid gap-4 mt-2 border-t border-slate-100 pt-4">
                                <Label className="text-slate-700 font-medium">Amenities</Label>
                                <div className="flex gap-2">
                                    <Input value={newAmenityInput} onChange={e => setNewAmenityInput(e.target.value)} onKeyDown={(e) => { if(e.key === 'Enter') { e.preventDefault(); const val = newAmenityInput.trim(); if(val && !newAmenities.includes(val)) { setNewAmenities([...newAmenities, val]); setNewAmenityInput(''); } } }} placeholder="Add an amenity..." className="focus-visible:ring-[#118A43]" />
                                    <Button type="button" onClick={() => { const val = newAmenityInput.trim(); if(val && !newAmenities.includes(val)) { setNewAmenities([...newAmenities, val]); setNewAmenityInput(''); } }} className="bg-[#118A43] hover:bg-[#0f7a3b] text-white">Add</Button>
                                </div>
                                {newAmenities.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {newAmenities.map((amenity, idx) => (
                                            <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-sm rounded-full text-slate-700 border border-slate-200">
                                                {amenity}
                                                <button type="button" onClick={() => setNewAmenities(newAmenities.filter((_, i) => i !== idx))} className="text-slate-500 hover:text-red-500 rounded-full w-4 h-4 flex items-center justify-center font-bold">×</button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="grid gap-4 mt-2 border-t border-slate-100 pt-4 pb-4 border-b">
                                <Label className="text-slate-700 font-medium">Specifications</Label>
                                <div className="flex gap-2">
                                    <Input value={newSpecInput} onChange={e => setNewSpecInput(e.target.value)} onKeyDown={(e) => { if(e.key === 'Enter') { e.preventDefault(); const val = newSpecInput.trim(); if(val && !newSpecifications.includes(val)) { setNewSpecifications([...newSpecifications, val]); setNewSpecInput(''); } } }} placeholder="Add a specification..." className="focus-visible:ring-[#118A43]" />
                                    <Button type="button" onClick={() => { const val = newSpecInput.trim(); if(val && !newSpecifications.includes(val)) { setNewSpecifications([...newSpecifications, val]); setNewSpecInput(''); } }} className="bg-[#118A43] hover:bg-[#0f7a3b] text-white">Add</Button>
                                </div>
                                {newSpecifications.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {newSpecifications.map((spec, idx) => (
                                            <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-sm rounded-full text-slate-700 border border-slate-200">
                                                {spec}
                                                <button type="button" onClick={() => setNewSpecifications(newSpecifications.filter((_, i) => i !== idx))} className="text-slate-500 hover:text-red-500 rounded-full w-4 h-4 flex items-center justify-center font-bold">×</button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label className="text-slate-700 font-medium">Project Images (Max 10)</Label>
                                <div className="flex flex-col gap-3">
                                    <div 
                                        className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${isDragging ? 'border-[#118A43] bg-[#118A43]/5' : 'border-slate-300 hover:border-[#118A43]/50 hover:bg-slate-50'}`}
                                        onDragOver={onDragOver}
                                        onDragLeave={onDragLeave}
                                        onDrop={onDrop}
                                    >
                                        <input 
                                            type="file" 
                                            id="project-image-upload" 
                                            multiple
                                            accept="image/*" 
                                            onChange={handleFileSelect} 
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                                        />
                                        <div className="flex flex-col items-center justify-center text-center pointer-events-none">
                                            <div className="p-3 bg-white rounded-full shadow-sm border border-slate-100 mb-3">
                                                <ImagePlus className="w-6 h-6 text-[#118A43]" />
                                            </div>
                                            <p className="text-sm font-medium text-slate-700">Drag & drop images here</p>
                                            <p className="text-xs text-slate-500 mt-1">or click to browse from computer</p>
                                        </div>
                                    </div>

                                    {(existingImages.length > 0 || newFiles.length > 0) && (
                                        <div className="grid grid-cols-5 gap-3 mt-2">
                                            {existingImages.map((img, i) => (
                                                <div key={`existing-${i}`} className="relative aspect-square rounded-md overflow-hidden border border-slate-200 bg-slate-100 group">
                                                    <img src={img.preview} alt={`existing preview ${i}`} className="w-full h-full object-cover" />
                                                    <button type="button" onClick={() => removeExistingImage(i)} className="absolute top-1 right-1 bg-white/90 text-red-500 rounded-full w-5 h-5 flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-50">
                                                        <X size={12} />
                                                    </button>
                                                </div>
                                            ))}
                                            {newFiles.map((file, i) => (
                                                <div key={`new-${i}`} className="relative aspect-square rounded-md overflow-hidden border border-green-200 bg-green-50 group">
                                                    <img src={URL.createObjectURL(file)} alt={`new preview ${i}`} className="w-full h-full object-cover" />
                                                    <button type="button" onClick={() => removeNewFile(i)} className="absolute top-1 right-1 bg-white/90 text-red-500 rounded-full w-5 h-5 flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-50">
                                                        <X size={12} />
                                                    </button>
                                                    <div className="absolute bottom-0 inset-x-0 bg-green-500/80 text-[10px] text-white text-center py-0.5">New</div>
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
