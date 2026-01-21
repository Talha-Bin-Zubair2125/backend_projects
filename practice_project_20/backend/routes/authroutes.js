const express = require('express');
const router = express.Router();
const {login_user,register_user,get_profile} = require('../controllers/authcontroller');
const {protect} = require('../middleware/authmiddleware');
// Default Route -- For Verification of Path
router.get('/',(req,res)=>{
    res.send("Hey! There")
});

// Register Route
router.post('/register',register_user);
// Login Route 
router.post('/login',login_user);
// Get User
router.get('/getuser',protect,get_profile);

module.exports = router;