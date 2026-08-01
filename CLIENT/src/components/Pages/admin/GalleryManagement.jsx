import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Plus, UploadCloud, Folder, ArrowLeft, Image as ImageIcon, X, Edit } from 'lucide-react';
import { 
    fetchGalleryCategories, 
    createGalleryCategory, 
    updateGalleryCategory,
    deleteGalleryCategory,
    fetchImagesByCategory, 
    createGalleryImages,
    updateGalleryImage,
    deleteGalleryImage,
    getMediaUrl 
} from '@/lib/api';

const GalleryManagement = () => {
    // Top-level state: true means show categories, false means show images of selected category
    const [viewingCategory, setViewingCategory] = useState(null);

    // Categories state
    const [categories, setCategories] = useState([]);
    const [isCatDialogOpen, setIsCatDialogOpen] = useState(false);
    const [newCatTitle, setNewCatTitle] = useState('');
    const [catThumbFile, setCatThumbFile] = useState(null);
    const [catThumbPreview, setCatThumbPreview] = useState([]);
    const [catSaving, setCatSaving] = useState(false);
    const [isCatDragging, setIsCatDragging] = useState(false);

    // Categories Edit state
    const [isEditCatDialogOpen, setIsEditCatDialogOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [editCatTitle, setEditCatTitle] = useState('');
    const [editCatThumbFile, setEditCatThumbFile] = useState(null);
    const [editCatThumbPreview, setEditCatThumbPreview] = useState(null);

    // Images state
    const [images, setImages] = useState([]);
    const [isImgDialogOpen, setIsImgDialogOpen] = useState(false);
    const [newImgTitle, setNewImgTitle] = useState('');
    const [newImgAddress, setNewImgAddress] = useState('');
    const [imgFiles, setImgFiles] = useState([]); // Multiple files
    const [imgSaving, setImgSaving] = useState(false);

    // Images Edit state
    const [isEditImgDialogOpen, setIsEditImgDialogOpen] = useState(false);
    const [editingImage, setEditingImage] = useState(null);
    const [editImgTitle, setEditImgTitle] = useState('');
    const [editImgAddress, setEditImgAddress] = useState('');
    const [editImgFile, setEditImgFile] = useState(null);
    const [editImgPreview, setEditImgPreview] = useState(null);

    useEffect(() => {
        if (!viewingCategory) {
            loadCategories();
        } else {
            loadImages(viewingCategory.id);
        }
    }, [viewingCategory]);

    const loadCategories = async () => {
        const data = await fetchGalleryCategories();
        setCategories(data.data || data);
    };

    const loadImages = async (categoryId) => {
        const data = await fetchImagesByCategory(categoryId);
        setImages(data.data || data);
    };

    // ----- Category Handlers -----
    const handleCatThumbUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                if (files[i].size > 5 * 1024 * 1024) {
                    alert("file is larger then maximum upload size");
                    e.target.value = '';
                    return;
                }
            }
            const newFiles = catThumbFile ? [...catThumbFile, ...files] : files;
            setCatThumbFile(newFiles);
            setCatThumbPreview(newFiles.map(file => URL.createObjectURL(file)));
        }
        e.target.value = null; // Reset to allow re-selecting the same file if needed
    };

    const handleRemoveSelectedImage = (indexToRemove) => {
        const newFiles = catThumbFile.filter((_, idx) => idx !== indexToRemove);
        setCatThumbFile(newFiles.length > 0 ? newFiles : null);
        setCatThumbPreview(newFiles.length > 0 ? newFiles.map(file => URL.createObjectURL(file)) : []);
    };

    const handleSaveCategory = async () => {
        if (!newCatTitle || !catThumbFile || catThumbFile.length === 0) return;
        setCatSaving(true);
        try {
            // 1. Create Category with the first image as thumbnail
            const formData = new FormData();
            formData.append('title', newCatTitle);
            formData.append('thumbnail_image', catThumbFile[0]);
            const catRes = await createGalleryCategory(formData);
            const newCatId = catRes?.id || catRes?.insertId;

            // 2. Upload all selected images into the new category
            if (newCatId) {
                const imgFormData = new FormData();
                imgFormData.append('category_id', newCatId);
                imgFormData.append('title', newImgTitle);
                imgFormData.append('address', newImgAddress);
                catThumbFile.forEach(file => {
                    imgFormData.append('images', file);
                });
                await createGalleryImages(imgFormData);
            }

            await loadCategories();
            setIsCatDialogOpen(false);
            setNewCatTitle('');
            setNewImgTitle('');
            setNewImgAddress('');
            setCatThumbFile(null);
            setCatThumbPreview([]);
        } catch (error) {
            console.error("Save category failed", error);
            alert("Failed to save category and images. Please try again.");
            setIsCatDialogOpen(false);
        } finally {
            setCatSaving(false);
        }
    };

    const openEditCategory = (e, cat) => {
        e.stopPropagation();
        setEditingCategory(cat);
        setEditCatTitle(cat.title || cat.category_name);
        setEditCatThumbFile(null);
        setEditCatThumbPreview(cat.thumbnail_image ? getMediaUrl(cat.thumbnail_image) : null);
        setIsEditCatDialogOpen(true);
    };

    const handleUpdateCategory = async () => {
        if (!editCatTitle) return;
        setCatSaving(true);
        try {
            const formData = new FormData();
            formData.append('title', editCatTitle);
            if (editCatThumbFile) {
                formData.append('thumbnail_image', editCatThumbFile);
            } else if (editingCategory.thumbnail_image) {
                formData.append('thumbnail_image', editingCategory.thumbnail_image);
            }
            await updateGalleryCategory(editingCategory.id, formData);
            await loadCategories();
            setIsEditCatDialogOpen(false);
        } catch (error) {
            console.error("Update category failed", error);
            alert("Failed to update category.");
        } finally {
            setCatSaving(false);
        }
    };

    const handleDeleteCategory = async (e, id) => {
        e.stopPropagation(); // Prevent category click
        if (!window.confirm("Are you sure you want to delete this category? All images inside it might be affected.")) return;
        try {
            await deleteGalleryCategory(id);
            setCategories(prev => prev.filter(cat => cat.id !== id));
        } catch (error) {
            console.error("Delete category failed", error);
            alert("Failed to delete category.");
        }
    };

    // ----- Image Handlers -----
    const handleMultipleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                if (files[i].size > 5 * 1024 * 1024) {
                    alert("file is larger then maximum upload size");
                    e.target.value = '';
                    return;
                }
            }
            setImgFiles(files);
        }
    };

    const handleSaveImages = async () => {
        if (imgFiles.length === 0) return;
        setImgSaving(true);
        try {
            const formData = new FormData();
            formData.append('category_id', viewingCategory.id);
            formData.append('title', newImgTitle);
            formData.append('address', newImgAddress);
            
            imgFiles.forEach(file => {
                formData.append('images', file);
            });

            await createGalleryImages(formData);
            await loadImages(viewingCategory.id);
            
            setIsImgDialogOpen(false);
            setNewImgTitle('');
            setNewImgAddress('');
            setImgFiles([]);
        } catch (error) {
            console.error("Upload images failed", error);
            // Optimistic
            const newImgs = imgFiles.map((f, i) => ({
                id: Date.now() + i,
                image_url: URL.createObjectURL(f),
                title: newImgTitle,
                address: newImgAddress
            }));
            setImages([...newImgs, ...images]);
            setIsImgDialogOpen(false);
            setImgFiles([]);
        } finally {
            setImgSaving(false);
        }
    };

    const openEditImage = (img) => {
        setEditingImage(img);
        setEditImgTitle(img.title || '');
        setEditImgAddress(img.address || '');
        setEditImgFile(null);
        setEditImgPreview(img.image_url ? getMediaUrl(img.image_url) : (img.image ? getMediaUrl(img.image) : ''));
        setIsEditImgDialogOpen(true);
    };

    const handleUpdateImage = async () => {
        setImgSaving(true);
        try {
            const formData = new FormData();
            formData.append('category_id', viewingCategory.id);
            formData.append('title', editImgTitle);
            formData.append('address', editImgAddress);
            if (editImgFile) {
                formData.append('images', editImgFile);
            } else {
                const existingImage = editingImage.image_url || editingImage.image;
                if (existingImage) {
                    formData.append('image_url', existingImage);
                }
            }
            await updateGalleryImage(editingImage.id, formData);
            await loadImages(viewingCategory.id);
            setIsEditImgDialogOpen(false);
        } catch (error) {
            console.error("Update image failed", error);
            alert("Failed to update image.");
        } finally {
            setImgSaving(false);
        }
    };

    const handleDeleteImage = async (id) => {
        if (!window.confirm("Delete this image?")) return;
        try {
            await deleteGalleryImage(id);
            setImages(prev => prev.filter(img => img.id !== id));
        } catch (error) {
            setImages(prev => prev.filter(img => img.id !== id));
        }
    };

    // ----- RENDER VIEW -----
    if (viewingCategory) {
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setViewingCategory(null)} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors text-sm font-medium">
                            <ArrowLeft size={16} />
                            Back to Categories
                        </button>
                        <div className="w-px h-5 bg-slate-200" />
                        <div>
                            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                <Folder size={20} className="text-[#118A43]" />
                                {viewingCategory.title || viewingCategory.category_name}
                            </h2>
                            <p className="text-sm text-slate-500 mt-1">Manage images in this category.</p>
                        </div>
                    </div>
                    
                    {/* Add Image to Category Button */}
                    <Dialog open={isImgDialogOpen} onOpenChange={setIsImgDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-[#118A43] hover:bg-[#0f7a3b] text-white flex items-center gap-2">
                                <UploadCloud size={16} />
                                Upload Images
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                                <DialogTitle>Upload Images</DialogTitle>
                                <DialogDescription>Add new images to this category.</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label>Select Images</Label>
                                    <Input type="file" multiple accept="image/*" onChange={handleMultipleImageUpload} />
                                    {imgFiles.length > 0 && <p className="text-sm text-green-600">{imgFiles.length} files selected</p>}
                                </div>
                                <div className="grid gap-2">
                                    <Label>Title (Optional)</Label>
                                    <Input value={newImgTitle} onChange={(e) => setNewImgTitle(e.target.value)} placeholder="Title for all uploaded images" />
                                </div>
                                <div className="grid gap-2">
                                    <Label>Address (Optional)</Label>
                                    <Input value={newImgAddress} onChange={(e) => setNewImgAddress(e.target.value)} placeholder="Address for all uploaded images" />
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 mt-4">
                                <Button variant="outline" onClick={() => setIsImgDialogOpen(false)}>Cancel</Button>
                                <Button onClick={handleSaveImages} disabled={imgSaving || imgFiles.length === 0} className="bg-[#118A43] hover:bg-[#0f7a3b] text-white">
                                    {imgSaving ? 'Uploading...' : 'Upload'}
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {images.map((img) => (
                        <div key={img.id} className="group relative rounded-xl overflow-hidden border border-slate-200 shadow-sm aspect-square bg-slate-100">
                            <img 
                                src={img.image_url ? getMediaUrl(img.image_url) : (img.image ? getMediaUrl(img.image) : '')} 
                                alt={img.title || "Gallery Item"}
                                className="object-cover w-full h-full"
                            />
                            
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3">
                                <div className="flex justify-end gap-2">
                                    <button onClick={() => openEditImage(img)} className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg">
                                        <Edit size={16} />
                                    </button>
                                    <button onClick={() => handleDeleteImage(img.id)} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                                <div>
                                    {img.title && <p className="text-white font-semibold text-sm truncate">{img.title}</p>}
                                    {img.address && <p className="text-white/80 text-xs truncate">{img.address}</p>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {images.length === 0 && (
                    <div className="text-center py-12 text-slate-500 bg-white rounded-xl border border-slate-200">
                        No images found in this category. Upload some!
                    </div>
                )}

                {/* Edit Image Dialog */}
                <Dialog open={isEditImgDialogOpen} onOpenChange={setIsEditImgDialogOpen}>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Edit Image</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            {editImgPreview && (
                                <div className="w-full h-40 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 relative">
                                    <img src={editImgPreview} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                            <div className="grid gap-2">
                                <Label>Change Image (Optional)</Label>
                                <Input type="file" accept="image/*" onChange={(e) => {
                                    if(e.target.files[0]) {
                                        if (e.target.files[0].size > 5 * 1024 * 1024) {
                                            alert("file is larger then maximum upload size");
                                            e.target.value = '';
                                            return;
                                        }
                                        setEditImgFile(e.target.files[0]);
                                        setEditImgPreview(URL.createObjectURL(e.target.files[0]));
                                    }
                                }} />
                            </div>
                            <div className="grid gap-2">
                                <Label>Title</Label>
                                <Input value={editImgTitle} onChange={(e) => setEditImgTitle(e.target.value)} placeholder="Title" />
                            </div>
                            <div className="grid gap-2">
                                <Label>Address</Label>
                                <Input value={editImgAddress} onChange={(e) => setEditImgAddress(e.target.value)} placeholder="Address" />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-4">
                            <Button variant="outline" onClick={() => setIsEditImgDialogOpen(false)}>Cancel</Button>
                            <Button onClick={handleUpdateImage} disabled={imgSaving} className="bg-[#118A43] hover:bg-[#0f7a3b] text-white">
                                {imgSaving ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }

    // ----- DEFAULT RENDER: CATEGORIES -----
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Gallery Categories</h2>
                    <p className="text-sm text-slate-500 mt-1">Organize your portfolio into categories.</p>
                </div>
                
                <Dialog open={isCatDialogOpen} onOpenChange={setIsCatDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-[#118A43] hover:bg-[#0f7a3b] text-white flex items-center gap-2">
                            <Plus size={16} />
                            Add Category
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] p-6 rounded-xl">
                        <DialogHeader className="mb-4">
                            <DialogTitle className="text-2xl text-[#1e1e1e]">New Category</DialogTitle>
                            <DialogDescription className="text-slate-500">
                                Create a new category for your gallery.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-5 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="cat-title" className="text-slate-700 font-medium">Category Title</Label>
                                <Input id="cat-title" value={newCatTitle} onChange={(e) => setNewCatTitle(e.target.value)} placeholder="e.g. Interior Designs" className="focus-visible:ring-[#118A43]" />
                            </div>
                            <div className="grid gap-2">
                                <Label className="text-slate-700 font-medium">Gallery Images (First is Thumbnail)</Label>
                                <div className="flex gap-3 items-center">
                                    <div className="flex-1 relative">
                                        <input type="file" multiple id="cat-thumb-upload" accept="image/*" onChange={handleCatThumbUpload} className="hidden" />
                                        <Label 
                                            htmlFor="cat-thumb-upload" 
                                            onDragOver={(e) => { 
                                                e.preventDefault(); 
                                                e.stopPropagation(); 
                                                setIsCatDragging(true);
                                            }}
                                            onDragLeave={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setIsCatDragging(false);
                                            }}
                                            onDrop={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setIsCatDragging(false);
                                                if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                                                    const files = Array.from(e.dataTransfer.files);
                                                    const newFiles = catThumbFile ? [...catThumbFile, ...files] : files;
                                                    setCatThumbFile(newFiles);
                                                    setCatThumbPreview(newFiles.map(file => URL.createObjectURL(file)));
                                                }
                                            }}
                                            className={`flex flex-col items-center justify-center w-full h-32 px-4 py-4 border-2 border-dashed rounded-xl cursor-pointer transition-all ${isCatDragging ? 'border-[#118A43] bg-[#118A43]/10' : 'border-slate-300 hover:border-[#118A43]/50 hover:bg-slate-50 bg-slate-50/50'}`}>
                                            <UploadCloud className={`w-10 h-10 mb-3 transition-colors ${isCatDragging ? 'text-[#118A43]' : 'text-slate-400'}`} />
                                            <span className="text-sm font-medium text-slate-700">
                                                {isCatDragging ? 'Drop images here...' : 'Choose files or drag & drop here'}
                                            </span>
                                            <span className="text-xs text-slate-400 mt-1">JPEG, PNG, WEBP files allowed</span>
                                        </Label>
                                        {catThumbFile && catThumbFile.length > 0 && (
                                            <p className="text-xs text-green-600 mt-2 font-medium">
                                                {catThumbFile.length} {catThumbFile.length === 1 ? 'file' : 'files'} selected
                                            </p>
                                        )}
                                    </div>
                                </div>
                                {catThumbPreview && catThumbPreview.length > 0 && (
                                    <div className="flex gap-2 mt-2 overflow-x-auto pb-2 custom-scrollbar">
                                        {catThumbPreview.map((preview, idx) => (
                                            <div key={idx} className="w-20 h-20 shrink-0 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 relative group">
                                                <img src={preview} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                                                {idx === 0 && (
                                                    <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white text-[10px] text-center font-semibold py-0.5">Thumbnail</div>
                                                )}
                                                <button 
                                                    onClick={() => handleRemoveSelectedImage(idx)} 
                                                    className="absolute top-1 right-1 bg-white/90 rounded-full text-red-500 hover:text-red-700 shadow-sm flex items-center justify-center p-1"
                                                    title="Remove image"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="img-title" className="text-slate-700 font-medium">Image Title (Optional)</Label>
                                <Input id="img-title" value={newImgTitle} onChange={(e) => setNewImgTitle(e.target.value)} placeholder="e.g. Modern Villa" className="focus-visible:ring-[#118A43]" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="img-address" className="text-slate-700 font-medium">Image Address (Optional)</Label>
                                <Input id="img-address" value={newImgAddress} onChange={(e) => setNewImgAddress(e.target.value)} placeholder="e.g. Jabalpur, MP" className="focus-visible:ring-[#118A43]" />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-slate-100">
                            <Button variant="outline" onClick={() => setIsCatDialogOpen(false)} className="border-slate-200 text-slate-600">Cancel</Button>
                            <Button onClick={handleSaveCategory} disabled={catSaving || !newCatTitle} className="bg-[#118A43] hover:bg-[#0f7a3b] text-white">
                                {catSaving ? 'Saving...' : 'Save'}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categories.map((cat) => (
                    <Card 
                        key={cat.id} 
                        className="overflow-hidden border-slate-200 shadow-sm cursor-pointer hover:shadow-md transition-shadow group"
                        onClick={() => setViewingCategory(cat)}
                    >
                        <div className="h-40 bg-slate-100 relative overflow-hidden">
                            {cat.thumbnail_image ? (
                                <img src={getMediaUrl(cat.thumbnail_image)} alt={cat.title || cat.category_name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-400">
                                    <ImageIcon size={40} className="opacity-30" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute top-2 right-2 flex gap-2">
                                <button 
                                    onClick={(e) => openEditCategory(e, cat)} 
                                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Edit size={16} />
                                </button>
                                <button 
                                    onClick={(e) => handleDeleteCategory(e, cat.id)} 
                                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
                                <Folder className="text-[#F4B54B]" size={20} />
                                <h3 className="text-white font-semibold truncate">{cat.title || cat.category_name}</h3>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
            {categories.length === 0 && (
                <div className="text-center py-12 text-slate-500 bg-white rounded-xl border border-slate-200">
                    No categories found. Create one to get started!
                </div>
            )}

            {/* Edit Category Dialog */}
            <Dialog open={isEditCatDialogOpen} onOpenChange={setIsEditCatDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Edit Category</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label>Category Title</Label>
                            <Input value={editCatTitle} onChange={(e) => setEditCatTitle(e.target.value)} placeholder="Category Title" />
                        </div>
                        <div className="grid gap-2">
                            <Label>Change Thumbnail (Optional)</Label>
                            {editCatThumbPreview && (
                                <div className="w-32 h-32 rounded-lg overflow-hidden border border-slate-200 mb-2">
                                    <img src={editCatThumbPreview} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                            <Input type="file" accept="image/*" onChange={(e) => {
                                if(e.target.files[0]) {
                                    if (e.target.files[0].size > 5 * 1024 * 1024) {
                                        alert("file is larger then maximum upload size");
                                        e.target.value = '';
                                        return;
                                    }
                                    setEditCatThumbFile(e.target.files[0]);
                                    setEditCatThumbPreview(URL.createObjectURL(e.target.files[0]));
                                }
                            }} />
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-4">
                        <Button variant="outline" onClick={() => setIsEditCatDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleUpdateCategory} disabled={catSaving || !editCatTitle} className="bg-[#118A43] hover:bg-[#0f7a3b] text-white">
                            {catSaving ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default GalleryManagement;
