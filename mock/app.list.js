const { delay } = require('roadhog-api-doc');
const Chinese = require('chinese-s2t');

const proxy = {
  /**
   * 获取推荐内容
   * 简体繁体查询时同意转为简体查询
   * @param req
   * @param res
   * @constructor
   */
  'GET /api/getAppListData': (req, res) => {
    const appListData = require('../src/data/appListData.json');
    const data = JSON.parse(JSON.stringify(appListData));
    const query = req.query;
    if (query.search) {
      const search = Chinese.t2s(query.search);
      const rec = require('../src/data/recomendData');
      data.feed.entry = data.feed.entry.concat(rec.feed.entry);
      data.feed.entry = data.feed.entry.filter(item => {
        const category = item['category'].attributes;
        return Chinese.t2s(item['im:name'].label).includes(search) ||
          Chinese.t2s(category.term).includes(search) ||
          Chinese.t2s(category.label).includes(search) ||
          Chinese.t2s(item['summary'].label).includes(search)
      })
    }
    if (query && query.page && query.page_size) {
      const page = Number(query.page);
      const page_size = Number(query.page_size);
      data.feed.attributes = {
        total: appListData.feed.entry.length,
        page,
        page_size
      }
      !query.search && (data.feed.entry = data.feed.entry.slice((page - 1) * page_size, page * page_size));
      res.send(data);
      return;
    }
    res.send(data)
  }
}

export default delay(proxy, 1000);
