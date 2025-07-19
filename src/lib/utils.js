import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines and merges Tailwind CSS classes
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date using Intl.DateTimeFormat
 */
export function formatDate(date, options = {}) {
  const defaultOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("en-MY", { ...defaultOptions, ...options }).format(
    new Date(date)
  );
}

/**
 * Formats a currency value
 */
export function formatCurrency(value, currency = "MYR") {
  return new Intl.NumberFormat("en-MY", {
    style: "currency",
    currency,
  }).format(value);
}

/**
 * Truncates text to a specified length
 */
export function truncateText(text, length = 100) {
  if (!text || text.length <= length) return text;
  return `${text.slice(0, length)}...`;
}

/**
 * Generates a random ID
 */
export function generateId(length = 8) {
  return Math.random().toString(36).substring(2, 2 + length);
}