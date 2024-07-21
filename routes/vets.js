const express = require("express");
const router = express.Router();
const vetController = require('../controllers/vets')
const validation = require('../middleware/validate')

const { isAuthenticated } = require('../middleware/authenticate')

// Get
router.get("/", vetController.getAll);
router.get("/:id", isAuthenticated, vetController.getById);
// Create
router.post("/", isAuthenticated, validation.saveVet, vetController.createVet);
// Update
router.put("/:id", isAuthenticated, validation.saveVet, vetController.updateVet);
// Delete
router.delete("/:id", isAuthenticated, vetController.deleteVet)

module.exports = router