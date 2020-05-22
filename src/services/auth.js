import api from './api';

export const signIn = async data => {
  const response = await api.post('/signin', data);

  return response;
};
export const signUp = async data => {
  const response = await api.post('/signup', data);

  return response;
};
