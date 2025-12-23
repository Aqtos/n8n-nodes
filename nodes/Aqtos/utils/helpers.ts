import type { ICredentialDataDecryptedObject } from "n8n-workflow";

/**
 * Formats a date string to include timezone information for ZonedDateTime compatibility.
 * If the date string doesn't already have timezone info, appends 'Z' (UTC).
 */
export function formatDateTimeForZonedDateTime(dateString: string): string {
  if (!dateString) return dateString;

  // If already has timezone info (Z, +, - or timezone name), return as-is
  if (
    dateString.includes("Z") ||
    dateString.match(/[+-]\d{2}:?\d{2}$/) ||
    dateString.includes("[")
  ) {
    return dateString;
  }

  // If it's a valid ISO date string without timezone, append 'Z' for UTC
  // Matches patterns like "2025-12-23T00:00:00" or "2025-12-23T00:00:00.000"
  if (dateString.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?$/)) {
    return dateString + "Z";
  }

  // For other formats, try to parse and convert
  try {
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return date.toISOString();
    }
  } catch {
    // If parsing fails, return as-is
  }

  return dateString;
}

/**
 * Gets the base URL for API requests based on credentials
 */
export function getBaseURL(credentials: ICredentialDataDecryptedObject): string {
  const instance = credentials.instance as string;
  return `https://${instance}.aqtos.io/api`;
}

