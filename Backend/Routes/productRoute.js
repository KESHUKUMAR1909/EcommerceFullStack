const express = require('express');
const { getAllProducts, createproduct, updateProduct, deleteProduct, getSingleProduct } = require('../Controllers/productController.js');
const router = express.Router();
router.get("/products",getAllProducts);
router.post('/products/new',createproduct);
router.put('/products/:id',updateProduct);
router.delete('/products/:id',deleteProduct);
router.get('/products/:id',getSingleProduct);
module.exports=router;