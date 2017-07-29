import React, { Component } from 'react';
import Home from './Home/index';
import Header from './Header';

import { createStore } from 'redux';
import { connect } from 'react-redux';


const mapStateToProps = state => ({
  appName: state.appName
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header appName={this.props.appName}/>
        <Home />
      </div>
    );
  }
}

export default connect(mapStateToProps, () => ({}) )(App);
