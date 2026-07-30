const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { db } = require("../db");
const { getNowIST } = require("../utils/datatime");

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
    const filetypes = /jpeg|jpg|png|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Images only!");
    }
  },
});

// Create a new project
const createProject = (req, res) => {
  try {
    const { title, type, status, location, category } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "At least 1 image is required" });
    }

    const created_at = getNowIST();
    const updated_at = created_at;

    const projectQuery = "INSERT INTO projects (title, type, status, location, category, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const projectValues = [title, type, status, location, category, created_at, updated_at];

    db.query(projectQuery, projectValues, (err, projectResult) => {
      if (err) {
        console.error("Error inserting project:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
      }

      const projectId = projectResult.insertId;

      // Bulk insert images
      const imageValues = req.files.map(file => [projectId, file.filename, created_at, updated_at]);
      const imagesQuery = "INSERT INTO project_images (project_id, image_url, created_at, updated_at) VALUES ?";

      db.query(imagesQuery, [imageValues], (err, imageResult) => {
        if (err) {
          console.error("Error inserting project images:", err);
          return res.status(500).json({ message: "Server error", error: err.message });
        }
        res.status(201).json({ id: projectId, message: "Project created successfully" });
      });
    });
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
const getProjectById = (req, res) => {
  const projectId = req.params.id;
  try {
    const projectQuery = "SELECT * FROM projects WHERE id = ?";
    db.query(projectQuery, [projectId], (err, projects) => {
      if (err) {
        console.error("Error fetching project:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
      }

      if (projects.length === 0) {
        return res.status(404).json({ message: "Project not found" });
      }

      const project = projects[0];
      const imagesQuery = "SELECT * FROM project_images WHERE project_id = ?";
      db.query(imagesQuery, [projectId], (err, images) => {
        if (err) {
          console.error("Error fetching project images:", err);
          return res.status(500).json({ message: "Server error", error: err.message });
        }
        
        project.images = images;
        res.json(project);
      });
    });
  } catch (error) {
    console.error("Error in getProjectById:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a project
const updateProject = (req, res) => {
  try {
    const projectId = req.params.id;
    const { title, type, status, location, category } = req.body;
    
    db.query("SELECT * FROM projects WHERE id = ?", [projectId], (err, results) => {
      if (err) {
        console.error("Error fetching project:", err);
        return res.status(500).json({ message: "Server error" });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Project not found" });
      }

      const updated_at = getNowIST();
      
      const updateQuery = "UPDATE projects SET title = ?, type = ?, status = ?, location = ?, category = ?, updated_at = ? WHERE id = ?";
      const updateValues = [
        title || results[0].title,
        type || results[0].type,
        status || results[0].status,
        location || results[0].location,
        category || results[0].category,
        updated_at,
        projectId
      ];

      db.query(updateQuery, updateValues, (err) => {
        if (err) {
          console.error("Error updating project:", err);
          return res.status(500).json({ message: "Server error" });
        }

        // Handle image replacement if new images are provided
        if (req.files && req.files.length > 0) {
          db.query("DELETE FROM project_images WHERE project_id = ?", [projectId], (err) => {
            if (err) {
              console.error("Error deleting old images:", err);
              return res.status(500).json({ message: "Server error while updating images" });
            }

            const created_at = getNowIST(); // or re-use existing
            const imageValues = req.files.map(file => [projectId, file.filename, created_at, created_at]);
            const imagesQuery = "INSERT INTO project_images (project_id, image_url, created_at, updated_at) VALUES ?";

            db.query(imagesQuery, [imageValues], (err) => {
              if (err) {
                console.error("Error inserting new images:", err);
                return res.status(500).json({ message: "Server error while inserting new images" });
              }
              return res.json({ id: projectId, message: "Project updated successfully with new images" });
            });
          });
        } else {
          return res.json({ id: projectId, message: "Project updated successfully" });
        }
      });
    });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a project
const deleteProject = (req, res) => {
  try {
    const projectId = req.params.id;
    // project_images will be deleted automatically due to ON DELETE CASCADE
    db.query("DELETE FROM projects WHERE id = ?", [projectId], (err, result) => {
      if (err) {
        console.error("Error deleting project:", err);
        return res.status(500).json({ message: "Server error" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json({ message: "Project deleted successfully" });
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
