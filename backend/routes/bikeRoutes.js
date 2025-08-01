// routes/bikeRoutes.js

const express = require('express');
const router = express.Router();
const {
  getBrands,
  getModelsByBrand
} = require('../controllers/bikeController');

router.get('/brands', getBrands); // GET /api/bikes/brands
router.get('/models/:brand', getModelsByBrand); // GET /api/bikes/models/Yamaha

module.exports = router;
