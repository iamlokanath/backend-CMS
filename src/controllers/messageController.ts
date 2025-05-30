import { Request, Response } from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

// Debug: Check if API key is loaded
const apiKey = process.env.OPENAI_API_KEY;
console.log('API Key loaded:', apiKey ? 'Yes' : 'No');
console.log('API Key first 10 chars:', apiKey ? apiKey.substring(0, 10) + '...' : 'Not found');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Fallback message generator
const generateFallbackMessage = (name: string, job_title: string, company: string) => {
  return `Hi ${name},

I noticed your impressive role as ${job_title} at ${company}. Our Campaign Manager platform can help streamline your outreach efforts and boost your team's productivity.

Would you be interested in a quick chat about how we can help automate your sales outreach process?

Best regards,
Lokanath Panda,
Campaign Manager`;
};

export const generatePersonalizedMessage = async (req: Request, res: Response) => {
  try {
    const { name, job_title, company, location, summary } = req.body;

    // Debug: Log the request data
    console.log('Received request data:', { name, job_title, company, location, summary });

    try {
      // Create a prompt for the AI
      const prompt = `Generate a personalized outreach message for a sales campaign with the following details:
      Name: ${name}
      Job Title: ${job_title}
      Company: ${company}
      Location: ${location}
      Summary: ${summary}
      
      The message should be professional, personalized, and focused on how our Campaign Manager can help automate their outreach to increase meetings and sales. Keep it concise and engaging.`;

      // Debug: Log the prompt
      console.log('Generated prompt:', prompt);

      // Generate message using OpenAI
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are a professional sales outreach specialist who creates personalized messages for potential clients."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        model: "gpt-3.5-turbo",
        temperature: 0.7,
        max_tokens: 150
      });

      const message = completion.choices[0].message.content;

      if (!message) {
        throw new Error('Failed to generate message');
      }

      // Debug: Log the generated message
      console.log('Generated message:', message);

      res.json({ message });
    } catch (apiError) {
      console.log('OpenAI API error, using fallback message generator');
      const fallbackMessage = generateFallbackMessage(name, job_title, company);
      console.log('Generated fallback message:', fallbackMessage);
      res.json({ 
        message: fallbackMessage,
        note: 'Generated using fallback template due to API quota limits'
      });
    }
  } catch (err) {
    console.error('Error generating message:', err);
    res.status(500).json({ 
      error: 'Failed to generate personalized message',
      details: err instanceof Error ? err.message : 'Unknown error'
    });
  }
}; 