
import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const PROMPT = `Analyze the people in this photo and creatively edit it with a strong Miami Dolphins fan theme. 
1. Make the people in the photo appear to be wearing Miami Dolphins merchandise. This could include jerseys (with modern designs), hats, t-shirts, or scarves. Use the team's official aqua and orange colors. 
2. Add the likeness of Miami Dolphins QB Tua Tagovailoa standing next to the people in a friendly, celebratory pose. He should also be in Dolphins gear. 
3. Ensure the edits are well-integrated, matching the lighting, shadows, and overall style of the original photo to look as realistic as possible. 
4. The final image should be a fun, high-energy fan photo. Do not add any text or logos over the image.
5. Change the background of the original image so that it appears to have been taken outside the Miami Dolphins stadium.
`;

export const editImageWithDolphinsTheme = async (base64ImageData: string, mimeType: string): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64ImageData,
              mimeType: mimeType,
            },
          },
          {
            text: PROMPT,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });
    
    // Safely access the response parts to find the image data.
    const imagePart = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);

    if (imagePart && imagePart.inlineData) {
      return imagePart.inlineData.data;
    }

    // If no image is found, the model might have responded with text (e.g., a safety refusal).
    // The .text accessor provides a convenient way to get the full text response.
    if (response.text) {
      throw new Error(`The model responded with a message instead of an image: ${response.text}`);
    }
    
    return null; // No image part found and no text fallback.
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // Re-throw the error so the UI component can handle it.
    if (error instanceof Error) {
        throw error;
    }
    throw new Error("An unknown error occurred while communicating with the AI.");
  }
};
