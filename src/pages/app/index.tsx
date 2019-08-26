import React from 'react';
import { connect } from 'dva';
import { Action, Dispatch } from "redux";

import { Options } from '@better-scroll/core/dist/types/Options'
import RecommendView from './components/Recommend';
import AppListView from './components/AppList';
import Scroll from '@/components/Scroll'
import { ListData } from '@/interface/app';
import styles from './index.less';
import ReactLoading from "react-loading";

// @ts-ignore
@connect(({ app }) => ({
  appData: app.appData,
  loadingStatus: app.loadingStatus,
  isPullUpLoad: app.isPullUpLoad,
}))
export default class AppIndexUI extends React.PureComponent<AppIndexProps, AppIndexState> {
  private timer: any;
  private opt: {[key: string]: any};
  public constructor(props: AppIndexProps) {
    super(props);
    this.state = {
      searchContent: '',
      query: {
        page: 1,
        page_size: 10,
        search: ''
      },
      fn: function () {},
    }
    this.opt = {
      scrollY: true,
      pullUpLoad: true,
      click: true,
      stopPropagation: true,
      observeDom: true
    }
  }

  componentDidMount(): void {
    this.getAppListData();

  }

  private getAppListData = (search?: string, type?: string) => {
    if (this.props.dispatch) {
      this.props.dispatch({
        type: 'app/getAppListData',
        payload: Object.assign({}, this.state.query, {
          search: search || this.state.query.search || '',
          type: type
        })
      });
    }
  }

  private handleSearch = (e) => {
    this.props.dispatch({
      type: 'app/commonReducers',
      payload: {
        loadingStatus: 0
      }
    });
    const val = e.currentTarget.value;
    this.setState({
      searchContent: val,
      query: Object.assign({}, this.state.query, {
        search: val
      })
    });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.getAppListData(val, 'search');
    }, 600)
  }

  private pullingUp = () => {
    if (this.props.appData && this.props.appData.entry.length >= this.props.appData.attributes.total) return;
    if (this.props.loadingStatus === 0) return;
    this.setState({
      query: Object.assign({}, this.state.query, {
        page: this.state.query.page + 1
      })
    }, () => {
      this.getAppListData();
      this.props.dispatch({
        type: 'app/commonReducers',
        payload: {
          isPullUpLoad: true,
        }
      });
    })
  }

  private listView = (): React.ReactNode => {
    const search = this.state.query.search;
    if (search && !this.props.isPullUpLoad) {
      if (this.props.loadingStatus !== 1) {
        return <ReactLoading className={styles.loading} type={'bubbles'} color={'#4FBFFE'} height={100} width={80} />
      }
    } else {
      if (this.props.loadingStatus === 0 && !this.props.isPullUpLoad) {
        return <ReactLoading className={styles.loading} type={'bubbles'} color={'#4FBFFE'} height={100} width={80} />
      }
    }
    return <AppListView
      loadingStatus={this.props.loadingStatus}
      isPullUpLoad={this.props.isPullUpLoad}
      appData={this.props.appData}
    />
  }

  public render() {
    return (
      <div className={styles.appWrapper}>
        <header className={styles.headerTop}>
          <input type="text" defaultValue={this.state.searchContent} onChange={this.handleSearch} placeholder={'搜搜App'}/>
        </header>
        <Scroll className={styles.listView}
                options={this.opt}
                loadingStatus={this.props.loadingStatus}
                pullingUp={this.pullingUp}
                id={"listView"}
                isPullUpLoad={this.props.isPullUpLoad}
        >
          {!this.state.query.search ? <RecommendView /> : null}
          {
           this.listView()
          }
        </Scroll>
      </div>
    )
  }
}

interface AppIndexProps {
  dispatch?: Dispatch<Action>,
  appData?: ListData,
  loadingStatus?: number,
  isPullUpLoad?: boolean
}

interface AppIndexState {
  searchContent: string,
  query: {
    page: number,
    page_size: number,
    search: string
  },
  fn: () => void,
}
