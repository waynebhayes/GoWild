import axios from 'axios';
import { SecureStore } from 'expo';
import AppConfig from '../../config';

export const GET_ANIMAL_LIST_PENDING = 'GET_ANIMAL_LIST_PENDING'
export const GET_ANIMAL_LIST_SUCCESS = 'GET_ANIMAL_LIST_SUCCESS'
export const ADOPT_ANIMAL_PENDING = 'ADOPT_ANIMAL_PENDING'
export const ADOPT_ANIMAL_SUCCESS = 'ADOPT_ANIMAL_SUCCESS'
export const MY_ANIMAL_INFO_PENDING = 'SYNC_MOVE_PENDING'
export const MY_ANIMAL_INFO_SUCCESS = 'SYNC_MOVE_SUCCESS'
export const ADOPT_ANIMAL_DONE = 'ADOPT_ANIMAL_DONE'

export function getAnimalListPendingAction() {
  return {
    type: GET_ANIMAL_LIST_PENDING
  }
}

export function getAnimalListSuccessAction(response) {
  return {
    type: GET_ANIMAL_LIST_SUCCESS,
    data: {
        animalList: response["animal_list"]
    }
  }
}

export function adoptAnimalPendingAction() {
  return {
    type: ADOPT_ANIMAL_PENDING
  }
}

export function adoptAnimalDoneAction() {
  return {
    type: ADOPT_ANIMAL_DONE
  }
}

export function adoptAnimalSuccessAction(response) {
  return {
    type: ADOPT_ANIMAL_SUCCESS,
    data: {
      response: response
    }
  }
}

export function getMyAnimalInfoPendingAction() {
    return {
        type: MY_ANIMAL_INFO_PENDING
    }
}

export function getMyAnimalInfoSuccessAction(response) {
    return {
        type: MY_ANIMAL_INFO_SUCCESS,
        data: {
            myAnimalInfo: response["animal_info"]
        }
    }
}

export function getAnimalInfo() {
    return (dispatch) => {
        dispatch(getAnimalListPendingAction);
        SecureStore.getItemAsync("Token").then(function (token) {
            axios.post(AppConfig.ApiEndpoint + 'apis/animal_list/', null, {
                headers: {
                    Authorization: "Token " + token
                }
            }).then(function (response) {
                dispatch(getAnimalListSuccessAction(response.data))
            })
                .catch(function (error) {
                    console.log(error)
                });
        });
    }
}

export function adoptAnimal(animalId) {
    return (dispatch) => {
        dispatch(adoptAnimalPendingAction);
        SecureStore.getItemAsync("Token").then(function (token) {
            axios.post(AppConfig.ApiEndpoint + 'apis/adopt_animal/', {
                animal_id: animalId
            }, {
                headers: {
                    Authorization: "Token " + token
                }
            }).then(function (response) {
                dispatch(adoptAnimalSuccessAction(response.data))
            })
                .catch(function (error) {
                    console.log(error)
                });
        });
    }
}

export function getMyAnimalInfo() {
    return (dispatch) => {
        dispatch(getMyAnimalInfoPendingAction);
        SecureStore.getItemAsync("Token").then(function (token) {
            axios.post(AppConfig.ApiEndpoint + 'apis/my_animal/', null, {
                headers: {
                    Authorization: "Token " + token
                }
            }).then(function (response) {
                dispatch(getMyAnimalInfoSuccessAction(response.data))
            })
                .catch(function (error) {
                    console.log(error)
                });
        });
    }
}