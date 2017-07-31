// @flow weak

import React, { Component } from 'react';
import { connect } from 'react-redux';
import agent from '../agent';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';


const styleSheet = createStyleSheet(theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
}));


const mapDispatchToProps = dispatch => ({
  onClick: (payload) =>
    dispatch({ type: 'CREATE_DROP', payload })
});



const AddDropForm = (props) => {
  const create = (drop) => {
    const payload = agent.Drops.create(drop);
    props.onClick(payload, props.activeMarker.key)
    props.handleDialogClose();
  }

  return (
    <Dialog open={props.open} onRequestClose={props.handleDialogClose}>
      <DialogTitle>
        {props.title}
      </DialogTitle>
      <DialogContent>
        <TextField
          id="title"
          label="Title"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="title"
          label="Title"
          className={classes.textField}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleDialogClose} color="primary">
          Disagree
        </Button>
        <Button onClick={del} color="primary">
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default connect(() => ({}), mapDispatchToProps)(AddDropForm);
