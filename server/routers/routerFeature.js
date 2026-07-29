const express = require("express");
const upload = require("../Middleware/multerConfig");
const {
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
} = require("../controllers/controllerFeature");

const router = express.Router();

// Gallery Category Routes
router.post("/gallery-categories", upload.single("thumbnail_image"), createGalleryCategory);
router.get("/gallery-categories", getAllGalleryCategories);
router.get("/gallery-categories/:id", getGalleryCategoryById);
router.put("/gallery-categories/:id", upload.single("thumbnail_image"), updateGalleryCategory);
router.delete("/gallery-categories/:id", deleteGalleryCategory);

// Gallery Image Routes
router.post("/gallery-images", upload.array("images", 50), createGalleryImage);
router.get("/gallery-images", getAllGalleryImages);
router.get("/gallery-images/category/:category_id", getGalleryImagesByCategoryId);
router.get("/gallery-images/:id", getGalleryImageById);
router.put("/gallery-images/:id", upload.array("images", 1), updateGalleryImage);
router.delete("/gallery-images/:id", deleteGalleryImage);

module.exports = router;
