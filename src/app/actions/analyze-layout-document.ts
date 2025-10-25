"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export interface LayoutOCRResult {
  plot_no: string | null
  plot_size_sq_yd: number | null
  facing: string | null
  location: string | null
  autofill_confidence: number
  needs_manual_input: boolean
}

export async function analyzeLayoutDocument(imageBase64: string, filename: string): Promise<LayoutOCRResult | null> {
  try {
    console.log("[v0] Starting simplified layout document analysis...")

    const prompt = `You are "Srini Realty – Quick Layout OCR."

TASK
Read the uploaded property layout/schedule image and extract ONLY these 4 fields:
1. Plot Number
2. Plot Size (in Sq. Yards)
3. Facing Direction
4. Location (Village, Mandal, District combined)

OUTPUT
Return ONLY a single JSON object. No prose, no markdown.

SCHEMA
{
  "plot_no": string | null,                    // e.g., "481" or "148/6/1"
  "plot_size_sq_yd": number | null,            // e.g., 167
  "facing": string | null,                     // one of: "N","S","E","W","NE","NW","SE","SW"
  "location": string | null,                   // e.g., "Thimmapur Village, Kandukur Mandal, Ranga Reddy District"
  "autofill_confidence": number,               // 0.0–1.0
  "needs_manual_input": boolean                // true if any field is null OR confidence < 0.7
}

RULES
- Read only from the image. Never guess or hallucinate.
- Plot size: If given in Sq.Mtrs, convert to Sq.Yards (1 sq.yd = 0.836127 sq.m).
- Facing: Look for compass/arrow with "N" or infer from which side the road touches.
- Location: Combine Village + Mandal + District into one string. If any part is missing, use what's available.
- Confidence: Start at 1.0, reduce for unclear text or missing fields.
- If document is unreadable, set fields to null and needs_manual_input to true.

Now process the image and return the JSON.`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            {
              type: "image",
              image: imageBase64,
            },
          ],
        },
      ],
      temperature: 0.1,
    })

    console.log("[v0] AI response received:", text.substring(0, 200))

    const result: LayoutOCRResult = JSON.parse(text)

    console.log("[v0] Simplified layout analysis completed. Confidence:", result.autofill_confidence)

    return result
  } catch (error) {
    console.error("[v0] Layout document analysis error:", error)
    return null
  }
}
