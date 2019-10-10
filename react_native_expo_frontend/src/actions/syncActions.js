import axios from 'axios';
import { SecureStore } from 'expo';
import AppConfig from '../../config';

export const GET_SYNC_PENDING = 'GET_SYNC_PENDING'
export const GET_SYNC_SUCCESS = 'GET_SYNC_SUCCESS'
export const SYNC_USER_PENDING = 'SYNC_USER_PENDING'
export const SYNC_USER_SUCCESS = 'SYNC_USER_SUCCESS'
export const SYNC_MOVE_PENDING = 'SYNC_MOVE_PENDING'
export const SYNC_MOVE_SUCCESS = 'SYNC_MOVE_SUCCESS'

export function syncMovePendingAction() {
  return {
    type: SYNC_MOVE_PENDING
  }
}

export function syncMoveSuccessAction(response) {
  return {
    type: SYNC_MOVE_SUCCESS,
    data: {
      response: response
    }
  }
}

export function syncUserPendingAction() {
  return {
    type: SYNC_USER_PENDING
  }
}

export function syncUserSuccessAction(response) {
  return {
    type: SYNC_USER_SUCCESS,
    data: {
      response: response
    }
  }
}

export function getSyncPendingAction() {
  return {
    type: GET_SYNC_PENDING
  }
}

export function getSyncSuccessAction(date) {
  return {
    type: GET_SYNC_SUCCESS,
    data: {
      lastLoginDate: date || '2019-01-01'
    }
  }
}

export function syncMovement(data) {
  return (dispatch) => {
    dispatch(syncMovePendingAction());
    SecureStore.getItemAsync("Token").then(function (token) {
      axios.post(AppConfig.ApiEndpoint + 'apis/user_movement/', { data }, {
        headers: {
            Authorization: "Token " + token 
        }
      }).then(function (response) {
        dispatch(syncMoveSuccessAction(response.data))
      })
      .catch(function (error) {
          console.log(error)
      });
    });
  }
}

export function syncUserdata(data) {
  return (dispatch) => {
    dispatch(syncUserPendingAction());
    SecureStore.getItemAsync("Token").then(function (token) {
      axios.post(AppConfig.ApiEndpoint + 'apis/my_info/', null, {
        headers: {
            Authorization: "Token " + token 
        }
      }).then(function (response) {
        console.log(response.data)
        dispatch(syncUserSuccessAction(response.data))
      })
      .catch(function (error) {
          console.log(error)
      });
    });
  }
}

export function getSyncStartDate() {
  return (dispatch) => {
    dispatch(getSyncPendingAction());
    SecureStore.getItemAsync("Token").then(function (token) {
      axios.post(AppConfig.ApiEndpoint + 'apis/last_updated_date/', null, {
        headers: {
          Authorization: "Token " + token 
        }
      }).then(function (response) {
        dispatch(getSyncSuccessAction(response.data.last_updated_date))
      })
      .catch(function (error) {
          console.log(error)
      });
    });
  }
}
