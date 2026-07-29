const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { db } = require("../db");
const { getNowIST } = require("../utils/datatime");

const uploadDir = path.join(__dirname, "../public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for image and video uploads
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
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit to handle small videos
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp|mp4|mkv|webm|avi/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase(),
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Images and Videos only!");
    }
  },
});

// Controllers for Testimonials
const getAllTestimonials = (req, res) => {
  try {
    db.query("SELECT * FROM testimonials ORDER BY created_at DESC", (err, rows) => {
      if (err) {
        console.error("Error fetching testimonials:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
      }
      res.json(rows);
    });
  } catch (error) {
    console.error("Error in getAllTestimonials:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getTestimonialById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM testimonials WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Error fetching testimonial:", err);
      return res.status(500).json({ message: "Server error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Testimonial not found" });
    }
    res.json(results[0]);
  });
};

const createTestimonial = (req, res) => {
  try {
    const { name, designation, text_content, youtube_url } = req.body;
    let image_url = req.body.image_url || null;
    let video_url = req.body.video_url || null;

    if (req.files) {
      if (req.files.image_url) {
        image_url = req.files.image_url[0].filename;
      }
      if (req.files.video_url) {
        video_url = req.files.video_url[0].filename;
      }
    }

    const created_at = getNowIST();
    const updated_at = created_at;

    const query = `
      INSERT INTO testimonials 
      (name, designation, text_content, image_url, video_url, youtube_url, created_at, updated_at) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [name, designation, text_content, image_url, video_url, youtube_url, created_at, updated_at];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Error creating testimonial:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
      }
      res.status(201).json({ id: result.insertId, message: "Testimonial created successfully" });
    });
  } catch (error) {
    console.error("Error in createTestimonial:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateTestimonial = (req, res) => {
  try {
    const id = req.params.id;
    const { name, designation, text_content, youtube_url } = req.body;

    db.query("SELECT * FROM testimonials WHERE id = ?", [id], (err, results) => {
      if (err) {
        console.error("Error fetching testimonial:", err);
        return res.status(500).json({ message: "Server error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "Testimonial not found" });
      }

      let image_url = req.body.image_url !== undefined ? req.body.image_url : results[0].image_url;
      let video_url = req.body.video_url !== undefined ? req.body.video_url : results[0].video_url;

      if (req.files) {
        if (req.files.image_url) {
          image_url = req.files.image_url[0].filename;
        }
        if (req.files.video_url) {
          video_url = req.files.video_url[0].filename;
        }
      }

      const updated_at = getNowIST();

      const query = `
        UPDATE testimonials 
        SET name = ?, designation = ?, text_content = ?, image_url = ?, video_url = ?, youtube_url = ?, updated_at = ? 
        WHERE id = ?
      `;
      
      const values = [
        name !== undefined ? name : results[0].name,
        designation !== undefined ? designation : results[0].designation,
        text_content !== undefined ? text_content : results[0].text_content,
        image_url,
        video_url,
        youtube_url !== undefined ? youtube_url : results[0].youtube_url,
        updated_at,
        id
      ];

      db.query(query, values, (err, result) => {
        if (err) {
          console.error("Error updating testimonial:", err);
          return res.status(500).json({ message: "Server error" });
        }
        res.json({ message: "Testimonial updated successfully" });
      });
    });
  } catch (error) {
    console.error("Error in updateTestimonial:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteTestimonial = (req, res) => {
  try {
    const id = req.params.id;
    db.query("DELETE FROM testimonials WHERE id = ?", [id], (err, result) => {
      if (err) {
        console.error("Error deleting testimonial:", err);
        return res.status(500).json({ message: "Server error" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Testimonial not found" });
      }
      res.json({ message: "Testimonial deleted successfully" });
    });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  upload
};
