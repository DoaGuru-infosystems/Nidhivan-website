const express = require("express");
const router = express.Router();
const blogController = require("../controllers/controllerBlogs");

router.get("/allBlogs", blogController.getAllBlogs);
router.get("/allBlogsForAdmin", blogController.getAllBlogsForAdmin);
router.post(
  "/admin-create",
  blogController.upload.single("image"),
  blogController.createBlog,
);
router.get("/blogGetForEditing/:id", blogController.getBlogById);
router.put(
  "/adminUpdateBlog/:id",
  blogController.upload.single("image"),
  blogController.updateBlog,
);
router.delete("/deleteByAdmin/:id", blogController.deleteBlog);

// Placed at the bottom to prevent it from intercepting other specific GET routes
router.get("/:slug", blogController.getSingleBlog);

module.exports = router;