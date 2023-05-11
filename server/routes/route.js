import { Router } from 'express';
import adddata from '../controller/adddata.js';
import getdata from '../controller/getdata.js';

const router = Router();

router.get('/addingdata', adddata);
router.get('/:unit',getdata);

export default router;
