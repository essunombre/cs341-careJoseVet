const express = require("express");
const router = express.Router();
const hospitalController = require('../controllers/hospitals')
// Get
router.get("/", hospitalController.getAll);
router.get("/:id", hospitalController.getById);
// Create
router.post("/", hospitalController.createHospital);
// Update
router.put("/:id", hospitalController.updateHospital);
// Delete
router.delete("/:id", hospitalController.deleteHospital)

module.exports = router