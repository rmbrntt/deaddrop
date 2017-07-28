import {dropsClient} from '../DropClient';
import React, {Component, cloneElement} from 'react';
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import List, {ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import {FormGroup} from 'material-ui/Form';
import {LabelCheckbox} from 'material-ui/Checkbox';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import FolderIcon from 'material-ui-icons/Folder';
import DeleteIcon from 'material-ui-icons/Delete';
import CircularIndeterminate from './CircularIndeterminate';

const styleSheet = createStyleSheet('DropContainer', theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752
  },
  listElement: {
    background: theme.palette.background.paper
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`
  }
}));

const DropList = (props) => {

  const {dense, secondary, drops, fetched, classes} = props;

  if (!drops) {
    return (<CircularIndeterminate/>)
  }

  if (drops.length === 0) {
    <Typography type="headline" component="h3">
      No drops.
    </Typography>
  }

  else {
    return (
      <div className={classes.listElement}>
        <List dense={dense}>
        {
          drops.map(drop =>
          <ListItem button>
            <ListItemText primary={drop.username} secondary={`${drop.lat}, ${drop.lng}`}/>
          </ListItem>
        )}
        </List>
      </div>
    )
  }
}

export default withStyles(styleSheet)(DropList);
