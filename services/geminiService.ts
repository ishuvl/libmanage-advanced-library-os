
import { GoogleGenAI } from "@google/genai";

// Check if API key is available
const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;

// Only initialize Gemini if API key is available
let ai: GoogleGenAI | null = null;
if (apiKey && apiKey !== 'undefined' && apiKey.length > 10) {
  try {
    ai = new GoogleGenAI({ apiKey });
  } catch (error) {
    console.warn("Failed to initialize Gemini AI:", error);
  }
}

export async function getBookInsights(bookTitle: string, author: string): Promise<string> {
  // If Gemini is not available, return a fallback message
  if (!ai) {
    return `《${bookTitle}》是${author}创作的一部作品。这本书以其独特的叙事风格和深刻的主题思想著称。建议读者亲自阅读，体验作品的魅力。`;
  }

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
    return `《${bookTitle}》是${author}的代表作之一。由于 AI 服务暂时不可用，无法提供详细分析。`;
  }
}
