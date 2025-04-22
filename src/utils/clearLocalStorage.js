export const clearLocalStorage = keys => {
  if (typeof window !== 'undefined' && localStorage) {
    const allKeys = [...keys];

    allKeys.forEach(key => localStorage.removeItem(key));
  }
};
