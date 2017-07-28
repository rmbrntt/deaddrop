import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import { withStyles, createStyleSheet } from 'material-ui/styles';

const styleSheet = createStyleSheet('LandingBlock', theme => ({
  paper: {
    padding: 16,
    textAlign: 'center',
    minHeight: '100%',
  },
  typography: {
    marginTop: 10,
  }
}));

const LandingBlock = (props) => {
  return (
  <Paper className={props.classes.paper}>
    <Typography type="display1" component="h1" gutterBottom={true} className={props.classes.typography}>
      You're on {props.appName}
    </Typography>
  </Paper>
 )
}

export default withStyles(styleSheet)(LandingBlock);
