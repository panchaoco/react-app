import React from 'react';
import BScroll from '@better-scroll/core';
import styles from './index.less';

export default class SlideView extends React.PureComponent<SlideViewProps, SlideViewState> {
  private scroll;
  private isPullUpLoad: boolean = false;
  constructor(props: SlideViewProps) {
    super(props);
    this.state = {
      el: null
    };
    this.scroll = null;
    this.isPullUpLoad = false;
  }

  private initScroll = () => {
    setTimeout(() => {
      this.scroll = new BScroll(this.props.id ? `#${this.props.id}` : '#wrapper', this.props.options);
    }, 20)
  }

  public render() {
    return (
      <div className={`${styles.slideWrapper}`} id={this.props.id ? this.props.id : 'wrapper'} ref={(el) => {
        this.initScroll();
      }}>
        {this.props.children}
      </div>
    )
  }
}

interface SlideViewProps {
  options: {
    click?: boolean,
    scrollX?: boolean,
    [key: string]: any
  },
  className?: string,
  id?: string,
}

interface SlideViewState {
  el: any;
}
