import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Gallery</h1>
                    <p className="text-gray-500">Manage images for your projects and portfolio.</p>
                </div>
                
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>+ Upload Image</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Upload New Image</DialogTitle>
                            <DialogDescription>
                                Upload an image to your gallery and assign it a category.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="file">Select File</Label>
                                <Input id="file" type="file" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="category">Category</Label>
                                <Input id="category" placeholder="e.g. Interior, Exterior" />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3">
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                            <Button onClick={() => setIsDialogOpen(false)}>Upload</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {images.map((img) => (
                    <Card key={img.id} className="overflow-hidden group relative">
                        <div className="aspect-square w-full">
                            <img 
                                src={img.url} 
                                alt={img.category}
                                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                            <span className="text-white font-medium bg-black/50 px-3 py-1 rounded-full text-sm">
                                {img.category}
                            </span>
                            <Button variant="destructive" size="sm" className="mt-2">
                                Delete
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default GalleryManagement;
