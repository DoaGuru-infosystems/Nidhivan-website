import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2, Plus, Building2 } from 'lucide-react';
import { getProjects, saveProjects } from '@/lib/dataStore';

const ProjectManagement = () => {
    const [projects, setProjects] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Form state
    const [newTitle, setNewTitle] = useState('');
    const [newType, setNewType] = useState('');
    const [newStatus, setNewStatus] = useState('');
    const [newLocation, setNewLocation] = useState('');
    const [newImage, setNewImage] = useState('');

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        setProjects(getProjects());
    }, []);

    const handleSave = () => {
        const newProject = {
            id: Date.now(),
            title: newTitle || 'Untitled Project',
            type: newType || 'Residential',
            status: newStatus || 'Ongoing',
            location: newLocation || 'Jabalpur',
            category: newType || 'Residential',
            image: newImage || 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1600&q=80'
        };
        const updated = [newProject, ...projects];
        setProjects(updated);
        saveProjects(updated);
        setIsDialogOpen(false);
        
        // Reset
        setNewTitle('');
        setNewType('');
        setNewStatus('');
        setNewLocation('');
        setNewImage('');
    };

    const handleDelete = (id) => {
        const updated = projects.filter(p => p.id !== id);
        setProjects(updated);
        saveProjects(updated);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Manage Projects</h2>
                    <p className="text-sm text-slate-500 mt-1">Manage ongoing, upcoming, and completed projects.</p>
                </div>
                
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-[#118A43] hover:bg-[#0f7a3b] text-white flex items-center gap-2">
                            <Plus size={16} />
                            Add New Project
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[550px] p-6 rounded-xl">
                        <DialogHeader className="mb-4">
                            <DialogTitle className="text-2xl text-[#1e1e1e] flex items-center gap-2">
                                <Building2 className="text-[#118A43]" />
                                Add New Project
                            </DialogTitle>
                            <DialogDescription className="text-slate-500">
                                Create a new project listing.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-5 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="project-title" className="text-slate-700 font-medium">Project Name</Label>
                                <Input id="project-title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="e.g. Nidhivan Plaza" className="focus-visible:ring-[#118A43]" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="type" className="text-slate-700 font-medium">Type</Label>
                                    <Input id="type" value={newType} onChange={(e) => setNewType(e.target.value)} placeholder="Residential / Commercial" className="focus-visible:ring-[#118A43]" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="status" className="text-slate-700 font-medium">Status</Label>
                                    <Input id="status" value={newStatus} onChange={(e) => setNewStatus(e.target.value)} placeholder="Ongoing / Completed" className="focus-visible:ring-[#118A43]" />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="location" className="text-slate-700 font-medium">Location</Label>
                                <Input id="location" value={newLocation} onChange={(e) => setNewLocation(e.target.value)} placeholder="e.g. Main Street" className="focus-visible:ring-[#118A43]" />
                            </div>
                            <div className="grid gap-2">
                                <Label className="text-slate-700 font-medium">Project Image (Optional)</Label>
                                <div className="flex gap-3">
                                    <div className="flex-1 space-y-2">
                                        <Input value={newImage} onChange={(e) => setNewImage(e.target.value)} placeholder="Image URL..." className="focus-visible:ring-[#118A43]" />
                                        <div className="relative">
                                            <input type="file" id="project-image-upload" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                            <Label htmlFor="project-image-upload" className="flex items-center justify-center w-full h-10 px-4 py-2 border border-slate-200 border-dashed rounded-md cursor-pointer hover:bg-slate-50 transition-colors text-sm text-slate-600 bg-white shadow-sm font-medium">
                                                Or upload from computer
                                            </Label>
                                        </div>
                                    </div>
                                    {newImage && (
                                        <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
                                            <img src={newImage} alt="Preview" className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-slate-100">
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-slate-200 text-slate-600 hover:bg-slate-50">Cancel</Button>
                            <Button onClick={handleSave} className="bg-[#118A43] hover:bg-[#0f7a3b] text-white">Save Project</Button>
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
                                <TableHead className="text-slate-600 font-semibold py-4 pl-6">Project Name</TableHead>
                                <TableHead className="text-slate-600 font-semibold py-4">Type</TableHead>
                                <TableHead className="text-slate-600 font-semibold py-4">Location</TableHead>
                                <TableHead className="text-slate-600 font-semibold py-4">Status</TableHead>
                                <TableHead className="text-right text-slate-600 font-semibold py-4 pr-6">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {projects.map((item) => (
                                <TableRow key={item.id} className="hover:bg-slate-50 transition-colors border-slate-100">
                                    <TableCell className="font-medium text-slate-800 py-4 pl-6">
                                        <div className="flex items-center gap-3">
                                            {item.image && (
                                                <img src={item.image} alt={item.title} className="w-10 h-10 rounded-md object-cover flex-shrink-0 border border-slate-200" />
                                            )}
                                            {item.title}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-slate-600 py-4">{item.type}</TableCell>
                                    <TableCell className="text-slate-500 py-4">{item.location}</TableCell>
                                    <TableCell className="py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide 
                                            ${item.status === 'Completed' ? 'bg-[#118A43]/10 text-[#118A43] border border-[#118A43]/20' : 
                                              item.status === 'Ongoing' ? 'bg-[#F4B54B]/10 text-[#d99c36] border border-[#F4B54B]/30' : 
                                              'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                                            {item.status}
                                        </span>
                                    </TableCell>
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
                            {projects.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8 text-slate-500">
                                        No projects found. Add a new one!
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
