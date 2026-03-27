
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const getPriceSuggestion = async (cropName: string, quantity: number, unit: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a realistic fair market price suggestion in INR for ${quantity} ${unit} of ${cropName} in the current Indian agricultural market. Return only the number.`,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    const priceStr = response.text?.trim() || "0";
    return parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 500;
  } catch (error) {
    console.error("Gemini Error:", error);
    return 500;
  }
};

export const translateText = async (text: string, targetLang: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Translate the following text to ${targetLang}. Preserve tone. Text: "${text}"`,
      config: { thinkingConfig: { thinkingBudget: 0 } }
    });
    return response.text?.trim() || text;
  } catch (error) {
    return text;
  }
};

export const agroBotChat = async (message: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: "You are AgroBot, a helpful assistant for the FARMIO platform. You help farmers with crop prices, weather advice, and how to use the app. Keep it professional, encouraging, and agricultural-focused.",
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text?.trim() || "I'm having trouble connecting to my farm wisdom. Try again!";
  } catch (error) {
    return "Something went wrong. I'm taking a short break!";
  }
};
