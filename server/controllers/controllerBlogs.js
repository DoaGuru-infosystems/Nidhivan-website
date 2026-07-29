const multer = require("multer");
const path = require("path");
const fs = require("fs");
const slugify = require("slugify");
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
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase(),
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Images only!");
    }
  },
});

// Controllers for Blogs
const getAllBlogs = (req, res) => {
  try {
    db.query(
      "SELECT id, title, slug, content, image_url, published_date FROM blogs WHERE is_published = 1 ORDER BY published_date DESC",
      (err, rows) => {
        if (err) {
          console.error("Error fetching blogs:", err);
          return res
            .status(500)
            .json({ message: "Server error", error: err.message });
        }
        // Strip HTML tags and create a clean 200-char excerpt
        const processed = rows.map((row) => {
          const plainText = row.content
            .replace(/<[^>]*>/g, " ")
            .replace(/\s+/g, " ")
            .trim();
          return {
            id: row.id,
            title: row.title,
            slug: row.slug,
            image_url: row.image_url,
            published_date: row.published_date,
            excerpt:
              plainText.length > 200
                ? plainText.substring(0, 200) + "..."
                : plainText,
          };
        });
        res.json(processed);
      },
    );
  } catch (error) {
    console.error("Error in getAllBlogs function:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllBlogsForAdmin = (req, res) => {
  try {
    db.query("SELECT * FROM blogs ", (err, rows) => {
      if (err) {
        console.error("Error fetching blogs:", err);
        return res
          .status(500)
          .json({ message: "Server error", error: err.message });
      }
      res.json(rows);
    });
  } catch (error) {
    console.error("Error in getAllBlogs function:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getSingleBlog = (req, res) => {
  try {
    db.query(
      "SELECT * FROM blogs WHERE slug = ? AND is_published = 1",
      [req.params.slug],
      (err, rows) => {
        if (err) {
          console.error("Error fetching blog:", err);
          return res
            .status(500)
            .json({ message: "Server error", error: err.message });
        }

        if (rows.length === 0) {
          return res.status(404).json({ message: "Blog not found" });
        }

        res.json(rows[0]); // First blog object return karega
      },
    );
  } catch (error) {
    console.error("Error in getSingleBlog function:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const createBlog = (req, res) => {
  try {
    const { title, meta_title, content, meta_description, meta_keywords } = req.body;
    console.log(req.body);

    const is_published = req.body.is_published === "true" ? 1 : 0;

    // Create SEO-friendly slug
    let slug = slugify(title, { lower: true, strict: true });

    // Check if slug exists, if so append a number
    db.query(
      "SELECT slug FROM blogs WHERE slug LIKE ?",
      [`${slug}%`],
      (err, existingSlugs) => {
        if (err) {
          console.error("Error fetching existing slugs:", err);
          return res
            .status(500)
            .json({ message: "Database error", error: err.message });
        }

        if (existingSlugs.length > 0) {
          slug = `${slug}-${existingSlugs.length + 1}`;
        }

        const imageUrl = req.file ? req.file.filename : null;
        const published_date = getNowIST();
        const updated_date = published_date;

        // Insert new blog
        db.query(
          "INSERT INTO blogs (title, meta_title, slug, content, image_url, meta_description, meta_keywords, is_published, published_date, updated_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            title,
            meta_title,
            slug,
            content,
            imageUrl,
            meta_description,
            meta_keywords,
            is_published,
            published_date,
            updated_date
          ],
          (insertErr, result) => {
            if (insertErr) {
              console.error("Error inserting blog:", insertErr);
              return res
                .status(500)
                .json({ message: "Server error", error: insertErr.message });
            }

            res.status(201).json({
              id: result.insertId,
              slug,
              message: "Blog created successfully",
            });
          },
        );
      },
    );
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getBlogById = (req, res) => {
  const blogId = req.params.id;
  console.log(blogId);

  db.query("SELECT * FROM blogs WHERE id = ?", [blogId], (err, results) => {
    if (err) {
      console.error("Error fetching blog:", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(results[0]);
  });
};

const updateBlog = (req, res) => {
  try {
    const { title, meta_title, content, meta_description, meta_keywords } = req.body;
    const blogId = req.params.id;

    const is_published = req.body.is_published === "true" ? 1 : 0;
    console.log(is_published);

    db.query("SELECT * FROM blogs WHERE id = ?", [blogId], (err, results) => {
      if (err) {
        console.error("Error fetching blog:", err);
        return res.status(500).json({ message: "Server error" });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Blog not found" });
      }

      let slug = results[0].slug;
      let shouldUpdateSlug = false;

      if (title && title !== results[0].title) {
        slug = slugify(title, { lower: true, strict: true });
        shouldUpdateSlug = true;
      }

      let imageUrl = results[0].image_url;
      if (req.file) {
        imageUrl = req.file.filename;
      }

      const updated_date = getNowIST();

      const updateQuery = `
        UPDATE blogs 
        SET title = ?, meta_title = ?, slug = ?, content = ?, image_url = ?, meta_description = ?, meta_keywords = ?, is_published = ?, updated_date = ? 
        WHERE id = ?
      `;

      const updateValues = [
        title || results[0].title,
        meta_title !== undefined ? meta_title : results[0].meta_title,
        slug,
        content || results[0].content,
        imageUrl,
        meta_description !== undefined ? meta_description : results[0].meta_description,
        meta_keywords !== undefined ? meta_keywords : results[0].meta_keywords,
        is_published,
        updated_date,
        blogId,
      ];

      db.query(updateQuery, updateValues, (err) => {
        if (err) {
          console.error("Error updating blog:", err);
          return res.status(500).json({ message: "Server error" });
        }
        res.json({ id: blogId, slug, message: "Blog updated successfully" });
      });
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteBlog = (req, res) => {
  try {
    const blogId = req.params.id;
    db.query("DELETE FROM blogs WHERE id = ?", [blogId], (err, result) => {
      if (err) {
        console.error("Error deleting blog:", err);
        return res.status(500).json({ message: "Server error" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Blog not found" });
      }
      res.json({ message: "Blog deleted successfully" });
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Exporting all controllers
module.exports = {
  getAllBlogs,
  getSingleBlog,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
  upload,
  getAllBlogsForAdmin,
};
