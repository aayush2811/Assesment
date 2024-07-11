const express = require('express');
const router = express.Router();
const customerController = require('../controller/customerController');


router.get('/customers', customerController.getCustomers);
router.get('/customers/:id', customerController.getCustomerById);
router.get('/cities', customerController.getCities);
router.post('/customers', customerController.addCustomer);
module.exports = router;