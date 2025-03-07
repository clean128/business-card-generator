import Tesseract from "tesseract.js";

export function useBusinessCardExtractor() {
  const extractBusinessCard = async (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    try {
      const extractedText = await extractCardData(imageUrl);
      const extractedData = parseBusinessCard(extractedText);
      return extractedData;
    } finally {
      URL.revokeObjectURL(imageUrl);
    }
  };

  return { extractBusinessCard };
}

async function extractCardData(imageUrl: string) {
  const result = await Tesseract.recognize(imageUrl, "eng", {
    logger: (m: any) => console.log(m),
  });
  return result.data.text;
}

function parseBusinessCard(text: string) {
  // Split text into lines for easier parsing
  const lines = text.split("\n").map((line) => line.trim());

  // Helper to find line containing pattern
  const findLine = (pattern: RegExp) =>
    lines.find((line) => pattern.test(line));

  // More sophisticated parsing
  const extractedData = {
    firstName: "",
    lastName: "",
    accreditations: "",
    jobTitle: "",
    companyName: "",
    phoneNumber: "",
    emailAddress: "",
    websiteUrl: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
  };

  // Name and credentials
  const nameLine = findLine(/^[A-Z][a-z]+\s+[A-Z][a-z]+/);
  if (nameLine) {
    const [firstName, lastName] = nameLine.split(" ");
    extractedData.firstName = firstName;
    extractedData.lastName = lastName;
  }

  // Credentials
  const credentialsLine = findLine(/(MBA|BSc|PhD|M\.S\.|B\.A\.)/i);
  if (credentialsLine) {
    extractedData.accreditations =
      credentialsLine.match(/(MBA|BSc|PhD|M\.S\.|B\.A\.)/i)?.[0] || "";
  }

  // Job Title
  const titleLine = findLine(/founder|executive|director|manager/i);
  if (titleLine) {
    extractedData.jobTitle = titleLine;
  }

  // Company
  const companyLine = findLine(/inc\.|corp\.|ltd\./i);
  if (companyLine) {
    extractedData.companyName = companyLine;
  }

  // Contact Information
  extractedData.phoneNumber =
    text.match(/\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}/)?.[0] || "";
  extractedData.emailAddress =
    text.match(/[\w.-]+@[\w.-]+\.[A-Za-z]{2,}/)?.[0] || "";
  extractedData.websiteUrl = text.match(/https?:\/\/[^\s]+/)?.[0] || "";

  // Address
  const addressLine = findLine(/\d+\s+[A-Za-z]+\s+[A-Za-z]+/);
  if (addressLine) {
    extractedData.address.street = addressLine;

    // Try to find state and zip
    const stateZip = text.match(/([A-Z]{2})\s+(\d{5})/);
    if (stateZip) {
      extractedData.address.state = stateZip[1];
      extractedData.address.zip = stateZip[2];
    }
  }

  return extractedData;
}
