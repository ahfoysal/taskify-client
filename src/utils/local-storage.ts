// Set a value to local storage
export const setToLocalStorage = (key: string, value: any): void => {
  if (!key || typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
};

// Get a value from local storage
export const getFromLocalStorage = (key: string): any | null => {
  if (!key || typeof window === "undefined") return null;
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : null;
};

// Remove a value from local storage
export const removeFromLocalStorage = (key: string): void => {
  if (!key || typeof window === "undefined") return;
  localStorage.removeItem(key);
};
