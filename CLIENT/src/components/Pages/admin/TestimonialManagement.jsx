import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Trash2, Plus, Quote } from 'lucide-react';
import { getTestimonials, saveTestimonials } from '@/lib/dataStore';

const TestimonialManagement = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Form state
    const [newClientName, setNewClientName] = useState('');
    const [newProfession, setNewProfession] = useState('');
    const [newQuote, setNewQuote] = useState('');

    useEffect(() => {
        setTestimonials(getTestimonials());
    }, []);

    const handleSave = () => {
        const newTestimonial = {
            id: Date.now(),
            name: newClientName || 'Anonymous',
            profession: newProfession || 'Client',
            quote: newQuote || 'No review provided.'
        };
        const updated = [newTestimonial, ...testimonials];
        setTestimonials(updated);
        saveTestimonials(updated);
        setIsDialogOpen(false);
        
        // Reset
        setNewClientName('');
        setNewProfession('');
        setNewQuote('');
    };

    const handleDelete = (id) => {
        const updated = testimonials.filter(t => t.id !== id);
        setTestimonials(updated);
        saveTestimonials(updated);
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
                        <Button className="bg-[#118A43] hover:bg-[#0f7a3b] text-white flex items-center gap-2">
                            <Plus size={16} />
                            Add Testimonial
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[550px] p-6 rounded-xl">
                        <DialogHeader className="mb-4">
                            <DialogTitle className="text-2xl text-[#1e1e1e]">Add New Testimonial</DialogTitle>
                            <DialogDescription className="text-slate-500">
                                Add a new client review to display on the website.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-5 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="client-name" className="text-slate-700 font-medium">Client Name</Label>
                                <Input id="client-name" value={newClientName} onChange={(e) => setNewClientName(e.target.value)} placeholder="John Doe" className="focus-visible:ring-[#118A43]" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="profession" className="text-slate-700 font-medium">Profession / Company</Label>
                                <Input id="profession" value={newProfession} onChange={(e) => setNewProfession(e.target.value)} placeholder="CEO at TechCorp" className="focus-visible:ring-[#118A43]" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="quote" className="text-slate-700 font-medium">Quote / Review</Label>
                                <Textarea id="quote" value={newQuote} onChange={(e) => setNewQuote(e.target.value)} placeholder="Write their review here..." className="min-h-[120px] focus-visible:ring-[#118A43]" />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-slate-100">
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-slate-200 text-slate-600 hover:bg-slate-50">Cancel</Button>
                            <Button onClick={handleSave} className="bg-[#118A43] hover:bg-[#0f7a3b] text-white">Save Testimonial</Button>
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
                                    <TableCell className="font-medium text-slate-800 py-5 pl-6">{item.name}</TableCell>
                                    <TableCell className="text-slate-500 py-5">{item.profession}</TableCell>
                                    <TableCell className="py-5">
                                        <div className="flex items-start gap-3 bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                                            <Quote size={14} className="text-[#F4B54B] mt-1 shrink-0" fill="currentColor" />
                                            <p className="text-slate-600 italic text-sm leading-relaxed">{item.quote}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right py-5 pr-6 align-top">
                                        <div className="flex justify-end gap-2 mt-2">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-[#118A43] hover:bg-[#118A43]/10 hover:text-[#0f7a3b] opacity-0 group-hover:opacity-100 transition-opacity" title="Edit">
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
