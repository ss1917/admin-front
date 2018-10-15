import axios from '@/libs/api.request'

export const login = ({ username, password, dynamic }) => {
  const data = {
    username,
    password,
    dynamic
  }
  return axios.request({
    url: '/login/',
    data,
    method: 'put'
  })
}

export const getUserInfo = (token) => {
  return axios.request({
    url: 'get_info',
    params: {
      token
    },
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}

export const authorization = () => {
  return axios.request({
    url: '/users/authorization/',
    method: 'get'
  })
}
