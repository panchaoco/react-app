import { extend } from "umi-request";

/**
 * 可配置request
 */

const request = extend({

})

request.interceptors.response.use((response, options) => {
  return response;
})

export default request;

