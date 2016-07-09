// Libraries
import React, { Component } from 'react';

// UI
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Modal,
} from 'react-native';

import MapView from 'react-native-maps';

class Treasure extends Component {

  // --------------------------------------------------
  // Props
  // --------------------------------------------------
  // --------------------------------------------------
  // State
  // --------------------------------------------------
  constructor(props) {
    super(props);
    this.state = {
      latitude: 37.78825,
      longitude: -122.4324,
      noteCreationModalIsVisible: false,
    };
  }
  // --------------------------------------------------
  // Event Handlers
  // --------------------------------------------------

  _handleShowNoteCreationModal() {
      this.setState({noteCreationModalIsVisible: true});
  }

  _handleHideNoteCreationModal() {
      this.setState({noteCreationModalIsVisible: false});
  }

  _handlePostNote() {
    // TODO(shimmy):
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
    navigator.geolocation.watchPosition(
      (response) => {
        const coords = response.coords;
        this.setState({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
      }
    );
  }

  render() {
    const {
      latitude,
      longitude,
    } = this.state;
    return (
      <View style={styles.container}>
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
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.noteCreationModalIsVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={{marginTop: 22}}>
          <View style={styles.actions}>
            <TouchableHighlight
              onPress={() => {
                this._handlePostNote()
              }}
              style={styles.button}>
              <Text>Post</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => {
                this._handleHideNoteCreationModal()
              }}
              style={styles.button}>
              <Text>Cancel</Text>
            </TouchableHighlight>
          </View>
         </View>
        </Modal>

        <TouchableHighlight
            onPress={() => {
              this._handleShowNoteCreationModal()
            }}
            style={styles.button}>
          <Text>Send</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

// --------------------------------------------------
// Styles
// --------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#eeeeee',
    padding: 10,
    marginRight: 5,
    marginLeft: 5,
  },
  actions: {
    flex: 1,
    flexDirection: 'row',
  },
});

AppRegistry.registerComponent('Treasure', () => Treasure);
