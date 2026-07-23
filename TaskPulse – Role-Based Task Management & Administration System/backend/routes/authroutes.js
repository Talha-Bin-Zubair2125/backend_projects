const express = require('express');
const router = express.Router();
const {login_user,register_user,get_profile} = require('../controllers/authcontroller');
const {protect} = require('../middleware/authmiddleware');

router.get('/',(req,res)=>{
    res.send("Hey! There")
});


router.post('/register',register_user);
router.post('/login',login_user);
router.get('/getuser',protect,get_profile);

module.exports = router;