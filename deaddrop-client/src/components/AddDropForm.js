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


const styleSheet = createStyleSheet('AddDropForm', theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    display: "block",
  },
}));

const mapStateToProps = state => ({
  title: state.title,
  message: state.message
})

const mapDispatchToProps = dispatch => ({
  onSubmit: (payload) =>
    dispatch({ type: 'SUBMIT_DROP', payload }),
  onUpdateField: (key, value) =>
    dispatch({ type: 'UPDATE_FIELD_DROP_FORM', key, value }),
  onLoad: payload =>
    dispatch({ type: 'DROP_FORM_LOADED', payload}),
  onUnload: payload =>
    dispatch({ type: 'DROP_FORM_UNLOADED' })
});


class AddDropForm extends Component {
  constructor() {
    super();
    const updateFieldEvent = key => ev => this.props.onUpdateField(key, ev.target.value);
    this.changeTitle = updateFieldEvent('title');
    this.changeMessage = updateFieldEvent('message');

    this.submitForm = ev => {
      ev.preventDefault();
      console.log(this.props.title)
      const drop = {
        title: this.props.title,
        message: this.props.message,
        lat: this.props.lat,
        lng: this.props.lng
      };

      const id = { dropId: this.props.dropId };
      const promise = this.props.dropId ?
        agent.Drops.update(Object.assign(drop, id)) :
        agent.Drops.create(drop)

        this.props.onSubmit(promise);
        this.props.handleAddDropFormClose();
        this.props.onLoad(null);
    }
  }

  componenWillReceiveProps(nextProps) {
    console.log(nextProps)
  }

  render() {
    return (
      <Dialog open={this.props.open} onRequestClose={this.props.handleAddDropFormClose}>
        <DialogTitle>
          Add a new drop location.
        </DialogTitle>
        <DialogContent>
          <TextField
            id="title"
            label="Title"
            className={this.props.classes.textField}
            margin="normal"
            onChange={this.changeTitle}
            value={this.props.title}
          />
          <TextField
            id="message"
            label="Message"
            multiline
            rowsMax="4"
            className={this.props.classes.textField}
            margin="normal"
            onChange={this.changeMessage}
            value={this.props.message}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleAddDropFormClose} color="primary">
            Disagree
          </Button>
          <Button onClick={this.submitForm} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}




export default connect(() => mapStateToProps, mapDispatchToProps)(withStyles(styleSheet)(AddDropForm));
