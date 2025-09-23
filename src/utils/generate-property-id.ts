export function generatePropertyId(propertyType: string, size: string, facing: string, plotNumber: string): string {
  // Property type abbreviations
  const propertyTypeMap: Record<string, string> = {
    "Open Plot": "P",
    "Independent House": "I",
    "Apartment Flat": "AF",
    Villas: "V",
    "Farm Land": "F",
    "Office Space": "OS",
    Other: "X",
  }

  // Facing direction abbreviations
  const facingMap: Record<string, string> = {
    North: "N",
    "North-East": "NE",
    East: "E",
    "South-East": "SE",
    South: "S",
    "South-West": "SW",
    West: "W",
    "North-West": "NW",
  }

  // Get abbreviations
  const propertyCode = propertyTypeMap[propertyType] || "X"
  const facingCode = facingMap[facing] || "X"

  // Format: PropertyType + Size + "-" + Facing + PlotNumber
  // Example: P400-NE235
  return `${propertyCode}${size}-${facingCode}${plotNumber}`
}

export function parsePropertyId(customId: string): {
  propertyType: string
  size: string
  facing: string
  plotNumber: string
} | null {
  // Reverse mapping for property types
  const reversePropertyTypeMap: Record<string, string> = {
    P: "Open Plot",
    I: "Independent House",
    AF: "Apartment Flat",
    V: "Villas",
    F: "Farm Land",
    OS: "Office Space",
    X: "Other",
  }

  // Reverse mapping for facing directions
  const reverseFacingMap: Record<string, string> = {
    N: "North",
    NE: "North-East",
    E: "East",
    SE: "South-East",
    S: "South",
    SW: "South-West",
    W: "West",
    NW: "North-West",
  }

  try {
    // Parse format: PropertyType + Size + "-" + Facing + PlotNumber
    const [leftPart, rightPart] = customId.split("-")

    if (!leftPart || !rightPart) return null

    // Extract property type (could be 1-2 characters)
    let propertyCode = ""
    let size = ""

    // Check for 2-character property codes first (AF, OS)
    if (leftPart.startsWith("AF") || leftPart.startsWith("OS")) {
      propertyCode = leftPart.substring(0, 2)
      size = leftPart.substring(2)
    } else {
      propertyCode = leftPart.substring(0, 1)
      size = leftPart.substring(1)
    }

    // Extract facing and plot number from right part
    let facingCode = ""
    let plotNumber = ""

    // Check for 2-character facing codes first (NE, SE, SW, NW)
    if (
      rightPart.startsWith("NE") ||
      rightPart.startsWith("SE") ||
      rightPart.startsWith("SW") ||
      rightPart.startsWith("NW")
    ) {
      facingCode = rightPart.substring(0, 2)
      plotNumber = rightPart.substring(2)
    } else {
      facingCode = rightPart.substring(0, 1)
      plotNumber = rightPart.substring(1)
    }

    return {
      propertyType: reversePropertyTypeMap[propertyCode] || "Other",
      size,
      facing: reverseFacingMap[facingCode] || "North",
      plotNumber,
    }
  } catch (error) {
    console.error("Error parsing property ID:", error)
    return null
  }
}
