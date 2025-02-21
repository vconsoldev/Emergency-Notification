import express from 'express';
import {checkBusinessName,sendOtp,getRedisData,verifyOtp} from '../controllers/organization.controller.js';
const router = express.Router();


router.post('/checkBusinessName', checkBusinessName);
router.post('/sendOtp',sendOtp);
router.get('/getRedisData/:key',getRedisData);
router.post('/verifyOtp',verifyOtp);



export default router;