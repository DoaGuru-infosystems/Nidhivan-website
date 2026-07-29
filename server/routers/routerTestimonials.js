const express = require('express');
const router = express.Router();
const { upload } = require('../controllers/controllerTestimonials');
const controllerTestimonials = require('../controllers/controllerTestimonials');

// Define the fields for file uploads
const uploadFields = upload.fields([
  { name: 'image_url', maxCount: 1 }, 
  { name: 'video_url', maxCount: 1 }
]);

router.get('/getAllTestimonials', controllerTestimonials.getAllTestimonials);
router.get('/getTestimonialById/:id', controllerTestimonials.getTestimonialById);
router.post('/createTestimonial', uploadFields, controllerTestimonials.createTestimonial);
router.put('/updateTestimonial/:id', uploadFields, controllerTestimonials.updateTestimonial);
router.delete('/deleteTestimonial/:id', controllerTestimonials.deleteTestimonial);

module.exports = router;
