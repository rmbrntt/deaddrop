import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import { connect } from 'react-redux';
import LandingBlock from './LandingBlock';
import MainView from './MainView';

const styleSheet = createStyleSheet('Home', theme => ({
  root: {
    flexGrow: 1,
    marginTop: 0,
  }
}));

const mapStateToProps = state => ({
  appName: state.appName
});


class Home extends React.Component {
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

export default connect(mapStateToProps, () => ({}))(withStyles(styleSheet)(Home));
