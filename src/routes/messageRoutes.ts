import { Router } from 'express';
import { generatePersonalizedMessage } from '../controllers/messageController';

const router = Router();

// Add a GET handler for the root route
router.get('/', (req, res) => {
  res.json({ 
    message: "Personalized Message API",
    usage: "Send a POST request to this endpoint with the following JSON body: { name, job_title, company, location, summary }"
  });
});

// Original POST handler
router.post('/', generatePersonalizedMessage);

export default router;