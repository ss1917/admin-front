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
    method: 'post'
  })
}

// export const getUserInfo = (token) => {
//   return axios.request({
//     url: 'get_info',
//     params: {
//       token
//     },
//     method: 'get'
//   })
// }

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}

export const authorization = () => {
  return axios.request({
    url: '/authorization/',
    method: 'get'
  })
}

export const getuserlist = (page, limit) => {
  return axios.request({
    url: '/v2/accounts/user/',
    method: 'get',
    params: {
      page,
      limit
    }
  })
}

export const newuser = (data) => {
  return axios.request({
    url: '/v2/accounts/user/',
    method: 'post',
    data
  })
}

export const deluser = (data) => {
  return axios.request({
    url: '/v2/accounts/user/',
    method: 'delete',
    data
  })
}

export const updateuser = (data) => {
  return axios.request({
    url: '/v2/accounts/user/',
    method: 'put',
    data
  })
}
