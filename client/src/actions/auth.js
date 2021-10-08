import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

//  action de connexion
export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    router.push('/services');
  } catch (error) {
    console.log(error);
  }
};

//  action d'inscription
export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    router.push('/services');
  } catch (error) {
    console.log(error);
  }
};
