import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Testimonials</h1>
                    <p className="text-gray-500">Manage client reviews and feedback.</p>
                </div>
                
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>+ Add Testimonial</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Add New Testimonial</DialogTitle>
                            <DialogDescription>
                                Add a new client review to display on the website.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="client-name">Client Name</Label>
                                <Input id="client-name" placeholder="John Doe" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="profession">Profession / Company</Label>
                                <Input id="profession" placeholder="CEO at TechCorp" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="quote">Quote / Review</Label>
                                <Textarea id="quote" placeholder="Write their review here..." className="min-h-[100px]" />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3">
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                            <Button onClick={() => setIsDialogOpen(false)}>Save Testimonial</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Testimonials</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Client Name</TableHead>
                                <TableHead>Profession</TableHead>
                                <TableHead>Quote</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {testimonials.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.name}</TableCell>
                                    <TableCell>{item.profession}</TableCell>
                                    <TableCell className="max-w-xs truncate">{item.quote}</TableCell>
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

export default TestimonialManagement;
