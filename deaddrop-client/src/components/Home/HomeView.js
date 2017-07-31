import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import DropList from '../DropList';
import Map from '../Map';
import { withStyles, createStyleSheet } from 'material-ui/styles';

const styleSheet = createStyleSheet('HomeView', theme => ({
  paperLeft: {
    padding: 0,
    maxHeight: '75vh',
    overflow: 'auto',
  },
  paperRight: {
    padding: 3,
    color: theme.palette.text.secondary,
    marginRight: 15,
  },
}));

const HomeView = (props) => {
  return (
    <Grid container gutter={8}>
      <Grid item xs={6} sm={3}>
        <Paper className={props.classes.paperLeft} elevation={0}>
            <DropList drops={props.drops} handleDropItemClick={(e) => props.handleDropItemClick(e)}/>
        </Paper>
      </Grid>
      <Grid item xs={18} sm={9}>
        <Paper className={props.classes.paperRight} elevation={10}>
          <Map drops={props.drops} center={props.center}/>
        </Paper>
      </Grid>
    </Grid>
 )
}

export default withStyles(styleSheet)(HomeView);
