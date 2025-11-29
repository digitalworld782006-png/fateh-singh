import { GoogleGenAI } from "@google/genai";
import { BlogPost } from "../types";

export const generateBlogContent = async (topic: string): Promise<Partial<BlogPost>> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    You are an expert financial analyst and professional trader working for "TradeNexus". 
    Your task is to write a high-quality, SEO-optimized trading blog post about: "${topic}".
    
    CRITICAL REQUIREMENTS:
    1. **Niche Focus**: Focus strictly on Trading, Technical Analysis, Price Action, or Market News (Forex, Crypto, Stocks).
    2. **Real-time Data**: Use the Google Search tool to find the absolute latest price data, news, and sentiment for the topic.
    3. **Technical Analysis**: Include specific support/resistance levels, chart patterns (Head & Shoulders, Flags, etc.), and RSI/MACD indicators if relevant.
    4. **"Trade Maven" Integration**: You MUST naturally mention the "Trade Maven" YouTube channel at least once in the content as a resource for more video analysis.
    5. **Structure**: The content field must use Markdown formatting (# Headers, ## Subheaders, bullet points).
    6. **Tone**: Professional, analytical, yet accessible.
    
    OUTPUT FORMAT:
    Return ONLY a raw valid JSON object. Do not wrap it in markdown code blocks.
    
    JSON Schema:
    {
      "title": "A catchy, SEO-friendly headline",
      "excerpt": "A 2-sentence summary for the blog card",
      "content": "The full blog post in Markdown format. Escape quotes properly.",
      "tags": ["Array", "of", "5", "SEO", "keywords"],
      "category": "One of: Forex, Crypto, Stocks, Technical Analysis"
    }
  `;

  try {
    // FIX: When using tools (googleSearch), we CANNOT use responseMimeType: 'application/json'.
    // We must parse the text response manually.
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        // responseMimeType: 'application/json' // REMOVED to prevent INVALID_ARGUMENT error
      }
    });

    let text = response.text;
    if (!text) throw new Error("No response from AI");

    // Clean up potential markdown code blocks
    text = text.trim();
    // Remove ```json, ```, and trailing ```
    text = text.replace(/^```json\s*/i, '').replace(/^```\s*/, '').replace(/\s*```$/, '');

    let data;
    try {
        data = JSON.parse(text);
    } catch (parseError) {
        console.error("Failed to parse JSON raw text:", text);
        throw new Error("AI returned invalid JSON format. Please try again.");
    }

    // Extract sources from grounding metadata if available
    // This allows us to attribute sources found via Google Search
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks) {
      const sources = chunks
        .map((chunk: any) => chunk.web ? `[${chunk.web.title}](${chunk.web.uri})` : null)
        .filter((s: string | null) => s !== null);
      
      // Append references to the blog content if sources exist
      if (sources.length > 0) {
        data.content += "\n\n---\n### Market Sources & References\n" + sources.map((s: string) => `- ${s}`).join("\n");
      }
    }

    return {
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      tags: data.tags,
      category: data.category as any,
    };
  } catch (error) {
    console.error("Blog Generation Error:", error);
    throw error;
  }
};