import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const generateFinancialInsight = async (prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "You are a high-end financial advisor for a wealth management platform called Aurum. Your tone is professional, sophisticated, and concise. Provide strategic financial advice based on the user's query.",
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I apologize, but I am unable to provide strategic insights at this moment. Please try again later.";
  }
};
