// Libraries
import React, { Component, PropTypes } from 'react';

// UI
import {
  View,
  Image,
  StyleSheet,
} from 'react-native';

import Requester from '../utils/requester';
import { meterDistance } from '../utils/geo.js';

import MapView from 'react-native-maps';
import NewMarker from './NewMarker.js';


class MainMap extends Component {
  static propTypes = {
    queryMarkers: PropTypes.func.isRequired,
    isPostingNote: PropTypes.bool.isRequired,
    updatePostCoord: PropTypes.func.isRequired,
    onMarkerPress: PropTypes.func.isRequired,
    legalPostRadius: PropTypes.number.isRequired,
    legalViewRadius: PropTypes.number.isRequired,
    markers: PropTypes.array.isRequired,
    treasures: PropTypes.array.isRequired,
  };

  static defaultProps = {
    // Radii in meters
    legalPostRadius: 100,
    legalViewRadius: 500,
  };

  constructor(props) {
    super(props);
    this.state = {
      isInitializing: true,
      latitude: 37.78825,
      longitude: -122.4324,
      markerCoord: {},
    };
    this.watchID = null;
  }

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition(
      (response) => {
        const coords = response.coords;
        if (this.state.isInitializing) {
          this.props.queryMarkers(coords);
        }
        this.setState({
          isInitializing: false,
          latitude: coords.latitude,
          longitude: coords.longitude,
          markerCoord: coords,
        });
      },
      (error) => alert(error.message)
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

  renderCircle() {
    const {
      latitude,
      longitude,
    } = this.state;
    const {
      isPostingNote,
      legalPostRadius,
      legalViewRadius,
    } = this.props;
    return (
      <MapView.Circle
        center={{
          latitude: latitude,
          longitude: longitude,
        }}
        fillColor={!isPostingNote ? '#0591FF33' : '#FF765F33'}
        key={`circle_${!isPostingNote ? 'view' : 'post'}_${latitude}_${longitude}`}
        radius={!isPostingNote ? legalViewRadius : legalPostRadius}
        strokeColor={'#66666666'}
      />
    );
  }

  renderMarkers() {
    const {
      latitude,
      longitude,
    } = this.state;
    const {
      legalViewRadius,
      markers,
      onMarkerPress,
    } = this.props;
    return markers.map(marker => {
      const markerLongitude = parseFloat(marker.longitude);
      const markerLatitude = parseFloat(marker.latitude);
      const markerDistance = meterDistance(
        {
          longitude: markerLongitude,
          latitude: markerLatitude,
        },
        {
          longitude: longitude,
          latitude: latitude,
        }
      );
      if (markerDistance < legalViewRadius) {
        return (
          <MapView.Marker
            coordinate={{
              longitude: markerLongitude,
              latitude: markerLatitude,
            }}
            key={marker.id}
            onSelect={() => onMarkerPress(marker)}
          >
            {marker.popularity > 20 ?
              <Image source={require('../../images/pin-treasure.png')} style={styles.pin} /> :
              <Image source={require('../../images/pin.png')} style={styles.pin} />
            }
          </MapView.Marker>
        );
      }
    });
  }

  render() {
    const {
      isInitializing,
      latitude,
      longitude,
    } = this.state;
    const {
      isPostingNote,
    } = this.props;
    return (
      <View style={styles.container}>
        {!isInitializing && (
          !isPostingNote ? (
            <MapView
              followsUserLocation={!isPostingNote}
              initialRegion={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              loadingEnabled={true}
              mapType={'standard'}
              onRegionChangeComplete={this._onMarkerDragEnd}
              region={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              showsBuildings={false}
              showsTraffic={false}
              showsUserLocation={!isPostingNote}
              style={styles.map}
            >
              {this.renderCircle()}
              {this.renderMarkers()}
              <MapView.Marker
                coordinate={{
                  latitude: latitude,
                  longitude: longitude,
                }}
                image={require('../../images/pirate-me.png')}
                key={`pirate_view_${latitude}_${longitude}`}
              />
            </MapView>
          ) : (
            <MapView
              followsUserLocation={!isPostingNote}
              initialRegion={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              loadingEnabled={true}
              mapType={'standard'}
              onRegionChangeComplete={this._onMarkerDragEnd}
              showsBuildings={false}
              showsTraffic={false}
              showsUserLocation={!isPostingNote}
              style={styles.map}
            >
              {this.renderCircle()}
              {this.renderMarkers()}
            </MapView>
          )
        )}
        {isPostingNote && (
          <View style={styles.iconContainer} pointerEvents={'none'}>
            <NewMarker />
          </View>
        )}
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
  },
  pirate: {
    width: 60,
    height: 60,
  }
});

export default MainMap;
