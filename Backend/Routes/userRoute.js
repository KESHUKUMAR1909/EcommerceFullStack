const express = require('express');
const { registerUser, loginUser, logout, forgotPassword , resetPassword, getUserDetails, updatePassword, updateUserProfile, getAllUsers, getSingleUser, updateUserRole, deleteUser } = require('../Controllers/userController');
const {isAuthenticatedUser, authorizeRoles} = require('../Middleware/auth.js')
const router = express.Router();
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);    

router.route('/logout').get(logout);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);

router.route('/me').get(isAuthenticatedUser , getUserDetails)
router.route('/password/update').put(isAuthenticatedUser , updatePassword);
router.route('/me').put(isAuthenticatedUser , updateUserProfile);

router.route('/admin/users').get(isAuthenticatedUser,authorizeRoles('admin') , getAllUsers);
router.route('/admin/user/:id').get(isAuthenticatedUser ,authorizeRoles('admin'),getSingleUser).put(isAuthenticatedUser , authorizeRoles('admin') , updateUserRole).delete(isAuthenticatedUser , authorizeRoles('admin') , deleteUser);
module.exports = router;