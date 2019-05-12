import { AUTH_USER, AUTH_ERROR } from './types';
import axios from 'axios';

export const signup = (formProps, cb) => async dispatch => {
  try {
    const res = await axios.post('http://localhost:4000/signup', formProps);
    dispatch({ type: AUTH_USER, payload: res.data.token });
    localStorage.setItem('token', res.data.token);
    cb();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Email in use' });
  }
};

export const signout = () => {
  localStorage.removeItem('token');
  return {
    type: AUTH_USER,
    payload: ''
  };
};

export const signin = (formProps, cb) => async dispatch => {
  try {
    const res = await axios.post('http://localhost:4000/signin', formProps);
    dispatch({ type: AUTH_USER, payload: res.data.token });
    localStorage.setItem('token', res.data.token);
    cb();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Invalid credentials' });
  }
};