export const storage = {
  set: <T>(key: string, value: T) => {
    try {
      const serialized =
        typeof value === 'string' ? value : JSON.stringify(value);
      localStorage.setItem(key, serialized);
    } catch (err) {
      console.error(`Error setting localStorage key “${key}”:`, err);
    }
  },

  get: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;

      try {
        return JSON.parse(item) as T; // try parse JSON
      } catch {
        return item as unknown as T; // fallback to string
      }
    } catch (err) {
      console.error(`Error getting localStorage key “${key}”:`, err);
      return null;
    }
  },

  remove: (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.error(`Error removing localStorage key “${key}”:`, err);
    }
  },
};
