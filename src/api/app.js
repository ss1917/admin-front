import axios from '@/libs/api.request'

export const getLoglist = (page, limit, key, value, date = ['', '']) => {
  return axios.request({
    url: '/mg/v2/app/opt_log/',
    method: 'get',
    params: {
      page,
      limit,
      key,
      value,
      start_date: date[0],
      end_date: date.length > 1 ? date[1] : ''
    }
  })
}
