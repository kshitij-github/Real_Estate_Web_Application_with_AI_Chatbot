import asyncHandler from "express-async-handler";

import { prisma } from "../config/prismaConfig.js";

app.post('/api/chatbot', async (req, res) => {
    const { question } = req.body;
    try {
      // Generate AI-based response here using LLM (such as OpenAI API or LangChain)
      const response = await generateAIResponse(question);
  
      // Example: Fetch data from MongoDB (Prisma) based on the question
      if (question.includes('property in')) {
        const city = question.split('property in ')[1];
        const residencies = await prisma.residency.findMany({
          where: { city },
        });
        res.json({ answer: `Properties in ${city}: ${JSON.stringify(residencies)}` });
      } else {
        res.json({ answer: response });
      }
    } catch (err) {
      res.status(500).json({ error: 'Error in AI chatbot response' });
    }
  });
  