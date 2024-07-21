const express = require("express");
const router = express.Router();
const hospitalController = require('../controllers/hospitals')
const validation = require('../middleware/validate')

const { isAuthenticated } = require('../middleware/authenticate')

// Get
router.get("/", hospitalController.getAll);
router.get("/:id", isAuthenticated, hospitalController.getById);
// Create
router.post("/", isAuthenticated, validation.saveHospital, hospitalController.createHospital);
// Update
router.put("/:id", isAuthenticated, validation.saveHospital, hospitalController.updateHospital);
// Delete
router.delete("/:id", isAuthenticated, hospitalController.deleteHospital)

module.exports = router