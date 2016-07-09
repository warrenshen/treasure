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

  // TODO(shimmy): Consider making a component for the modal so we can use it for viewing posts too.

  render() {
    return (
      <View style={styles.container}>
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
        <MapView
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={styles.map}
        />
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
