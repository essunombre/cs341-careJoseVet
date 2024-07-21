const express = require("express");
const router = express.Router();
const hospitalController = require('../controllers/hospitals')
const validation = require('../middleware/validate')

// Get
router.get("/", hospitalController.getAll);
router.get("/:id", hospitalController.getById);
// Create
router.post("/", validation.saveHospital, hospitalController.createHospital);
// Update
router.put("/:id", validation.saveHospital, hospitalController.updateHospital);
// Delete
router.delete("/:id", hospitalController.deleteHospital)

module.exports = router