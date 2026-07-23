const express = require('express');
const router = express.Router();
const {createtask,gettask,totalusers,gettaskbyid,updatetaskbyid} = require('../controllers/taskcontroller');
const {adminOnly} = require('../middleware/admin_middleware');
const { protect } = require('../middleware/authmiddleware'); 

router.post('/createtask', protect, adminOnly, createtask);
router.put('/updatetask', protect, updatetaskbyid);
router.get('/getusers', protect, adminOnly, totalusers);
router.get('/gettasks', protect, adminOnly, gettask);
router.get('/viewtask', protect, gettaskbyid);


module.exports = router;