import axios from 'axios';
import AppConfig from '../../config';

export const REGISTER_PENDING = 'REGISTER_PENDING'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'

export function registerPendingAction() {
  return {
    type: REGISTER_PENDING
  }
}

export function registerSuccessAction() {
  return {
    type: REGISTER_SUCCESS
  }
}

export function register(email, password, firstname, lastname) {
  return (dispatch) => {
    dispatch(registerPendingAction())
    axios.post(AppConfig.ApiEndpoint + 'apis/register/', {
      username: email,
      password: password,
      first_name: firstname,
      last_name: lastname
    })
    .then(function (response) {
      dispatch(registerSuccessAction())
    })
    .catch(function (error) {
        console.log(error)
    });
  }
}
