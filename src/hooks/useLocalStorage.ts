import { useState, useEffect } from "react";

const getStorageValue = (key: any, defaultValue: any) => {
  // getting stored value
  const saved: any = localStorage.getItem(key);
  const initial = saved;
  return initial || defaultValue;
}

export const useLocalStorage = (key: any, defaultValue: any) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
};