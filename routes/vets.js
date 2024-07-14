const express = require("express");
const router = express.Router();
const vetController = require('../controllers/vets')
// Get
router.get("/", vetController.getAll);
router.get("/:id", vetController.getById);
// Create
router.post("/", vetController.createVet);
// Update
router.put("/:id", vetController.updateVet);
// Delete
router.delete("/:id", vetController.deleteVet)

module.exports = router