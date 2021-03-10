import axios from 'axios'
import {AUTH_ERROR, AUTH_LOGOUT, AUTH_SUCCESS} from './actionTypes';
import {KEY_DATABASE} from './technical';

export function auth(email, password, isLogin) {
  return async dispatch => {
    const authData = {
      email, password,
      returnSecureToken: true
    }

    let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${KEY_DATABASE}`

    if (isLogin) {
      url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${KEY_DATABASE}`
    }

    try {
      const response = await axios.post(url, authData)
      const data = response.data
  
      const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)
  
      localStorage.setItem('token', data.idToken)
      localStorage.setItem('userId', data.localId)
      localStorage.setItem('expirationDate', expirationDate)
  
      dispatch(authSuccess(data.idToken))
      dispatch(autoLogout(data.expiresIn))

    } catch (error) {
      // console.log('Ошибка запроса данных для входа:', error);
      dispatch(authError("AUTH_ERROR"))
    }
  }
}

export function autoLogout(time) {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, time * 1000)
  }
}

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expirationDate')
  return {
    type: AUTH_LOGOUT
  }
}


export function autoLogin() {
  return dispatch => {
    const token = localStorage.getItem('token')
    if (!token) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if (expirationDate <= new Date()) {
        dispatch(logout())
      } else {
        dispatch(authSuccess(token))
        dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
      }
    }
  }
}

export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token
  }
}

export function authError(errorDataUserView) {
  // console.log("Это errorDataUserView:", errorDataUserView)
  return {
    type: AUTH_ERROR,
    errorDataUserView
  }
}