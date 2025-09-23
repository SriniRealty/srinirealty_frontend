const ones = [
  "",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
]

const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"]

function convertHundreds(num: number): string {
  let result = ""

  if (num > 99) {
    result += ones[Math.floor(num / 100)] + " hundred "
    num %= 100
  }

  if (num > 19) {
    result += tens[Math.floor(num / 10)] + " "
    num %= 10
  }

  if (num > 0) {
    result += ones[num] + " "
  }

  return result.trim()
}

export function numberToWords(amount: number): string {
  if (amount === 0) return "zero rupees only"

  let result = ""
  const crores = Math.floor(amount / 10000000)
  const lakhs = Math.floor((amount % 10000000) / 100000)
  const thousands = Math.floor((amount % 100000) / 1000)
  const hundreds = amount % 1000

  if (crores > 0) {
    result += convertHundreds(crores) + " crore "
  }

  if (lakhs > 0) {
    result += convertHundreds(lakhs) + " lakh "
  }

  if (thousands > 0) {
    result += convertHundreds(thousands) + " thousand "
  }

  if (hundreds > 0) {
    result += convertHundreds(hundreds)
  }

  result = result.trim()

  if (result) {
    return result + " rupees only"
  }

  return "zero rupees only"
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}
