const recommendData = require('../src/data/recomendData.json');
const { delay } = require('roadhog-api-doc');

const proxy = {
  /**
   * 获取推荐内容
   * @param req
   * @param res
   * @constructor
   */
  'GET /api/getRecommendData': (req, res) => {
    res.send(recommendData)
  }
}

export default delay(proxy, 0);
