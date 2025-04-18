const express = require('express');
const { getAllProducts, createproduct, updateProduct, deleteProduct, getSingleProduct, createProductReview, getProductReviews, deleteReview, getProductDetails } = require('../Controllers/productController.js');
const { isAuthenticatedUser  , authorizeRoles
} = require('../Middleware/auth.js');
const router = express.Router();
router.get("/products",/*isAuthenticatedUser , authorizeRoles("admin"),*/getAllProducts);
router.post('/admin/products/new',isAuthenticatedUser ,authorizeRoles("admin"),createproduct);
router.put('/admin/products/:id',isAuthenticatedUser ,authorizeRoles("admin") , updateProduct);
router.delete('/admin/products/:id',isAuthenticatedUser ,authorizeRoles("admin") ,deleteProduct);
router.get('/products/:id',isAuthenticatedUser ,authorizeRoles("admin") , getProductDetails);
router.route('/review').put(isAuthenticatedUser , createProductReview);
router.route('/reviews').get(getProductReviews);
router.route("/reviews/:productId").delete(isAuthenticatedUser, deleteReview);
module.exports=router;