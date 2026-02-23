const getUser = () => {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : { id: 1, firstName: 'John', lastName: 'Doe' };
  } catch {
    return { id: 1, firstName: 'John', lastName: 'Doe' };
  }
};

export const CURRENT_USER = getUser();