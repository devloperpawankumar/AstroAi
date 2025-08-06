const express = require('express');
const router = express.Router();
const { updateDetails, getDetail, updateSignupDetails, login, updateUserDetails } = require('../controllers/userController');

router.put('/details/:id', updateDetails); // pass token in frontend
router.put('/userdetail/:id', updateUserDetails); // pass token in frontend
router.get('/details/:id', getDetail); // pass token in frontend
router.put('/signup/:id', updateSignupDetails); // pass token in frontend
router.post('/login', login); // pass token in frontend

module.exports = router;
