import { EffectsCommandMap } from "dva";
import { getRecommendData, getAppListData } from "@/services/app.service";

export default {
  namespace: 'app',
  state: {
    recommendData: [],
    appData: null,
    loadingStatus: -1,
    isPullUpLoad: false,
  },
  effects: {
    *getRecommendData({ payload }: any, { call, put, select }: EffectsCommandMap) {
      const res = yield call(getRecommendData);
      yield put({
        type: 'updateRecommendData',
        payload: {
          recommendData: res.feed.entry
        }
      })
    },
    *getAppListData({ payload }: any, { call, put, select }: EffectsCommandMap) {
      yield put({
        type: 'commonReducers',
        payload: {
          loadingStatus: 0,
        }
      });
      console.log('payload', payload)
      const res = yield call(getAppListData, payload);
      let { appData } = yield select(({app}) => ({appData: app.appData}));
      if (!appData) {
        appData = Object.assign({}, {
          attributes: res.feed.attributes,
          entry: res.feed.entry
        })
      } else if(payload.search) {
        appData.entry = res.feed.entry;
      } else if (payload.type === 'search' && !payload.search) {
        appData.entry = res.feed.entry;
      } else {
        appData.entry = appData.entry.concat(res.feed.entry)
      }
      yield put({
        type: 'updateAppListData',
        payload: {
          appData: JSON.parse(JSON.stringify(appData))
        }
      });
      yield put({
        type: 'commonReducers',
        payload: {
          loadingStatus: 1,
          isPullUpLoad: false
        }
      });
    }
  },

  reducers: {
    updateRecommendData: (state, action) => ({...state, ...action.payload}),
    updateAppListData: (state, action) => ({...state, ...action.payload}),
    commonReducers: (state, action) => ({...state, ...action.payload}),
  }
}
