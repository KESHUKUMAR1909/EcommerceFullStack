const express = require('express');
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require('../Controllers/orderController.js');
const router = express.Router();
const {isAuthenticatedUser, authorizeRoles} = require('../Middleware/auth.js')
router.post('/order/new' , isAuthenticatedUser , newOrder)
router.route('/order/:id').get(isAuthenticatedUser  , getSingleOrder);
router.route('/orders/me').get(isAuthenticatedUser , myOrders);
router.route('/admin/orders').get(isAuthenticatedUser , authorizeRoles('admin') , getAllOrders);
router.route('/admin/order/:id').put(isAuthenticatedUser ,authorizeRoles('admin') , updateOrder ).delete(isAuthenticatedUser  , authorizeRoles('admin') , deleteOrder);

module.exports =router;