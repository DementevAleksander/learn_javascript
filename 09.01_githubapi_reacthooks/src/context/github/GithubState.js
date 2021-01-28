import React, {useReducer} from 'react'
import {GithubContext} from './githubContext'
import {githubReducer} from './githubReducer'
import {SEARCH_USERS, GET_USER, GET_REPOS, CLEAR_USERS, SET_LOADING} from '../types'
import axios from 'axios'

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET

const withCreds = url => {
  return `${url}client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
}

export const GithubState = ({children}) => {
  const initialState = {
    user: {},
    users: [],
    loading: false,
    repos: []
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  //Создаём функции, которые меняют state, с помощью dispatch и экспортировать через value.
  //Ищем пользователя
  const search = async value => {
    setLoading()
    // ... отправляем запрос на сервер
    const response = await axios.get(
      withCreds(`https://api.github.com/search/users?q=${value}&`)
    )
    dispatch({
      type: SEARCH_USERS,
      payload: response.data.items //данные, которые пришли с сервера.
    })
  }

  //Ищём определённого пользователя
  const getUser = async name => {
    setLoading()
    // ... отправляем запрос на сервер
    const response = await axios.get(
      withCreds(`https://api.github.com/users/${name}?`)
    )
    dispatch({
      type: GET_USER,
      payload: response.data //данные, которые пришли с сервера.
    })
  }

  //Получаем список репозиториев
  const getRepos = async name => {
    setLoading()
    // ... отправляем запрос на сервер
    const response = await axios.get(
      withCreds(`https://api.github.com/users/${name}/repos?per_page=5&`)
    )
    dispatch({
      type: GET_REPOS,
      payload: response.data //данные, которые пришли с сервера.
    })
  }

  //Очистка списка пользователей
  const clearUsers = () => {
    dispatch({
      type: CLEAR_USERS
    })
  }

  //Появление лоадинга
  const setLoading = () => {
    dispatch({
      type: SET_LOADING
    })
  }

  //state
  const {user, users, loading, repos} = state

  return (
    <GithubContext.Provider value={{
      search, getUser, getRepos, clearUsers, setLoading,
      user, users, loading, repos //те компоненты, использующие контекст gitHub имели доступ до этих состояний.
    }}>
      {children}
    </GithubContext.Provider>
  )
}
