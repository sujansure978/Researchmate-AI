
import { useEffect, useState } from "react";

const STORAGE_KEY = "researchmate-saved-resources";

export default function useSavedResources() {
  const [saved, setSaved] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
      );
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(saved)
    );
  }, [saved]);

  function toggleSave(item) {
    setSaved((previous) => {
      const exists = previous.some(
        (savedItem) => savedItem.id === item.id
      );

      return exists
        ? previous.filter(
            (savedItem) => savedItem.id !== item.id
          )
        : [...previous, item];
    });
  }

  return { saved, toggleSave };
}
