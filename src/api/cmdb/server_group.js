import axios from '@/libs/http'

// 获取所有主机
export const getTableData = () => {
  return axios.request({
    url: '/api/cmdb/server_group/',
    method: 'get'
  })
}

// 添加或修改主机组
export const addServerGroup = (data, url, action) => {
  return axios.request({
    url: `/api/cmdb/server_group${url}`,
    method: action,
    data
  })
}
