import axios from '@/libs/http'

// 获取所有登录日志
export const getTableData = (params) => {
  return axios.request({
    url: '/api/cmdb/server_log/',
    method: 'get',
    params
  })
}

// 获取所有Tty日志
export const getTtyLogData = (lid) => {
  return axios.request({
    url: `/api/cmdb/server_ttylog/?log_id=${lid}`,
    method: 'get'
  })
}

// 获取回放日志
export const getRecordData = (lid) => {
  return axios.request({
    url: `/api/cmdb/server_recordlog/?log_id=${lid}`,
    method: 'get'
  })
}
