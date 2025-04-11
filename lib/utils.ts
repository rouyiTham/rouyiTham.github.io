import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Function to handle image paths correctly with basePath
export function getImagePath(path: string): string {
  // Get basePath from next.config.mjs if in production
  const basePath = process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_BASE_PATH
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : '';
  
  // Make sure path starts with a slash
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // Add basePath to the image path
  return `${basePath}${normalizedPath}`;
}
