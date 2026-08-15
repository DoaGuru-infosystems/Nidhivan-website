const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { db } = require("../db");
const { getNowIST } = require("../utils/datatime");
const util = require('util');

const query = util.promisify(db.query).bind(db);
const beginTransaction = util.promisify(db.beginTransaction).bind(db);
const commit = util.promisify(db.commit).bind(db);
const rollback = util.promisify(db.rollback).bind(db);

const uploadDir = path.join(__dirname, "../public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp|jfif|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Images only! Allowed formats: jpeg, jpg, png, webp, jfif, gif"));
    }
  },
});

// Create a new project
const createProject = async (req, res) => {
  try {
    const { title, type, status, location, category, description } = req.body;
    let { noOfUnits, noOfSaleUnits, landArea, mapEmbedUrl, amenities, specifications } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "At least 1 image is required" });
    }

    if (mapEmbedUrl && !mapEmbedUrl.startsWith("https://www.google.com/maps") && !mapEmbedUrl.startsWith("https://maps.google.com")) {
      return res.status(400).json({ error: "Invalid Google Maps Embed URL" });
    }

    const parsedNoOfUnits = noOfUnits ? parseInt(noOfUnits, 10) : null;
    const parsedNoOfSaleUnits = noOfSaleUnits ? parseInt(noOfSaleUnits, 10) : null;
    if (parsedNoOfUnits !== null && parsedNoOfUnits < 0) return res.status(400).json({ error: "No. of Units must be non-negative" });
    if (parsedNoOfSaleUnits !== null && parsedNoOfSaleUnits < 0) return res.status(400).json({ error: "No. of Sale Units must be non-negative" });

    let parsedAmenities = [];
    let parsedSpecifications = [];
    try {
      if (amenities) parsedAmenities = JSON.parse(amenities).filter(a => typeof a === 'string' && a.trim() !== '');
      if (specifications) parsedSpecifications = JSON.parse(specifications).filter(a => typeof a === 'string' && a.trim() !== '');
    } catch (e) {
      return res.status(400).json({ error: "Invalid JSON format for amenities or specifications" });
    }

    const created_at = getNowIST();
    const updated_at = created_at;

    await beginTransaction();

    try {
      const projectQuery = "INSERT INTO projects (title, type, status, location, category, description, no_of_units, no_of_sale_units, land_area, map_embed_url, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      const projectValues = [title, type, status, location, category, description, parsedNoOfUnits, parsedNoOfSaleUnits, landArea || null, mapEmbedUrl || null, created_at, updated_at];
      
      const projectResult = await query(projectQuery, projectValues);
      const projectId = projectResult.insertId;

      const imageValues = req.files.map(file => [projectId, file.filename, created_at, updated_at]);
      if (imageValues.length > 0) {
        await query("INSERT INTO project_images (project_id, image_url, created_at, updated_at) VALUES ?", [imageValues]);
      }

      const amenityValues = parsedAmenities.map((text, i) => [projectId, text.trim(), i]);
      if (amenityValues.length > 0) {
        await query("INSERT INTO project_amenities (project_id, amenity_text, sort_order) VALUES ?", [amenityValues]);
      }

      const specValues = parsedSpecifications.map((text, i) => [projectId, text.trim(), i]);
      if (specValues.length > 0) {
        await query("INSERT INTO project_specifications (project_id, specification_text, sort_order) VALUES ?", [specValues]);
      }

      await commit();
      res.status(201).json({ id: projectId, message: "Project created successfully" });
    } catch (innerError) {
      await rollback();
      throw innerError;
    }
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all projects
const getAllProjects = (req, res) => {
  try {
    const projectsQuery = "SELECT * FROM projects ORDER BY created_at DESC";
    
    db.query(projectsQuery, (err, projects) => {
      if (err) {
        console.error("Error fetching projects:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
      }
      
      if (projects.length === 0) {
        return res.json([]);
      }

      const projectIds = projects.map(p => p.id);
      const imagesQuery = "SELECT * FROM project_images WHERE project_id IN (?)";
      
      db.query(imagesQuery, [projectIds], (err, images) => {
        if (err) {
          console.error("Error fetching project images:", err);
          return res.status(500).json({ message: "Server error", error: err.message });
        }

        const projectMap = {};
        projects.forEach(p => {
          projectMap[p.id] = { ...p, images: [] };
        });

        images.forEach(img => {
          if (projectMap[img.project_id]) {
            projectMap[img.project_id].images.push(img);
          }
        });

        const result = Object.values(projectMap).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        res.json(result);
      });
    });
  } catch (error) {
    console.error("Error in getAllProjects:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single project
const getProjectById = async (req, res) => {
  const projectId = req.params.id;
  try {
    const projects = await query("SELECT * FROM projects WHERE id = ?", [projectId]);
    if (projects.length === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    const project = projects[0];
    const images = await query("SELECT * FROM project_images WHERE project_id = ?", [projectId]);
    project.images = images;

    const amenities = await query("SELECT amenity_text FROM project_amenities WHERE project_id = ? ORDER BY sort_order ASC", [projectId]);
    project.amenities = amenities.map(a => a.amenity_text);

    const specifications = await query("SELECT specification_text FROM project_specifications WHERE project_id = ? ORDER BY sort_order ASC", [projectId]);
    project.specifications = specifications.map(s => s.specification_text);

    res.json(project);
  } catch (error) {
    console.error("Error in getProjectById:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a project
const updateProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const { title, type, status, location, category, description } = req.body;
    let { noOfUnits, noOfSaleUnits, landArea, mapEmbedUrl, amenities, specifications } = req.body;

    const results = await query("SELECT * FROM projects WHERE id = ?", [projectId]);
    if (results.length === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (mapEmbedUrl && !mapEmbedUrl.startsWith("https://www.google.com/maps") && !mapEmbedUrl.startsWith("https://maps.google.com")) {
      return res.status(400).json({ error: "Invalid Google Maps Embed URL" });
    }

    const parsedNoOfUnits = noOfUnits !== undefined ? (noOfUnits ? parseInt(noOfUnits, 10) : null) : results[0].no_of_units;
    const parsedNoOfSaleUnits = noOfSaleUnits !== undefined ? (noOfSaleUnits ? parseInt(noOfSaleUnits, 10) : null) : results[0].no_of_sale_units;
    if (parsedNoOfUnits !== null && parsedNoOfUnits < 0) return res.status(400).json({ error: "No. of Units must be non-negative" });
    if (parsedNoOfSaleUnits !== null && parsedNoOfSaleUnits < 0) return res.status(400).json({ error: "No. of Sale Units must be non-negative" });

    let parsedAmenities = null;
    let parsedSpecifications = null;
    let parsedRetainedImages = null;
    try {
      if (amenities !== undefined) parsedAmenities = JSON.parse(amenities).filter(a => typeof a === 'string' && a.trim() !== '');
      if (specifications !== undefined) parsedSpecifications = JSON.parse(specifications).filter(a => typeof a === 'string' && a.trim() !== '');
      if (req.body.retainedImages !== undefined) parsedRetainedImages = JSON.parse(req.body.retainedImages).filter(a => typeof a === 'string');
    } catch (e) {
      return res.status(400).json({ error: "Invalid JSON format for array fields" });
    }

    const updated_at = getNowIST();
    
    await beginTransaction();

    try {
      const updateQuery = "UPDATE projects SET title = ?, type = ?, status = ?, location = ?, category = ?, description = ?, no_of_units = ?, no_of_sale_units = ?, land_area = ?, map_embed_url = ?, updated_at = ? WHERE id = ?";
      const updateValues = [
        title || results[0].title,
        type || results[0].type,
        status || results[0].status,
        location || results[0].location,
        category || results[0].category,
        description !== undefined ? description : results[0].description,
        parsedNoOfUnits,
        parsedNoOfSaleUnits,
        landArea !== undefined ? (landArea || null) : results[0].land_area,
        mapEmbedUrl !== undefined ? (mapEmbedUrl || null) : results[0].map_embed_url,
        updated_at,
        projectId
      ];

      await query(updateQuery, updateValues);

      const oldImages = await query("SELECT image_url FROM project_images WHERE project_id = ?", [projectId]);
      let imagesToDelete = [];

      if (parsedRetainedImages !== null) {
        imagesToDelete = oldImages.map(img => img.image_url).filter(url => !parsedRetainedImages.includes(url));
        if (parsedRetainedImages.length === 0) {
          await query("DELETE FROM project_images WHERE project_id = ?", [projectId]);
        } else {
          const placeholders = parsedRetainedImages.map(() => '?').join(',');
          await query(`DELETE FROM project_images WHERE project_id = ? AND image_url NOT IN (${placeholders})`, [projectId, ...parsedRetainedImages]);
        }
      } else if (req.files && req.files.length > 0) {
        imagesToDelete = oldImages.map(img => img.image_url);
        await query("DELETE FROM project_images WHERE project_id = ?", [projectId]);
      }

      if (imagesToDelete.length > 0) {
        const fs = require('fs');
        const path = require('path');
        imagesToDelete.forEach(url => {
          if (url) {
            const filePath = path.join(__dirname, "../public/uploads", url);
            fs.unlink(filePath, (err) => {
              if (err && err.code !== 'ENOENT') {
                console.error(`Failed to delete discarded project image (${url}):`, err);
              }
            });
          }
        });
      }

      if (req.files && req.files.length > 0) {
        const created_at = getNowIST();
        const imageValues = req.files.map(file => [projectId, file.filename, created_at, created_at]);
        await query("INSERT INTO project_images (project_id, image_url, created_at, updated_at) VALUES ?", [imageValues]);
      }

      if (parsedAmenities !== null) {
        await query("DELETE FROM project_amenities WHERE project_id = ?", [projectId]);
        const amenityValues = parsedAmenities.map((text, i) => [projectId, text.trim(), i]);
        if (amenityValues.length > 0) {
          await query("INSERT INTO project_amenities (project_id, amenity_text, sort_order) VALUES ?", [amenityValues]);
        }
      }

      if (parsedSpecifications !== null) {
        await query("DELETE FROM project_specifications WHERE project_id = ?", [projectId]);
        const specValues = parsedSpecifications.map((text, i) => [projectId, text.trim(), i]);
        if (specValues.length > 0) {
          await query("INSERT INTO project_specifications (project_id, specification_text, sort_order) VALUES ?", [specValues]);
        }
      }

      await commit();
      res.json({ id: projectId, message: "Project updated successfully" });
    } catch (innerError) {
      await rollback();
      throw innerError;
    }
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a project
const deleteProject = (req, res) => {
  try {
    const projectId = req.params.id;
    
    // First fetch all images associated with this project to delete files
    db.query("SELECT image_url FROM project_images WHERE project_id = ?", [projectId], (err, imageResults) => {
      if (err) {
        console.error("Error fetching project images for deletion:", err);
        return res.status(500).json({ message: "Server error" });
      }

      const imageUrls = imageResults.map(row => row.image_url).filter(Boolean);

      // project_images will be deleted automatically due to ON DELETE CASCADE
      db.query("DELETE FROM projects WHERE id = ?", [projectId], (deleteErr, result) => {
        if (deleteErr) {
          console.error("Error deleting project:", deleteErr);
          return res.status(500).json({ message: "Server error" });
        }
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: "Project not found" });
        }

        // Delete all associated image files
        if (imageUrls.length > 0) {
          const fs = require('fs');
          const path = require('path');
          imageUrls.forEach(url => {
            const filePath = path.join(__dirname, "../public/uploads", url);
            fs.unlink(filePath, (unlinkErr) => {
              if (unlinkErr && unlinkErr.code !== 'ENOENT') {
                console.error(`Failed to delete project image file (${url}):`, unlinkErr);
              }
            });
          });
        }

        res.json({ message: "Project and images deleted successfully" });
      });
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  upload
};
