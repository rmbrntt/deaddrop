import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import HomeSplash from './HomeSplash';
import HomeView from './HomeView';
import agent from '../../agent';

const styleSheet = createStyleSheet('HomeContainer', theme => ({
  root: {
    flexGrow: 1,
  }
}));

const Promise = global.Promise;

const mapStateToProps = state => ({
  appName: state.appName,
  drops: state.drops,
});

const mapDispatchToProps = dispatch => ({
  onLoad: (payload) =>
    dispatch({ type: 'HOME_LOADED', payload }),
});

class HomeContainer extends React.Component {
  state = {
    center: null
  }

  componentWillMount() {
    this.props.onLoad(agent.Drops.all());
  }

  handleDropItemClick = (e) => {
    const lat = (e.target).closest("li").attributes.getNamedItem('data-lat').value
    const lng = (e.target).closest("li").attributes.getNamedItem('data-lng').value
    this.setState({ center: { lat: parseFloat(lat), lng: parseFloat(lng) }})
  }

  render(){
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <HomeSplash appName={this.props.appName} />
        <HomeView drops={this.props.drops} handleDropItemClick={(e) => this.handleDropItemClick(e)} center={this.state.center}/>
      </div>
    );
  }
}


HomeContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styleSheet)(HomeContainer));
