const getUser = () => {
  try {
    const stored = localStorage.getItem('user');
    if (!stored) return null;
    const raw = JSON.parse(stored);
    if (!raw) return null;
    return raw;
  } catch {
    return null;
  }
};

export const CURRENT_USER = getUser();