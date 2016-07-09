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

import CreateNoteModal from './components/CreateNoteModal';
import MainMap from './components/MainMap';

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
      createNoteModalIsVisible: false,
    };
  }

  // --------------------------------------------------
  // Event Handlers
  // --------------------------------------------------
  _handleShowCreateNoteModal() {
      this.setState({createNoteModalIsVisible: true});
  }

  _handleHideCreateNoteModal() {
      this.setState({createNoteModalIsVisible: false});
  }

  _handlePostNote() {
    // TODO(shimmy):
  }

  render() {
    const {createNoteModalIsVisible} = this.state;
    return (
      <View style={styles.container}>
        <MainMap />
        <CreateNoteModal
          isVisible={createNoteModalIsVisible}
          onCancel={this._handleHideCreateNoteModal.bind(this)}
          onPost={this._handlePostNote.bind(this)}
        />
        <TouchableHighlight
            onPress={() => {
              this._handleShowCreateNoteModal()
            }}
            style={styles.button}>
          <Text>Create Post</Text>
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

});

AppRegistry.registerComponent('Treasure', () => Treasure);
