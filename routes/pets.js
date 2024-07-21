const express = require("express");
const router = express.Router();
const petController = require('../controllers/pets')
const validation = require('../middleware/validate')

const { isAuthenticated } = require('../middleware/authenticate')

// Get
router.get("/", petController.getAll);
router.get("/:id", isAuthenticated, petController.getById);
// Create
router.post("/", isAuthenticated, validation.savePet, petController.createPet);
// Update
router.put("/:id", isAuthenticated, validation.savePet, petController.updatePet);
// Delete
router.delete("/:id", isAuthenticated, petController.deletePet)

module.exports = router