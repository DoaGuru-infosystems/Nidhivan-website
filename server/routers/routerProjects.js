const express = require("express");
const router = express.Router();
const projectController = require("../controllers/controllerProjects");

router.get("/allProjects", projectController.getAllProjects);
router.get("/getProject/:id", projectController.getProjectById);

router.post(
  "/admin-create",
  projectController.upload.array("images", 10),
  projectController.createProject
);

router.put(
  "/adminUpdateProject/:id",
  projectController.upload.array("images", 10),
  projectController.updateProject
);

router.delete("/deleteByAdmin/:id", projectController.deleteProject);

module.exports = router;
