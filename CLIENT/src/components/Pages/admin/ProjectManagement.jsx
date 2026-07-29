import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2, Plus, Building2 } from 'lucide-react';

const DUMMY_PROJECTS = [
    { id: 1, name: 'Nidhivan Heights', type: 'Residential', location: 'City Center', status: 'Ongoing' },
    { id: 2, name: 'Nidhivan Commercial Complex', type: 'Commercial', location: 'IT Park Road', status: 'Upcoming' },
    { id: 3, name: 'Nidhivan Greens', type: 'Residential', location: 'Suburbs', status: 'Completed' },
];

const ProjectManagement = () => {
    const [projects, setProjects] = useState(DUMMY_PROJECTS);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

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
                                <Label htmlFor="project-name" className="text-slate-700 font-medium">Project Name</Label>
                                <Input id="project-name" placeholder="e.g. Nidhivan Plaza" className="focus-visible:ring-[#118A43]" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="type" className="text-slate-700 font-medium">Type</Label>
                                    <Input id="type" placeholder="Residential / Commercial" className="focus-visible:ring-[#118A43]" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="status" className="text-slate-700 font-medium">Status</Label>
                                    <Input id="status" placeholder="Ongoing / Completed" className="focus-visible:ring-[#118A43]" />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="location" className="text-slate-700 font-medium">Location</Label>
                                <Input id="location" placeholder="e.g. Main Street" className="focus-visible:ring-[#118A43]" />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-slate-100">
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-slate-200 text-slate-600 hover:bg-slate-50">Cancel</Button>
                            <Button onClick={() => setIsDialogOpen(false)} className="bg-[#118A43] hover:bg-[#0f7a3b] text-white">Save Project</Button>
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
                                    <TableCell className="font-medium text-slate-800 py-4 pl-6">{item.name}</TableCell>
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

export default ProjectManagement;
