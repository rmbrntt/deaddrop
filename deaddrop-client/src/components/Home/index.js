import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import LandingBlock from './LandingBlock';
import MainView from './MainView';
import agent from '../../agent';

const styleSheet = createStyleSheet('Home', theme => ({
  root: {
    flexGrow: 1,
    marginTop: 0,
  }
}));

const Promise = global.Promise;

const mapStateToProps = state => ({
  appName: state.appName
});

const mapDispatchToProps = dispatch => ({
  onLoad: (payload) =>
    dispatch({ type: 'HOME_LOADED', payload }),
});

class Home extends React.Component {

  componentWillMount() {
    this.props.onLoad(agent.Drops.all());
  }

  render(){
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <LandingBlock appName={this.props.appName} />
        <MainView />
      </div>
    );
  }
}


Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styleSheet)(Home));
