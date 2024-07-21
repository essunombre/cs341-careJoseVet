const express = require("express");
const router = express.Router();
const vetController = require('../controllers/vets')
const validation = require('../middleware/validate')

// Get
router.get("/", vetController.getAll);
router.get("/:id", vetController.getById);
// Create
router.post("/", validation.saveVet, vetController.createVet);
// Update
router.put("/:id", validation.saveVet, vetController.updateVet);
// Delete
router.delete("/:id", vetController.deleteVet)

module.exports = router