import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Plus, UploadCloud } from 'lucide-react';

const DUMMY_GALLERY = [
    { id: 1, url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&auto=format&fit=crop&q=60', category: 'Exterior' },
    { id: 2, url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=500&auto=format&fit=crop&q=60', category: 'Interior' },
    { id: 3, url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=500&auto=format&fit=crop&q=60', category: 'Living Room' },
    { id: 4, url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&auto=format&fit=crop&q=60', category: 'Kitchen' },
    { id: 5, url: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=500&auto=format&fit=crop&q=60', category: 'Exterior' },
    { id: 6, url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=500&auto=format&fit=crop&q=60', category: 'Bedroom' },
];

const GalleryManagement = () => {
    const [images, setImages] = useState(DUMMY_GALLERY);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Manage Gallery</h2>
                    <p className="text-sm text-slate-500 mt-1">Upload and organize images for your portfolio.</p>
                </div>
                
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-[#118A43] hover:bg-[#0f7a3b] text-white flex items-center gap-2">
                            <Plus size={16} />
                            Upload Image
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] p-6 rounded-xl">
                        <DialogHeader className="mb-4">
                            <DialogTitle className="text-2xl text-[#1e1e1e] flex items-center gap-2">
                                <UploadCloud className="text-[#118A43]" />
                                Upload New Image
                            </DialogTitle>
                            <DialogDescription className="text-slate-500">
                                Upload an image to your gallery and assign it a category.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-5 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="file" className="text-slate-700 font-medium">Select File</Label>
                                <Input id="file" type="file" className="cursor-pointer file:bg-slate-50 file:border-0 file:rounded-md file:text-slate-700 file:font-semibold hover:file:bg-slate-100" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="category" className="text-slate-700 font-medium">Category</Label>
                                <Input id="category" placeholder="e.g. Interior, Exterior" className="focus-visible:ring-[#118A43]" />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-slate-100">
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-slate-200 text-slate-600 hover:bg-slate-50">Cancel</Button>
                            <Button onClick={() => setIsDialogOpen(false)} className="bg-[#118A43] hover:bg-[#0f7a3b] text-white">Upload</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {images.map((img) => (
                    <div key={img.id} className="group relative rounded-xl overflow-hidden border border-slate-200 shadow-sm aspect-square bg-slate-100">
                        <img 
                            src={img.url} 
                            alt={img.category}
                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                            <div className="flex justify-end">
                                <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transform translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-lg">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                            <div className="transform translate-y-[10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75">
                                <span className="inline-block bg-[#F4B54B] text-slate-900 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider shadow-sm">
                                    {img.category}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GalleryManagement;
