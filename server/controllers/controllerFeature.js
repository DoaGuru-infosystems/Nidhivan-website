const { db } = require("../db");
const { getNowIST } = require("../utils/datatime");
const fs = require("fs");
const path = require("path");

// Create a new gallery category
const createGalleryCategory = (req, res) => {
  const { title } = req.body;
  const thumbnail_image = req.file ? req.file.filename : null;
  
  if (!title || !thumbnail_image) {
    return res.status(400).json({ error: "Title and thumbnail_image are required" });
  }

  const created_at = getNowIST();
  const updated_at = created_at;

  const query = "INSERT INTO gallery_categories (title, thumbnail_image, created_at, updated_at) VALUES (?, ?, ?, ?)";
  db.query(query, [title, thumbnail_image, created_at, updated_at], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err });
    }
    return res.status(201).json({ message: "Category created successfully", id: results.insertId });
  });
};

// Get all gallery categories
const getAllGalleryCategories = (req, res) => {
  const query = "SELECT * FROM gallery_categories ORDER BY created_at DESC";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err });
    }
    return res.status(200).json({ data: results });
  });
};

// Get a single gallery category by ID
const getGalleryCategoryById = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM gallery_categories WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Category not found" });
    }
    return res.status(200).json({ data: results[0] });
  });
};

// Update a gallery category
const updateGalleryCategory = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  let thumbnail_image = req.body.thumbnail_image; // fallback to existing string/url
  
  if (req.file) {
    thumbnail_image = req.file.filename;
  }

  if (!title || !thumbnail_image) {
    return res.status(400).json({ error: "Title and thumbnail_image are required" });
  }

  const updated_at = getNowIST();
  const query = "UPDATE gallery_categories SET title = ?, thumbnail_image = ?, updated_at = ? WHERE id = ?";
  
  db.query(query, [title, thumbnail_image, updated_at, id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Category not found" });
    }
    return res.status(200).json({ message: "Category updated successfully" });
  });
};

// Delete a gallery category
const deleteGalleryCategory = (req, res) => {
  const { id } = req.params;

  // 1. Fetch category thumbnail and images to delete their files
  db.query("SELECT thumbnail_image FROM gallery_categories WHERE id = ?", [id], (err, catResults) => {
    if (err) return res.status(500).json({ error: "Database error", details: err });
    if (catResults.length === 0) return res.status(404).json({ error: "Category not found" });

    const catThumbnail = catResults[0].thumbnail_image;

    db.query("SELECT image_url FROM gallery_images WHERE category_id = ?", [id], (imgErr, imgResults) => {
      if (imgErr) return res.status(500).json({ error: "Database error", details: imgErr });

      const imageFiles = imgResults.map(row => row.image_url);

      // 2. Delete from database
      const query = "DELETE FROM gallery_categories WHERE id = ?";
      db.query(query, [id], (deleteErr, results) => {
        if (deleteErr) return res.status(500).json({ error: "Database error", details: deleteErr });
        if (results.affectedRows === 0) return res.status(404).json({ error: "Category not found" });

        // 3. Delete files from upload folder
        const filesToDelete = [catThumbnail, ...imageFiles].filter(Boolean);
        filesToDelete.forEach(filename => {
          const filePath = path.join(__dirname, "../public/uploads", filename);
          fs.unlink(filePath, (unlinkErr) => {
            if (unlinkErr) console.error("Failed to delete file:", unlinkErr);
          });
        });

        return res.status(200).json({ message: "Category deleted successfully" });
      });
    });
  });
};

// --- Gallery Images CRUD ---

// Create a new gallery image (Multiple Upload Support)
const createGalleryImage = (req, res) => {
  const { category_id, title, address } = req.body;

  if (!category_id) {
    return res.status(400).json({ error: "category_id is required" });
  }

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "At least one image is required" });
  }

  const created_at = getNowIST();
  
  // Create an array of values for bulk insert: [category_id, image_url, title, address, created_at, updated_at]
  const values = req.files.map(file => [category_id, file.filename, title || null, address || null, created_at, created_at]);

  const query = "INSERT INTO gallery_images (category_id, image_url, title, address, created_at, updated_at) VALUES ?";
  
  db.query(query, [values], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err });
    }
    return res.status(201).json({ message: "Images created successfully", insertedRows: results.affectedRows });
  });
};

// Get all gallery images
const getAllGalleryImages = (req, res) => {
  const query = "SELECT * FROM gallery_images ORDER BY created_at DESC";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err });
    }
    return res.status(200).json({ data: results });
  });
};

// Get gallery images by category ID
const getGalleryImagesByCategoryId = (req, res) => {
  const { category_id } = req.params;
  const query = "SELECT * FROM gallery_images WHERE category_id = ? ORDER BY created_at DESC";
  db.query(query, [category_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err });
    }
    return res.status(200).json({ data: results });
  });
};

// Get a single gallery image by ID
const getGalleryImageById = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM gallery_images WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Image not found" });
    }
    return res.status(200).json({ data: results[0] });
  });
};

// Update a gallery image
const updateGalleryImage = (req, res) => {
  const { id } = req.params;
  const { category_id, title, address } = req.body;
  let image_url = req.body.image_url;

  // Use the first file from array if a new one was uploaded
  if (req.files && req.files.length > 0) {
    image_url = req.files[0].filename;
  } else if (req.file) { 
    image_url = req.file.filename;
  }

  if (!category_id || !image_url) {
    return res.status(400).json({ error: "category_id and image_url are required" });
  }

  const updated_at = getNowIST();
  const query = "UPDATE gallery_images SET category_id = ?, image_url = ?, title = ?, address = ?, updated_at = ? WHERE id = ?";
  
  db.query(query, [category_id, image_url, title || null, address || null, updated_at, id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Image not found" });
    }
    return res.status(200).json({ message: "Image updated successfully" });
  });
};

// Delete a gallery image
const deleteGalleryImage = (req, res) => {
  const { id } = req.params;

  db.query("SELECT image_url FROM gallery_images WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error", details: err });
    if (results.length === 0) return res.status(404).json({ error: "Image not found" });

    const filename = results[0].image_url;

    const query = "DELETE FROM gallery_images WHERE id = ?";
    db.query(query, [id], (deleteErr, deleteResults) => {
      if (deleteErr) return res.status(500).json({ error: "Database error", details: deleteErr });
      if (deleteResults.affectedRows === 0) return res.status(404).json({ error: "Image not found" });

      if (filename) {
        const filePath = path.join(__dirname, "../public/uploads", filename);
        fs.unlink(filePath, (unlinkErr) => {
          if (unlinkErr) console.error("Failed to delete file:", unlinkErr);
        });
      }

      return res.status(200).json({ message: "Image deleted successfully" });
    });
  });
};

module.exports = {
  createGalleryCategory,
  getAllGalleryCategories,
  getGalleryCategoryById,
  updateGalleryCategory,
  deleteGalleryCategory,
  createGalleryImage,
  getAllGalleryImages,
  getGalleryImagesByCategoryId,
  getGalleryImageById,
  updateGalleryImage,
  deleteGalleryImage,
};