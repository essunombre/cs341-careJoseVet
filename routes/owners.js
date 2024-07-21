const express = require("express");
const router = express.Router();
const ownerController = require('../controllers/owners')
const validation = require('../middleware/validate')

// Get
router.get("/", ownerController.getAll);
router.get("/:id", ownerController.getById);
// Create
router.post("/", validation.saveOwner, ownerController.createOwner);
// Update
router.put("/:id", validation.saveOwner, ownerController.updateOwner);
// Delete
router.delete("/:id", ownerController.deleteOwner)

module.exports = router