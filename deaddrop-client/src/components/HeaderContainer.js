import React, { Component } from 'react';
import HeaderAppBar from './HeaderAppBar';

export default class HeaderContainer extends Component {
  render(){
    return (
      <HeaderAppBar appName={this.props.appName}/>
    )
  }
}
