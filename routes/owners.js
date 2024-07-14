const express = require("express");
const router = express.Router();
const ownerController = require('../controllers/owners')
// Get
router.get("/", ownerController.getAll);
router.get("/:id", ownerController.getById);
// Create
router.post("/", ownerController.createOwner);
// Update
router.put("/:id", ownerController.updateOwner);
// Delete
router.delete("/:id", ownerController.deleteOwner)

module.exports = router