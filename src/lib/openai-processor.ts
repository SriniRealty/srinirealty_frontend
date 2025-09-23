import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

export interface ProcessingResult {
  cleanedData: Record<string, any>
  analysis: string
  confidenceScore: number
}

export async function processSubmission(
  rawData: Record<string, any>,
  submissionType: "selling" | "buying" | "development",
): Promise<ProcessingResult> {
  try {
    const prompt = `
You are a real estate data processor. Analyze and clean the following ${submissionType} submission data:

${JSON.stringify(rawData, null, 2)}

Please:
1. Clean and standardize the data
2. Extract key insights
3. Identify any missing or inconsistent information
4. Provide a confidence score (0-1) for data quality
5. Return structured JSON with cleaned data and analysis

Focus on:
- Property details accuracy
- Contact information validation
- Location standardization
- Price/budget analysis
- Requirements clarity

Return your response as JSON with this structure:
{
  "cleanedData": { ... },
  "analysis": "detailed analysis text",
  "confidenceScore": 0.85
}
`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      temperature: 0.3,
    })

    // Parse the AI response
    const result = JSON.parse(text)

    return {
      cleanedData: result.cleanedData || rawData,
      analysis: result.analysis || "No analysis provided",
      confidenceScore: result.confidenceScore || 0.5,
    }
  } catch (error) {
    console.error("OpenAI processing error:", error)

    // Return fallback result
    return {
      cleanedData: rawData,
      analysis: `Processing failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      confidenceScore: 0.1,
    }
  }
}

// Legacy function name for backward compatibility
export async function processWithOpenAI(
  submissionData: any,
  formType: "selling" | "buying" | "development",
): Promise<ProcessingResult | null> {
  try {
    const result = await processSubmission(submissionData, formType)
    console.log(`OpenAI processing completed for ${formType}:`, result)
    return result
  } catch (error) {
    console.error(`OpenAI processing failed for ${formType}:`, error)
    return null
  }
}

export async function batchProcessSubmissions(
  submissions: Array<{ id: string; data: Record<string, any>; type: "selling" | "buying" | "development" }>,
): Promise<Array<{ id: string; result: ProcessingResult }>> {
  const results = await Promise.allSettled(
    submissions.map(async (submission) => ({
      id: submission.id,
      result: await processSubmission(submission.data, submission.type),
    })),
  )

  return results
    .filter(
      (result): result is PromiseFulfilledResult<{ id: string; result: ProcessingResult }> =>
        result.status === "fulfilled",
    )
    .map((result) => result.value)
}

export async function analyzePropertyData(propertyData: Record<string, any>): Promise<string> {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `
Analyze this property data and provide insights:

${JSON.stringify(propertyData, null, 2)}

Provide a brief analysis covering:
- Property type and specifications
- Market positioning
- Key selling points
- Potential concerns or recommendations

Keep the response concise and professional.
`,
      temperature: 0.3,
    })

    return text
  } catch (error) {
    console.error("Property analysis error:", error)
    return "Analysis unavailable at this time."
  }
}
