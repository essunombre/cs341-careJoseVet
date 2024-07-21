const express = require("express");
const router = express.Router();
const ownerController = require('../controllers/owners')
const validation = require('../middleware/validate')

const { isAuthenticated } = require('../middleware/authenticate')

// Get
router.get("/", ownerController.getAll);
router.get("/:id", isAuthenticated, ownerController.getById);
// Create
router.post("/", isAuthenticated, validation.saveOwner, ownerController.createOwner);
// Update
router.put("/:id", isAuthenticated, validation.saveOwner, ownerController.updateOwner);
// Delete
router.delete("/:id", isAuthenticated, ownerController.deleteOwner)

module.exports = router