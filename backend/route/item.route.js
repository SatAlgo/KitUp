import express from 'express';
import { getItem } from '../controller/item.controller.js';

const router = express.Router();

router.get("/", getItem);

export default router;