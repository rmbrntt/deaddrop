import {config} from '../config';
import _ from "lodash";
import Snackbar from 'material-ui/Snackbar';
import CircularIndeterminate from './CircularIndeterminate';
import AlertDialog from './AlertDialog';
import {
  default as React,
  Component,
  PropTypes,
} from "react";
import withScriptjs from 'react-google-maps/lib/async/withScriptjs';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
  Circle
} from "react-google-maps";
import canUseDOM from "can-use-dom";
import raf from "raf";


const geolocation = (
  canUseDOM && navigator.geolocation ?
  navigator.geolocation :
  ({
    getCurrentPosition(success, failure) {
      failure(`Your browser doesn't support geolocation.`);
    },
  })
);

const AsyncGoogleMap = _.flowRight(
  withScriptjs,
  withGoogleMap,
)(props => (
  <GoogleMap
    defaultZoom={13}
    onClick={props.onMapClick}
    center={props.center}
  >

    {props.markers.map(marker => {
      const onCloseClick = () => props.onCloseClick(marker);

      return (
        <Marker
          {...marker}
          onRightClick={() => props.onMarkerRightClick(marker)}
          onClick={() => props.onMarkerClick(marker)}
          >
        {marker.showInfo && (
          <InfoWindow onCloseClick={onCloseClick}>
            <div>
              <strong>{marker.title}</strong>
              <br />
              <em>{marker.message}</em>
            </div>
          </InfoWindow>
        )}
      </Marker>
    )})}
    {props.center && (
      <InfoWindow position={props.center}>
        <div>{props.content}</div>
      </InfoWindow>
    )}
    {props.center && (
      <Circle
        center={props.center}
        radius={props.radius}
        options={{
          fillColor: `red`,
          fillOpacity: 0.20,
          strokeColor: `red`,
          strokeOpacity: 1,
          strokeWeight: 1,
        }}
      />
    )}
  </GoogleMap>
));

export default class Map extends Component {
  state = {
    markers: [{
      position: {
        lat: 0,
        lng: 0,
      },
      key: "default",
      defaultAnimation: 2,
      title: "title",
      message: "message",
    }],
    snackbarOpen: false,
    snackbarVertical: null,
    snackbarHorizontal: null,
    snackbarMessage: null,
    center: this.props.center || null,
    content: null,
    radius: 6000,
    dialog: {
      open: false,
      title: "",
      content: "",
    },
    addDropForm: {
      open: false,
    }
  }

  isUnmounted = false;

  handleMapClick = this.handleMapClick.bind(this);
  handleMarkerRightClick = this.handleMarkerRightClick.bind(this);
  handleMarkerClick = this.handleMarkerClick.bind(this);
  handleCloseClick = this.handleCloseClick.bind(this);



  handleMapClick(event) {
    const nextMarkers = [
      ...this.state.markers,
      {
        position: event.latLng,
        defaultAnimation: 2,
        key: Date.now(),
        title: "title",
        message: "just another drop",
        showInfo: false,
      },
    ];
    this.setState({
      markers: nextMarkers,
    });

    if (nextMarkers.length === 3) {
      this.setState({ snackbarOpen: true, snackbarMessage: 'Right click a marker to delete.' })
    }
  }

  handleMarkerRightClick(targetMarker) {
    //console.log(targetMarker)
    this.setState({
      dialog: {
      open: true,
      title: "Delete drop marker?",
      content: "This will remove the drop location from the map.",
    },
      activeMarker: targetMarker,
  })
  }

  handleMarkerClick(targetMarker) {
  this.setState({
    markers: this.state.markers.map(marker => {
      if (marker === targetMarker) {
        return {
          ...marker,
          showInfo: true,
        };
      }
      return marker;
    }),
  });
}

handleCloseClick(targetMarker) {
  this.setState({
    markers: this.state.markers.map(marker => {
      if (marker === targetMarker) {
        return {
          ...marker,
          showInfo: false,
        };
      }
      return marker;
    }),
  });
}

  handleSnackbarClose = () => {
    this.setState({ snackbarOpen: false });
  };


  handleDialogClose = () => {
    this.setState({ dialog: {...this.state.dialog, open: false}})
  };

  componentDidMount() {
    const tick = () => {
      if (this.isUnmounted) {
        return;
      }
      this.setState({ radius: Math.max(this.state.radius - 100, 0) });

      if (this.state.radius > 5) {
        raf(tick);
      }
    };
    geolocation.getCurrentPosition((position) => {
      if (this.isUnmounted) {
        return;
      }
      this.setState({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        snackbarOpen: true,
        snackbarMessage: 'Location found.',
        content: "You."
      });

      raf(tick);

    }, (reason) => {
      if (this.isUnmounted) {
        return;
      }
      this.setState({
        center: {
          lat: 60,
          lng: 105,
        },
        snackbarOpen: true,
        snackbarMessage: `Error: The Geolocation service failed (${reason}).`,
      });
    });
  }


  componentWillReceiveProps(nextProps) {
    const dropMarkers = nextProps.drops.map(drop => (
           {
            position: {
              lat: parseFloat(drop.lat),
              lng: parseFloat(drop.lng),
            },
            defaultAnimation: 2,
            key: drop.id,
            title: drop.title,
            message: drop.message,
            showInfo: false,
          }
    ));
      this.setState({
        markers: dropMarkers,
    });
    this.setState({ center: nextProps.center, showInfo: false, })
    }


  componentWillUnmount() {
    this.isUnmounted = true;
  }

  render() {
    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={this.state.snackbarOpen}
          onRequestClose={this.handleSnackbarClose}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.snackbarMessage}</span>}
        />

        <AlertDialog
          open={this.state.dialog.open}
          title={this.state.dialog.title}
          content={this.state.dialog.content}
          activeMarker={this.state.activeMarker}
          handleDialogClose={this.handleDialogClose}
        />
        <AsyncGoogleMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${config.GOOGLE_MAPS_API_KEY}`}
          loadingElement={
            <div style={{ height: `100%` }}>
              <CircularIndeterminate />
             </div>
          }
          containerElement={
            <div style={{ height: `100%` }} />
          }
          mapElement={
            <div style={{ height: `75vh` }} />
          }
          onMapClick={this.handleMapClick}
          markers={this.state.markers}
          onMarkerRightClick={this.handleMarkerRightClick}
          onMarkerClick={this.handleMarkerClick}
          onCloseClick={this.handleCloseClick}
          center={this.state.center}
          content={this.state.content}
          radius={this.state.radius}
        />
      </div>

    );
  }
}
