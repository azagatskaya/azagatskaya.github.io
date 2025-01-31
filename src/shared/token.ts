export const saveTokenToLocalStorage = (t: string) => {
  localStorage.setItem('token', t);
};

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem('token');
};

export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem('token');
};
