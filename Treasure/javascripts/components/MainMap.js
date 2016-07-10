// Libraries
import React, { Component, PropTypes } from 'react';

// UI
import {
  StyleSheet,
} from 'react-native';

import Requester from '../helpers/requester';

import MapView from 'react-native-maps';

class MainMap extends Component {
  static propTypes = {
    isPostingNote: PropTypes.bool.isRequired,
    updatePostCoord: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      latitude: 37.78825,
      longitude: -122.4324,
      markers: [],
      isPostingNote: false,
    };
    this.watchID = null;
  }

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  componentDidMount() {
    Requester.get(
      'http://localhost:3000/geo_notes',
      {},
      (geoNotes) => {
        geoNotes = geoNotes.filter((e) => (e.latitude && e.longitude));
        this.setState({ markers: geoNotes });
      }
    );
    navigator.geolocation.getCurrentPosition(
      (response) => {
        const coords = response.coords;
        this.setState({
          latitude: coords.latitude,
          longitude: coords.longitude,
          markerCoord: coords,
        });
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    this.watchID = navigator.geolocation.watchPosition(
      (response) => {
        const coords = response.coords;
        this.setState({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
      }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  _onMarkerDragEnd = (e) => {
    const coord = e.nativeEvent.coordinate;
    this.props.updatePostCoord(coord);
    this.setState({ markerCoord: coord });
  }

  render() {
    const {
      latitude,
      longitude,
      markerCoord,
    } = this.state;
    const { isPostingNote } = this.props;
    return (
      <MapView
        followsUserLocation={!isPostingNote}
        loadingEnabled={true}
        mapType={'standard'}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        showsBuildings={false}
        showsTraffic={false}
        showsUserLocation={true}
        style={styles.map}
      >
      {isPostingNote &&
        <MapView.Marker
          draggable
          coordinate={markerCoord}
          key={`posting_marker`}
          onDragEnd={this._onMarkerDragEnd}
        />
      }
      {this.state.markers.map(marker => (
        <MapView.Marker
          coordinate={{
            latitude: parseFloat(marker.latitude),
            longitude: parseFloat(marker.longitude),
          }}
          description={'Description'}
          key={marker.id}
          title={'Test'}
        />
      ))}
      </MapView>
    );
  }
}

// --------------------------------------------------
// Styles
// --------------------------------------------------
const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default MainMap;
