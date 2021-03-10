import {AUTH_LOGOUT, AUTH_SUCCESS, AUTH_ERROR} from '../actions/actionTypes';

const initialState = {
  token: null,
  errorDataUserView: null
}


export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state, token: action.token
      }
    case AUTH_ERROR:
      return {
        ...state, errorDataUserView: action.errorDataUserView
      }
    case AUTH_LOGOUT:
      return {
        ...state, token: null
      }
    default:
      return state
  }
}