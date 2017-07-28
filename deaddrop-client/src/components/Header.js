import React, { Component } from 'react';
import HeaderAppBar from './HeaderAppBar';

export default class Header extends Component {
  render(){
    return (
      <HeaderAppBar appName={this.props.appName}/>
    )
  }
}
