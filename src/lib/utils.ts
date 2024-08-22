import { toast } from 'react-toastify';
import { logger } from './logger';

/**
 * Local Storage setter Helper
 * @param name
 * @param value
 * @returns
 */
export function setLS(name: string, value: string) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(name, value);
}

/**
 * Local Storage getter Helper
 * @param name
 * @param value
 * @returns
 */
export function getLS<T>(name: string): T | undefined {
  if (typeof window === "undefined") {
    return;
  }

  const data = localStorage.getItem(name);
  return data ? JSON.parse(data) : undefined;
}

/**
 * Local Storage remover Helper
 * @param name
 * @param value
 * @returns
 */
export function removeFromLS(name: string) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(name);
}

export function extractQueryParams(url: string) {
  const urlObj = new URL(url);
  const params = new URLSearchParams(urlObj.search);

  const result: { [key: string]: string | string[] } = {};
  params.forEach((value, key) => {
    if (result[key]) {
      if (Array.isArray(result[key])) {
        (result[key] as string[]).push(value);
      } else {
        result[key] = [result[key] as string, value];
      }
    } else {
      result[key] = value;
    }
  });

  return result;
}

export const appendQueryParams = (
  baseUrl: string,
  newParams: { [key: string]: string | string[] }
) => {
  const urlObj = new URL(baseUrl);
  const params = new URLSearchParams(urlObj.search);

  for (const [key, value] of Object.entries(newParams)) {
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, v));
    } else {
      params.set(key, value);
    }
  }

  return `?${params.toString()}`;
};

/**
 * Converts bytes to megabytes (MB).
 * @param bytes - The size in bytes.
 * @returns The size in megabytes (MB), rounded to 2 decimal places.
 */
export function bytesToMB(bytes: number): number {
  const bytesInMB = 1024 * 1024; // 1 MB = 1024 * 1024 Bytes
  return parseFloat((bytes / bytesInMB).toFixed(2));
}

/**
 * Converts bytes to gigabytes (GB).
 * @param bytes - The size in bytes.
 * @returns The size in gigabytes (GB), rounded to 2 decimal places.
 */
export function bytesToGB(bytes: number): number {
  const bytesInGB = 1024 * 1024 * 1024; // 1 GB = 1024 * 1024 * 1024 Bytes
  return parseFloat((bytes / bytesInGB).toFixed(2));
}

export const notify = (message: string) => {
  logger("Notification", "", message)
  toast(message)
};
/**
 * App Constants - Magin strings
 */
export const AppConstants = {
  auth_token: "token",
  max_file_size: 1073741824,
  file_size_error: "Upload failed. You have exceeded your 1 GB storage limit. Please delete some files or upgrade your storage plan."
};
