const express = require('express');
const router = express.Router();
const userController = require('../controllers/Auth');

// Register route
router.post('/register', userController.register);

// Login route
router.post('/login', userController.login);
// get user
router.get('/get-info', userController.getUser);
//moeZ@00%
// edite user route
router.patch('/edit-informations/:id', userController.updateUserById);
// edite password 
router.put('/edit-password/:id', userController.EditPwd);

module.exports = router;