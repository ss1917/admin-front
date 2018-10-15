import { login, getUserInfo, authorization } from '@/api/user'
import { setToken, getToken } from '@/libs/util'

export default {
  state: {
    userName: '',
    userId: '',
    avatorImgPath: '',
    token: getToken(),
    access: '',
    hasGetInfo: false
  },
  mutations: {
    setAvator (state, avatorPath) {
      state.avatorImgPath = avatorPath
    },
    setUserId (state, id) {
      state.userId = id
    },
    setUserName (state, name) {
      state.userName = name
    },
    setAccess (state, access) {
      state.access = access
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setHasGetInfo (state, status) {
      state.hasGetInfo = status
    },
    SET_RULES (state, rules) {
      state.rules = rules
    }
  },
  actions: {
    // 登录
    handleLogin ({ commit }, {username, password, dynamic}) {
      username = username.trim()
      return new Promise((resolve, reject) => {
        login({
          username,
          password,
          dynamic
        }).then(res => {
          const data = res.data
          commit('setToken', data.token)
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        // logout(state.token).then(() => {
        //   commit('setToken', '')
        //   commit('setAccess', [])
        //   resolve()
        // }).catch(err => {
        //   reject(err)
        // })
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        commit('setToken', '')
        commit('setAccess', [])
        resolve()
      })
    },
    authorization ({ commit }, token) {
      return new Promise((resolve, reject) => {
        authorization().then(res => {
          if (parseInt(res.code) === 401) {
            reject(new Error('token error'))
          } else {
            // setToken(res.data.data.token)
            console.log('res.data.data.rules.page', res.data.data.rules.page)
            resolve(res.data.data.rules.page)
            commit('SET_RULES', res.data.data.rules.component)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          getUserInfo(state.token).then(res => {
            const data = res.data
            commit('setAvator', data.avator)
            commit('setUserName', data.name)
            commit('setUserId', data.user_id)
            commit('setAccess', data.access)
            commit('setHasGetInfo', true)
            resolve(data)
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    }
  }
}
