import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Trash2, Plus, Quote } from 'lucide-react';

const DUMMY_TESTIMONIALS = [
    { id: 1, name: 'Rahul Sharma', profession: 'Software Engineer', quote: 'Excellent service and great project delivery.' },
    { id: 2, name: 'Anita Desai', profession: 'Business Owner', quote: 'They helped us find the perfect commercial space.' },
    { id: 3, name: 'Vikram Singh', profession: 'Investor', quote: 'Highly transparent and trustworthy real estate partners.' },
];

const TestimonialManagement = () => {
    const [testimonials, setTestimonials] = useState(DUMMY_TESTIMONIALS);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

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
                                <Input id="client-name" placeholder="John Doe" className="focus-visible:ring-[#118A43]" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="profession" className="text-slate-700 font-medium">Profession / Company</Label>
                                <Input id="profession" placeholder="CEO at TechCorp" className="focus-visible:ring-[#118A43]" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="quote" className="text-slate-700 font-medium">Quote / Review</Label>
                                <Textarea id="quote" placeholder="Write their review here..." className="min-h-[120px] focus-visible:ring-[#118A43]" />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-slate-100">
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-slate-200 text-slate-600 hover:bg-slate-50">Cancel</Button>
                            <Button onClick={() => setIsDialogOpen(false)} className="bg-[#118A43] hover:bg-[#0f7a3b] text-white">Save Testimonial</Button>
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
                                <TableHead className="text-slate-600 font-semibold py-4 w-[200px]">Client Name</TableHead>
                                <TableHead className="text-slate-600 font-semibold py-4 w-[200px]">Profession</TableHead>
                                <TableHead className="text-slate-600 font-semibold py-4">Quote</TableHead>
                                <TableHead className="text-right text-slate-600 font-semibold py-4 pr-6">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {testimonials.map((item) => (
                                <TableRow key={item.id} className="hover:bg-slate-50 transition-colors border-slate-100">
                                    <TableCell className="font-medium text-slate-800 py-4">{item.name}</TableCell>
                                    <TableCell className="text-slate-600 py-4">{item.profession}</TableCell>
                                    <TableCell className="py-4">
                                        <div className="flex items-start gap-2">
                                            <Quote size={14} className="text-[#F4B54B] flex-shrink-0 mt-1 opacity-60" />
                                            <span className="italic text-slate-600">{item.quote}</span>
                                        </div>
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

export default TestimonialManagement;
