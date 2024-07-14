const express = require("express");
const router = express.Router();
const petController = require('../controllers/pets')
// Get
router.get("/", petController.getAll);
router.get("/:id", petController.getById);
// Create
router.post("/", petController.createPet);
// Update
router.put("/:id", petController.updatePet);
// Delete
router.delete("/:id", petController.deletePet)

module.exports = router