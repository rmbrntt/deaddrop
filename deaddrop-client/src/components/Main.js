import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import DropContainer from './DropContainer';
import { createStore } from 'redux';
import { connect } from 'react-redux';

const styleSheet = createStyleSheet('Main', theme => ({
  root: {
    flexGrow: 1,
    marginTop: 0,
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minHeight: '100%',
  },
}));

const mapStateToProps = state => ({
  appName: state.appName
});

class Main extends React.Component {
  render(){
    const classes = this.props.classes;

    return (
      <div className={classes.root}>
        <Grid>
          You're on {this.props.appName}
        </Grid>
        <Grid container gutter={0}>
          <Grid item xs={12} sm={4}>
            <Paper className={classes.paper} elevation={1}>
              <Typography type="headline" component="h3">
                DropMenu
              </Typography>
              <Typography type="body1" component="p">
                <DropContainer />
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Paper className={classes.paper} elevation={1}>
              <Typography type="headline" component="h3">
                DropLocator
              </Typography>
              <Typography type="body1" component="p">
              Body
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}


Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, () => ({}) )(withStyles(styleSheet)(Main));
