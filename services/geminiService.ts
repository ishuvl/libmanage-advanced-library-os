
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini with direct process.env.API_KEY access as required by guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getBookInsights(bookTitle: string, author: string): Promise<string> {
  try {
    // Use gemini-3-flash-preview for basic text analysis tasks
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a short, 3-sentence literary analysis and a key takeaway for the book "${bookTitle}" by ${author} in Chinese.`,
    });
    
    // Use the .text property directly to extract string output from response
    return response.text || "No insights found for this book.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Failed to fetch AI insights.";
  }
}
