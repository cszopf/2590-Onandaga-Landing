import { NextResponse } from 'next/server';
import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    
    // Prioritize GEMINI_API_KEY as requested for Vercel deployment
    const rawApiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    const apiKey = rawApiKey?.trim();

    if (!apiKey) {
      console.error('Gemini API key missing. Checked: GEMINI_API_KEY, API_KEY, NEXT_PUBLIC_GEMINI_API_KEY');
      return NextResponse.json({ error: 'Gemini API key not configured' }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Create a timeout promise
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Gemini API request timed out on server (15s)')), 15000)
    );

    // Use gemini-3.1-flash-lite-preview as requested
    const generatePromise = ai.models.generateContent({
      model: "gemini-3.1-flash-lite-preview",
      contents: prompt,
    });

    // Race against the timeout
    const response: any = await Promise.race([generatePromise, timeoutPromise]);
    
    return NextResponse.json({ text: response.text });
  } catch (error: any) {
    console.error('Gemini API error details:', error);
    return NextResponse.json({ 
      error: error.message || 'Failed to generate content',
      details: JSON.stringify(error, Object.getOwnPropertyNames(error))
    }, { status: 500 });
  }
}
