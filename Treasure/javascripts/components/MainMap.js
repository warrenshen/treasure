// Libraries
import React, { Component } from 'react';

// UI
import {
  StyleSheet,
} from 'react-native';

import Requester from '../helpers/requester';

import MapView from 'react-native-maps';

class MainMap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      latitude: 37.78825,
      longitude: -122.4324,
      markers: [],
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
      (geoNotes) => this.setState({ markers: geoNotes })
    );
    navigator.geolocation.getCurrentPosition(
      (response) => {
        const coords = response.coords;
        this.setState({
          latitude: coords.latitude,
          longitude: coords.longitude,
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

  render() {
    const {
      latitude,
      longitude,
    } = this.state;
    return (
      <MapView
        followsUserLocation={true}
        loadingEnabled={true}
        mapType={'standard'}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsBuildings={false}
        showsTraffic={false}
        showsUserLocation={true}
        style={styles.map}
      >
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
