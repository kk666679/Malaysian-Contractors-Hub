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
 * Formats a relative date (e.g., "2 days ago")
 */
export function formatRelativeDate(date) {
  const now = new Date();
  const inputDate = new Date(date);
  const diffInSeconds = Math.floor((now - inputDate) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
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
 * Formats a number with thousand separators
 */
export function formatNumber(value, options = {}) {
  return new Intl.NumberFormat("en-MY", options).format(value);
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

/**
 * Debounce function to limit how often a function can be called
 */
export function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function to limit how often a function can be called
 */
export function throttle(func, limit = 300) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Deep clone an object
 */
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Check if an element is in viewport
 */
export function isInViewport(element, offset = 0) {
  if (!element) return false;
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 - offset &&
    rect.left >= 0 - offset &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) + offset
  );
}

/**
 * Get browser and device information
 */
export function getBrowserInfo() {
  const ua = navigator.userAgent;
  const browserInfo = {
    mobile: /Mobi|Android|iPhone|iPad|iPod/i.test(ua),
    browser: 'unknown',
    os: 'unknown',
  };
  
  // Detect browser
  if (ua.indexOf('Firefox') > -1) browserInfo.browser = 'Firefox';
  else if (ua.indexOf('SamsungBrowser') > -1) browserInfo.browser = 'Samsung';
  else if (ua.indexOf('Opera') > -1 || ua.indexOf('OPR') > -1) browserInfo.browser = 'Opera';
  else if (ua.indexOf('Trident') > -1) browserInfo.browser = 'IE';
  else if (ua.indexOf('Edge') > -1) browserInfo.browser = 'Edge';
  else if (ua.indexOf('Chrome') > -1) browserInfo.browser = 'Chrome';
  else if (ua.indexOf('Safari') > -1) browserInfo.browser = 'Safari';
  
  // Detect OS
  if (ua.indexOf('Windows') > -1) browserInfo.os = 'Windows';
  else if (ua.indexOf('Mac') > -1) browserInfo.os = 'MacOS';
  else if (ua.indexOf('Linux') > -1) browserInfo.os = 'Linux';
  else if (ua.indexOf('Android') > -1) browserInfo.os = 'Android';
  else if (ua.indexOf('iPhone') > -1 || ua.indexOf('iPad') > -1) browserInfo.os = 'iOS';
  
  return browserInfo;
}

/**
 * Safely access nested object properties
 */
export function getNestedValue(obj, path, defaultValue = undefined) {
  const keys = path.split('.');
  let result = obj;
  
  for (const key of keys) {
    if (result === null || result === undefined || typeof result !== 'object') {
      return defaultValue;
    }
    result = result[key];
  }
  
  return result === undefined ? defaultValue : result;
}