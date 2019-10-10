//src/store/store.js
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import mainReducer from '../reducers/reducers'

const store = createStore(
  mainReducer,
  {},
  compose(
    applyMiddleware(thunk),
  )
)

export default store
