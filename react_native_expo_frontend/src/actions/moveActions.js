import axios from 'axios';
import { SecureStore } from 'expo';
import AppConfig from '../../config';

export const GET_ANIMAL_MOVE_PENDING = 'GET_ANIMAL_MOVE_PENDING'
export const GET_ANIMAL_MOVE_SUCCESS = 'GET_ANIMAL_MOVE_SUCCESS'

export function getAnimalMovePendingAction() {
  return {
    type: GET_ANIMAL_MOVE_PENDING
  }
}

export function getAnimalMoveSuccessAction(response) {
  return {
    type: GET_ANIMAL_MOVE_SUCCESS,
    data: {
      response: response
    }
  }
}

export function getAnimalMove(starttime, endtime, period) {
  return (dispatch) => {
    dispatch(getAnimalMovePendingAction());

    segment = "hour"
    if (period == "Day") {
      segment = "day"
    } else if (period == "Week") {
      segment = "week"
    }
    SecureStore.getItemAsync("Token").then(function (token) {
      axios.post(AppConfig.ApiEndpoint + 'apis/animal_movement/', { 
        start_time:  starttime,
        end_time: endtime,
        segment: segment
      }, {
        headers: {
            Authorization: "Token " + token 
        }
      }).then(function (response) {
        dispatch(getAnimalMoveSuccessAction(response.data))
      })
      .catch(function (error) {
          console.log(error)
      });
    });
  }
}
