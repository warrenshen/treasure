// Libraries
import React, { Component } from 'react';

// UI
import {
  StyleSheet,
} from 'react-native';

import MapView from 'react-native-maps';

class MainMap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      latitude: 37.78825,
      longitude: -122.4324,
    };
    this.watchID = null;
  }

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  componentDidMount() {
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
      {[1].map(marker => (
        <MapView.Marker
          coordinate={{
            latitude: 37.484556,
            longitude: -122.147845,
          }}
          description={'Description'}
          key={marker}
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
