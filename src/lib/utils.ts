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
        return 
    }
    
    localStorage.removeItem(name);
}

/**
 * App Constants - Magin strings
 */
export const AppConstants = {
    auth_token: "token"
}