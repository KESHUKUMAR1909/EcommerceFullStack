const express = require('express');
const { getAllProducts, createproduct, updateProduct, deleteProduct, getSingleProduct } = require('../Controllers/productController.js');
const { isAuthenticatedUser  , authorizeRoles
} = require('../Middleware/auth.js');
const router = express.Router();
router.get("/products",isAuthenticatedUser , authorizeRoles("admin"),getAllProducts);
router.post('/products/new',isAuthenticatedUser ,authorizeRoles("admin"),createproduct);
router.put('/products/:id',isAuthenticatedUser ,authorizeRoles("admin") , updateProduct);
router.delete('/products/:id',isAuthenticatedUser ,authorizeRoles("admin") ,deleteProduct);
router.get('/products/:id',isAuthenticatedUser ,authorizeRoles("admin") , getSingleProduct);
module.exports=router;