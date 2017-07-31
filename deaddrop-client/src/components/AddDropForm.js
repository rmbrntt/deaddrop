// @flow weak

import React, { Component } from 'react';
import { connect } from 'react-redux';
import agent from '../agent';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';



const mapDispatchToProps = dispatch => ({
  onClick: (payload, dropId) =>
    dispatch({ type: 'DELETE_DROP', payload, dropId})
});



const AlertDialog = (props) => {
  const del = () => {
    const payload = agent.Drops.del(props.activeMarker.key);
    props.onClick(payload, props.activeMarker.key)
    props.handleDialogClose();
  }

  return (
    <Dialog open={props.open} onRequestClose={props.handleDialogClose}>
      <DialogTitle>
        {props.title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {props.content}
        </DialogContentText>
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

export default connect(() => ({}), mapDispatchToProps)(AlertDialog);
