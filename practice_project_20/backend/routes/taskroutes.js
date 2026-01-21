const express = require('express');
const router = express.Router();
const {createtask,gettask,totalusers} = require('../controllers/taskcontroller');
const {adminOnly} = require('../middleware/admin_middleware');
const { protect } = require('../middleware/authmiddleware'); 

router.post('/createtask', protect, adminOnly, createtask);
router.get('/getusers', protect, adminOnly, totalusers);
router.get('/gettasks', protect, adminOnly, gettask);

module.exports = router;