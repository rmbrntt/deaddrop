import React, { Component } from 'react';
import HomeContainer from './Home/HomeContainer';
import HeaderContainer from './HeaderContainer';
import { createStore } from 'redux';
import { connect } from 'react-redux';


const mapStateToProps = state => ({
  appName: state.appName
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <HeaderContainer appName={this.props.appName}/>
        <HomeContainer />
      </div>
    );
  }
}

export default connect(mapStateToProps, () => ({}) )(App);
