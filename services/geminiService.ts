
import { GoogleGenAI, Type } from "@google/genai";
import { StyleAnalysis, Gender } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeStyle = async (imageBase64: string, gender: Gender): Promise<StyleAnalysis> => {
  const model = 'gemini-3-flash-preview';
  
  const prompt = `
    Analyze this user's photo to provide personalized fashion styling recommendations based on 2026 fashion trends.
    1. Detect skin tone category (Fair, Medium, Olive, Deep) and provide a representative hex color.
    2. Suggest specific outfits for Formal, Business, Casual, and Party occasions tailored for a ${gender} person, incorporating futuristic and upcoming 2026 style aesthetics.
    3. Suggest hairstyles and maintenance tips that are trending for 2026.
    4. Provide a color palette (Primary, Secondary, Accent) reflecting the 2026 forecasted palettes.
    5. Explain why these choices complement their skin tone and fit the 2026 trend landscape.
    6. Suggest 5 curated shopping items from Indian retailers (Myntra, Amazon.in, Zara) with placeholder search-based URLs.
    
    Return the response strictly as JSON.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: [
      {
        parts: [
          { inlineData: { data: imageBase64, mimeType: 'image/jpeg' } },
          { text: prompt }
        ]
      }
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          skinTone: {
            type: Type.OBJECT,
            properties: {
              category: { type: Type.STRING },
              description: { type: Type.STRING },
              hex: { type: Type.STRING }
            },
            required: ["category", "description", "hex"]
          },
          recommendations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                occasion: { type: Type.STRING },
                outfit: {
                  type: Type.OBJECT,
                  properties: {
                    top: { type: Type.STRING },
                    bottom: { type: Type.STRING },
                    shoes: { type: Type.STRING }
                  },
                  required: ["top", "bottom", "shoes"]
                },
                accessories: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                hairstyle: { type: Type.STRING },
                maintenanceTip: { type: Type.STRING }
              },
              required: ["occasion", "outfit", "accessories", "hairstyle", "maintenanceTip"]
            }
          },
          colorPalette: {
            type: Type.OBJECT,
            properties: {
              primary: { type: Type.STRING },
              secondary: { type: Type.STRING },
              accent: { type: Type.STRING }
            },
            required: ["primary", "secondary", "accent"]
          },
          reasoning: { type: Type.STRING },
          shoppingLinks: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                product: { type: Type.STRING },
                retailer: { type: Type.STRING },
                url: { type: Type.STRING }
              },
              required: ["product", "retailer", "url"]
            }
          }
        },
        required: ["skinTone", "recommendations", "colorPalette", "reasoning", "shoppingLinks"]
      }
    }
  });

  if (!response.text) throw new Error("Failed to get response from AI");
  
  try {
    return JSON.parse(response.text.trim());
  } catch (e) {
    console.error("JSON parse error:", e, response.text);
    throw new Error("Invalid response format from AI");
  }
};
