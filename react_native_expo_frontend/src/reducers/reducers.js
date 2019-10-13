//src/reducers/reducers.js
import { LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_PENDING, LOGOUT_SUCCESS } from '../actions/logActions'
import { REGISTER_PENDING, REGISTER_SUCCESS } from '../actions/registerActions'
import { GET_SYNC_PENDING, GET_SYNC_SUCCESS, SYNC_USER_PENDING, SYNC_USER_SUCCESS, SYNC_MOVE_PENDING, SYNC_MOVE_SUCCESS } from '../actions/syncActions'
import { GET_ANIMAL_LIST_PENDING, GET_ANIMAL_LIST_SUCCESS, ADOPT_ANIMAL_PENDING, ADOPT_ANIMAL_SUCCESS, ADOPT_ANIMAL_DONE, MY_ANIMAL_INFO_PENDING, MY_ANIMAL_INFO_SUCCESS } from '../actions/animalActions'
import { GET_ANIMAL_MOVE_PENDING, GET_ANIMAL_MOVE_SUCCESS } from '../actions/moveActions'
import { Actions } from 'react-native-router-flux';
import { combineReducers } from 'redux'

function loginReducer(state = {loading: false, token: null}, action) {
  switch (action.type) {
    case LOGIN_PENDING:
        return Object.assign({}, state, {
          loading: true
        });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
          token: action.data.token,
          loading: false
        });
    case LOGIN_FAILURE:
        return Object.assign({}, state, {
          failure: true,
          loading: false
        });
    case LOGOUT_PENDING:
      return  Object.assign({}, state, {
        loading: false
      });
    case LOGOUT_SUCCESS:
      Actions.Login();
      return  Object.assign({}, state, {
        token: "",
        loading: false
      });
    default:
      return state;
  }
}

function registerReducer(state = {}, action) {
  switch (action.type) {
    case REGISTER_PENDING:
        return Object.assign({}, state, {
          loading: true
        });
    case REGISTER_SUCCESS:
      return Object.assign({}, state, {
          loading: false
        });
    default:
      return state;
  }
}

function syncReducer(state = {lastLoginDate: null, loading: false, token: null}, action) {
  switch (action.type) {
    case GET_SYNC_SUCCESS:
        if (state.lastLoginDate != action.data.lastLoginDate) {
          return Object.assign({}, state, {
            lastLoginDate: action.data.lastLoginDate
          });
        } else if (action.data.lastLoginDate == null) {
          return Object.assign({}, state, {
            lastLoginDate: "2019-01-01"
          });
        } else {
          return state;
        }
    case SYNC_USER_SUCCESS:
      return Object.assign({}, state, {
        loading: false
      });
    case SYNC_MOVE_SUCCESS:
      return Object.assign({}, state, {
        loading: false
      });
    default:
      return state;
  }
}

function animalReducer(state = {listLoading: true, success: false}, action){
  switch (action.type) {
      case GET_ANIMAL_LIST_PENDING:
          return Object.assign({}, state, {
              listLoading: true
          });

      case GET_ANIMAL_LIST_SUCCESS:
          //console.log(action.data)
          return Object.assign({}, state, {
            animalList: action.data.animalList,
              listLoading: false
          });

      case ADOPT_ANIMAL_PENDING:
          return Object.assign({}, state, {
              loading: true
          });

      case ADOPT_ANIMAL_SUCCESS:
          return Object.assign({}, state, {
              success: action.data.response.success,
              loading: false
          });
      case ADOPT_ANIMAL_DONE:
          return Object.assign({}, state, {
              success: false
          });

      case MY_ANIMAL_INFO_PENDING:
          return Object.assign({}, state, {
              loading: true
          });

      case MY_ANIMAL_INFO_SUCCESS:
          return Object.assign({}, state, {
              myAnimalInfo: action.data.myAnimalInfo,
              loading: false
          });
      default :
        return state;
  }
}

function animalMovementReducer(state = {animalMovement: null}, action) {
  switch (action.type) {
    case GET_ANIMAL_MOVE_PENDING:
        return Object.assign({}, state, {
          loading: true
        });
    case GET_ANIMAL_MOVE_SUCCESS:
      return Object.assign({}, state, {
          loading: false,
          animalMovement: action.data.response,
        });
    default:
      return state;
  }
}

const mainReducer = combineReducers({
  loginReducer,
  registerReducer,
  syncReducer,
  animalReducer,
  animalMovementReducer
})

export default mainReducer
