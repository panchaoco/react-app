import request from '../utils/fetch';

export async function getRecommendData() {
  return request('/api/getRecommendData', {
    method: 'GET'
  })
}

export async function getAppListData(payload) {
  return request('/api/getAppListData', {
    method: 'GET',
    params: payload
  })
}
