import React from 'react';
import Redirect from 'umi/redirect'

export default class AppIndexUI extends React.PureComponent {

  public render() {
    return <Redirect to={'/app'} />
  }
}
