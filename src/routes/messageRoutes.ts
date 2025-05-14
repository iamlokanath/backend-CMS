import { Router } from 'express';
import { generatePersonalizedMessage } from '../controllers/messageController';

const router = Router();

router.post('/', generatePersonalizedMessage);

export default router; 