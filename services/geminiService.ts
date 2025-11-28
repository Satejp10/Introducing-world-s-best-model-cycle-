import { GoogleGenAI } from "@google/genai";
import { ModelEvent } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateSotaCommentary = async (
  currentModel: ModelEvent,
  previousModel: ModelEvent | undefined
): Promise<string> => {
  try {
    const prompt = `
      You are a cynical, hyper-online "Tech Twitter" influencer in late 2025.
      
      Current situation:
      The current SOTA (State of the Art) AI model is ${currentModel.model} by ${currentModel.company}.
      It has been in power since ${currentModel.date}.
      Key stats: ${JSON.stringify(currentModel.stats)}.
      
      Previous champion (just dethroned): ${previousModel ? previousModel.model : "Unknown"}.
      
      Task:
      Write a short, punchy, slightly snarky tweet-style commentary (max 280 chars) about why ${currentModel.model} is currently winning the "Vibes War". 
      Reference specific technical details but mock how quickly things change. 
      Use slang like "we are so back", "it's over", "AGI achieved", etc.
      
      Do NOT include hashtags. Do NOT use emojis excessively.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.9,
      }
    });

    return response.text || "Computing vibes... (Gemini is thinking)";
  } catch (error) {
    console.error("Failed to generate commentary:", error);
    return "Error: The vibes are too powerful. Commentary unavailable.";
  }
};
