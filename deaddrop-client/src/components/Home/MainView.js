import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import DropList from '../DropList';
import { withStyles, createStyleSheet } from 'material-ui/styles';

const styleSheet = createStyleSheet('MainView', theme => ({
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minHeight: '100%',
  }
}));

const MainView = (props) => {
  return (
    <Grid container gutter={0}>
      <Grid item xs={12} sm={4}>
        <Paper className={props.classes.paper} elevation={1}>
          <Typography type="headline" component="h3">
            DropMenu
          </Typography>
          <Typography type="body1" component="p">
            <DropList />
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Paper className={props.classes.paper} elevation={1}>
          <Typography type="headline" component="h3">
            DropLocator
          </Typography>
          <Typography type="body1" component="p">
          Body
          </Typography>
        </Paper>
      </Grid>
    </Grid>
 )
}

export default withStyles(styleSheet)(MainView);
