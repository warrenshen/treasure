// Libraries
import React, { Component, PropTypes } from 'react';

// UI
import {
  View,
  Image,
  StyleSheet,
} from 'react-native';

import NewMarker from './NewMarker.js';
import Requester from '../utils/requester';
import { meterDistance } from '../utils/geo.js';

import MapView from 'react-native-maps';


class MainMap extends Component {
  static propTypes = {
    isPostingNote: PropTypes.bool.isRequired,
    updatePostCoord: PropTypes.func.isRequired,
    onMarkerPress: PropTypes.func.isRequired,
    legalPostRadius: PropTypes.number.isRequired,
    markers: PropTypes.array.isRequired,
  };

  static defaultProps = {
    legalPostRadius: 75, // meters
  };

  constructor(props) {
    super(props);
    this.state = {
      latitude: 37.78825,
      longitude: -122.4324,
      isPostingNote: false,
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

  componentWillReceiveProps(nextProps) {
    if (!this.props.isPostingNote && nextProps.isPostingNote) {
      this.props.updatePostCoord(this.state.markerCoord, true);
    }
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  _onMarkerDragEnd = (region) => {
    if (!this.props.isPostingNote) return;

    const { latitude, longitude } = this.state;
    const postDistance = meterDistance({latitude, longitude}, region);

    this.props.updatePostCoord(region, postDistance < this.props.legalPostRadius);
  }

  // TODO: Turn off the preview onpress for Marker

  render() {
    const {
      latitude,
      longitude,
    } = this.state;
    const {
      isPostingNote,
      legalPostRadius,
      markers,
      onMarkerPress,
    } = this.props;
    return (
      <View style={styles.container}>
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
          showsUserLocation={!isPostingNote}
          style={styles.map}
          onRegionChangeComplete={this._onMarkerDragEnd}
        >
          <MapView.Circle
            center={{
              latitude: latitude,
              longitude: longitude,
            }}
            key={`circle_${latitude}_${longitude}`}
            radius={legalPostRadius}
            fillColor={'#0591FF33'}
            strokeColor={'#66666666'}
          />
          {markers.map(marker => console.log(marker) || (
            <MapView.Marker
              coordinate={{
                latitude: parseFloat(marker.latitude),
                longitude: parseFloat(marker.longitude),
              }}
              onSelect={() => onMarkerPress(marker.note_text, marker.id, marker.popularity)}
              key={marker.id}
            >
              <Image source={require('../../images/pin.png')} style={styles.pin} />
            </MapView.Marker>
          ))}
        </MapView>
        {isPostingNote &&
          <View style={styles.iconContainer} pointerEvents={'none'}>
            <NewMarker />
          </View>
        }
      </View>
    );
  }
}

// --------------------------------------------------
// Styles
// --------------------------------------------------
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 64,
    left: 0,
    right: 0,
    bottom: 48,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pin: {
    width: 60,
    height: 60,
    opacity: 0.8,
  }
});

export default MainMap;
