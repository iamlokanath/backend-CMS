import { Request, Response } from 'express';

export const generatePersonalizedMessage = async (req: Request, res: Response) => {
  try {
    const { name, job_title, company, location, summary } = req.body;
    // For now, mock the AI message. Integrate OpenAI or similar later.
    const message = `Hey ${name}, I see you are working as a ${job_title} at ${company}. Outflo can help automate your outreach to increase meetings & sales. Let's connect!`;
    res.json({ message });
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
}; 