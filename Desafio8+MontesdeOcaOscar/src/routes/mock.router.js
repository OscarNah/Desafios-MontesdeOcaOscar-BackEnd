const express = require("express");
const router = express.Router(); 
const MockController = require("../controllers/mock.controller.js");
const mockController = new MockController();

router.get('/mockingproducts', mockController.getProducts);

module.exports = router;