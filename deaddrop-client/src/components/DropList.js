import React, {Component, cloneElement} from 'react';
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import List, {ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import {FormGroup} from 'material-ui/Form';
import {LabelCheckbox} from 'material-ui/Checkbox';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import InfoOutlineIcon from 'material-ui-icons/InfoOutline';
import AnnouncementIcon from 'material-ui-icons/Announcement';
import CircularIndeterminate from './CircularIndeterminate';

const styleSheet = createStyleSheet('DropList', theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 500
  },
  listElement: {
    background: theme.palette.background.paper
  },
  noDropsPaper: {
    textAlign: 'left',
    padding: 10,
    minHeight: '100%',
    minWidth: '100%',
    verticalAlign: 'center',
    display: 'flex'
  },

}));

const DropList = (props) => {
  const {dense, secondary, drops, classes} = props;



  if (!drops) {
    return (<CircularIndeterminate/>)
  }

  if (Object.keys(drops).length === 0) {
    return (
      <Paper className={classes.noDropsPaper}>

        <Typography component="span">
          There are no marked drops, add one to the map.
        </Typography>

      </Paper>
)
  }

  else {
    return (
      <div className={classes.listElement}>
        <List dense={dense}>
        {
          drops.map(drop => {
            const createdAt = new Date(drop.createdAt)
            return (
          <ListItem button data-dropid={drop.id} data-lat={drop.lat} data-lng={drop.lng} onClick={(e) => props.handleDropItemClick(e)}>
            <ListItemText primary={drop.title} secondary={`Created: ${createdAt.toDateString()}`} />
            <ListItemSecondaryAction>
              <IconButton aria-label="Info">
                <InfoOutlineIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        )})}
        </List>
      </div>
    )
  }
}

export default withStyles(styleSheet)(DropList);
