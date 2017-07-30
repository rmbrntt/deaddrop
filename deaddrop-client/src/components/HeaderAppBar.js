// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import PublicIcon from 'material-ui-icons/Public'

const styleSheet = createStyleSheet('HeaderAppBar', {
  root: {
    marginTop: 0,
    paddingTop: 75,
    width: '100%',
  },
  flex: {
    flex: 1,
  },
});

const HeaderAppBar = (props) => {
  const classes = props.classes;
  return (
    <div className={classes.root}>
      <AppBar position="fixed" elevation={3}>
        <Toolbar>
          <IconButton color="contrast" aria-label="Menu">
            <PublicIcon />
          </IconButton>
          <Typography type="title" color="inherit" className={classes.flex}>
            {props.appName}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

HeaderAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(HeaderAppBar);
