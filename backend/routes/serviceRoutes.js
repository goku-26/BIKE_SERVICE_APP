const express = require('express');
const router = express.Router();

// Import the controller functions
const {
  getAllServices,
  createService,
  deleteService
} = require('../controllers/serviceController');

// GET all services (for customers to view service options)
router.get('/', getAllServices);

// POST a new service (for owners/admins to add services)
router.post('/', createService);

// DELETE a service by ID (for owners/admins to remove a service)
router.delete('/:id', deleteService);

module.exports = router;
