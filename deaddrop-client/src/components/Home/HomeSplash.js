import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import { withStyles, createStyleSheet } from 'material-ui/styles';

const styleSheet = createStyleSheet('HomeSplash', theme => ({
  paper: {
    textAlign: 'left',
    padding: 10,
    minHeight: '100%',
    minWidth: '100%'
  },
  typography: {
    marginTop: 10,
  }
}));

const HomeSplash = (props) => {
  return (
    <Paper className={props.classes.paper} elevation={0}>
    <Typography type="display1" component="h1" gutterBottom={true} className={props.classes.typography}>
      Your drops
    </Typography>
    </Paper>
 )
}

export default withStyles(styleSheet)(HomeSplash);
