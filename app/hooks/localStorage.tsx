import { useState } from "react";

/**
 * Custom hook for interacting with localStorage.
 * @param key - The key to store the data under in localStorage.
 * @param initialValue - The initial value to use if no value is found in localStorage.
 */
function useLocalStorage<T>(key: string, initialValue: T) {
  // Initialize state with the value from localStorage or the initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      // If we're on the server, return the initial value
      return initialValue;
    }
    // Retrieve value from localStorage and parse it
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  // Function to update localStorage and state
  const setValue = (value: T | ((val: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(valueToStore));
    }
  };

  return [storedValue, setValue] as const;
}

export default useLocalStorage;