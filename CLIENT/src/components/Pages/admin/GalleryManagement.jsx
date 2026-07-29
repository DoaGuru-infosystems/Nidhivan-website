import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Plus, UploadCloud } from 'lucide-react';
import { getGalleryItems, saveGalleryItems } from '@/lib/dataStore';

const GalleryManagement = () => {
    const [images, setImages] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Form state
    const [newImage, setNewImage] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [newTitle, setNewTitle] = useState('');
    const [newAddress, setNewAddress] = useState('');

    useEffect(() => {
        setImages(getGalleryItems());
    }, []);

    const handleSave = () => {
        const newItem = {
            id: Date.now(),
            image: newImage || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&auto=format&fit=crop&q=60',
            category: newCategory || 'General',
            title: newTitle || 'New Gallery Item',
            address: newAddress || 'Jabalpur, MP'
        };
        const updated = [newItem, ...images];
        setImages(updated);
        saveGalleryItems(updated);
        setIsDialogOpen(false);
        
        // Reset
        setNewImage('');
        setNewCategory('');
        setNewTitle('');
        setNewAddress('');
    };

    const handleDelete = (id) => {
        const updated = images.filter(img => img.id !== id);
        setImages(updated);
        saveGalleryItems(updated);
    };

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
                                Add an image to your gallery and assign it details.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-5 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="imageUrl" className="text-slate-700 font-medium">Image URL</Label>
                                <Input id="imageUrl" value={newImage} onChange={(e) => setNewImage(e.target.value)} placeholder="https://example.com/image.jpg" className="focus-visible:ring-[#118A43]" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="title" className="text-slate-700 font-medium">Title</Label>
                                <Input id="title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="e.g. Modern Villa" className="focus-visible:ring-[#118A43]" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="address" className="text-slate-700 font-medium">Address</Label>
                                <Input id="address" value={newAddress} onChange={(e) => setNewAddress(e.target.value)} placeholder="e.g. Jabalpur, MP" className="focus-visible:ring-[#118A43]" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="category" className="text-slate-700 font-medium">Category</Label>
                                <Input id="category" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="e.g. Interior, Architecture" className="focus-visible:ring-[#118A43]" />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-slate-100">
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-slate-200 text-slate-600 hover:bg-slate-50">Cancel</Button>
                            <Button onClick={handleSave} className="bg-[#118A43] hover:bg-[#0f7a3b] text-white">Upload</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {images.map((img) => (
                    <div key={img.id} className="group relative rounded-xl overflow-hidden border border-slate-200 shadow-sm aspect-square bg-slate-100">
                        <img 
                            src={img.image} 
                            alt={img.title || img.category}
                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                            <div className="flex justify-end">
                                <button onClick={() => handleDelete(img.id)} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transform translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-lg">
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
            {images.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                    No images found. Upload a new one!
                </div>
            )}
        </div>
    );
};

export default GalleryManagement;
