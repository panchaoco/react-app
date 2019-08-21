import React from 'react'
import { connect } from "dva";
import { Action, Dispatch } from "redux";
import Slide from '@/components/Slide'

import { EntryData } from '@/interface/app'
import styles from './index.less'


// @ts-ignore
@connect(({ app }) => ({
  recommendData: app.recommendData
}))
export default class RecommendView extends React.PureComponent<RecommendViewProps, RecommendViewState> {
  public constructor(props: RecommendViewProps) {
    super(props);
    this.state = {
      reactSwipeEl: null,
      scrollOptions: {
        scrollX: true,
        click: true
      }
    }
  }

  public componentDidMount(): void {
    if (this.props.dispatch) {
      this.props.dispatch({
        type: 'app/getRecommendData'
      });
    }
  }


  public render() {
    return (
      <div className={styles.recommend}>
        <h2>推荐</h2>
        {
          this.props.recommendData ? <Slide
            options={this.state.scrollOptions}
            id={'slide'}
          >
            <ul className={styles.recommendContent}>
              {
                this.props.recommendData.map((item, index) => {
                  const image = item["im:image"][2].label;
                  const name = item["im:name"].label;
                  const category = item.category.attributes.label;
                  return (
                    <li key={index}>
                      <img src={image} alt=""/>
                      <span className={styles.name}>{name}</span>
                      <span className={styles.category}>{category}</span>
                    </li>
                  );
                })
              }
            </ul>
          </Slide> : null
        }
      </div>
    )
  }
}

interface RecommendViewProps {
  dispatch?: Dispatch<Action>,
  recommendData?: EntryData[]
}

interface RecommendViewState {
  reactSwipeEl: any,
  scrollOptions: {[key: string]: any}
}
