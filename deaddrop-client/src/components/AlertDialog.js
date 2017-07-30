// @flow weak

import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

const AlertDialog = (props) => (
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
      <Button onClick={props.handleDialogConfirm} color="primary">
        Agree
      </Button>
    </DialogActions>
  </Dialog>
);

export default AlertDialog;
