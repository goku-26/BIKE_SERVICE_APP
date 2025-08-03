const express = require('express');
const router = express.Router();


const {
  getAllServices,
  createService,
  deleteService
} = require('../controllers/serviceController');


router.get('/', getAllServices);


router.post('/', createService);


router.delete('/:id', deleteService);

module.exports = router;
