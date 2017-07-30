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
import InfoOutlineIcon from 'material-ui-icons/InfoOutline';
import CircularIndeterminate from './CircularIndeterminate';

const styleSheet = createStyleSheet('DropList', theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 500
  },
  listElement: {
    background: theme.palette.background.paper
  },

}));

const DropList = (props) => {
  const {dense, secondary, drops, classes} = props;

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
            <ListItemText primary={drop.title} secondary={drop.description} />
            <ListItemSecondaryAction>
              <IconButton aria-label="Info">
                <InfoOutlineIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        )}
        </List>
      </div>
    )
  }
}

export default withStyles(styleSheet)(DropList);
