const express = require('express');
const router = express.Router();
const {
  getBrands,
  getModelsByBrand
} = require('../controllers/bikeController');

router.get('/brands', getBrands); 
router.get('/models/:brand', getModelsByBrand); 

module.exports = router;
