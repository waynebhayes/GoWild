// scr/actions/actions.js
import axios from 'axios';
import AppConfig from '../../config';
import { SecureStore } from 'expo';

export const LOGIN_PENDING = 'LOGIN_PENDING'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const LOGOUT_PENDING = 'LOGOUT_PENDING'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

export function loginPendingAction() {
  return {
    type: LOGIN_PENDING
  }
}

export function loginSuccessAction(token) {
  return {
    type: LOGIN_SUCCESS,
    data:{
      token: token
    }
  }
}

export function loginFailureAction() {
  return {
    type: LOGIN_FAILURE
  }
}

export function login(email, password) {
  return (dispatch) => {
    dispatch(loginPendingAction())
    axios.post(AppConfig.ApiEndpoint + 'apis/login/', {
      username: email,
      password: password
    })
    .then(function (response) {
      dispatch(loginSuccessAction(response.data.token))
    })
    .catch(function (error) {
      dispatch(loginFailureAction())
    });
  }
}

export function logoutPendingAction() {
  return {
    type: LOGOUT_PENDING
  }
}

export function logoutSuccessAction() {
  return {
    type: LOGOUT_SUCCESS
  }
}
    
export function logout(token) {
  SecureStore.deleteItemAsync("Token");
  return (dispatch) => {
    dispatch(logoutPendingAction())
    axios.get(AppConfig.ApiEndpoint + 'apis/logout/', {
      headers: {
          Authorization: "Token " + token 
      }
    })
    .then(function (response) {
      dispatch(logoutSuccessAction())
    })
    .catch(function (error) {
        console.log(error)
    });
  }
}
