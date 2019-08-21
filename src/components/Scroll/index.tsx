import React from 'react';
import { connect } from 'dva';
import BScroll from '@better-scroll/core';
import Pullup from '@better-scroll/pull-up';
import ObserveDom from '@better-scroll/observe-dom'
import styles from './index.less';

BScroll.use(Pullup);
BScroll.use(ObserveDom);

export default class ScrollView extends React.PureComponent<ScrollViewProps, ScrollViewState> {
  private scroll;
  private isPullUpLoad: boolean = false;
  constructor(props: ScrollViewProps) {
    super(props);
    this.state = {
      el: null
    };
    this.scroll = null;
    this.isPullUpLoad = false;
  }

  public componentDidMount(): void {
  }


  public componentDidUpdate(prevProps: Readonly<ScrollViewProps>, prevState: Readonly<ScrollViewState>, snapshot?: any): void {

    if (this.scroll && this.scroll.finishPullUp) {
      this.scroll.refresh();
    }
  }


  private initScroll = () => {
    setTimeout(() => {
      if (!this.scroll) {
        this.scroll = new BScroll(this.props.id ? `#${this.props.id}` : '#wrapper', this.props.options);
        if (this.props.options.pullUpLoad) {
          this.scroll.on('pullingUp', () => {
            if (this.isPullUpLoad) return;
            if (this.props.pullingUp) {
              this.isPullUpLoad = true;
              this.props.pullingUp();
            }
          });
          // this.scroll.finishPullUp();
        }
      } else  {
        this.scroll.finishPullUp();
        this.scroll.refresh();
        this.isPullUpLoad = false;
      }
    }, 20)
  }

  public render() {
    return (
      <div className={`${styles.scrollWrapper} .wrapper`} id={this.props.id ? this.props.id : 'wrapper'} ref={(el) => {
        this.initScroll();
      }}>
        <section className={`${styles.scrollContent}`}>
          {
            React.Children.map(this.props.children, (child => child))
          }
          <footer className={styles.pullFooter}>
            {
              this.props.isPullUpLoad ? <div className={styles.loading}>
                加载中...
              </div> : null
            }
          </footer>
        </section>
      </div>
    )
  }
}

interface ScrollViewProps {
  loadingStatus?: number,
  options: {
    click?: boolean,
    scrollY?: boolean,
    scrollX?: boolean,
    observeDom?: boolean,
    pullUpLoad?: boolean | {[key: string]: any},
    [key: string]: any
  },
  className?: string,
  id?: string,
  pullingUp?: () => void,
  isPullUpLoad?: boolean
}

interface ScrollViewState {
  el: any;
}
