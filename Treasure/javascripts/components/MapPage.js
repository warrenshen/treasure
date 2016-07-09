// Libraries
import React, { Component } from 'react';

// UI
import {
  StyleSheet,
} from 'react-native';

import CreateNoteModal from '../components/CreateNoteModal';
import MainMap from '../components/MainMap';

class MapPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalIsVisible: false,
    };
  }

  _handleShowModal() {
    this.setState({ modalIsVisible: true });
  }

  _handleHideModal() {
    this.setState({ modalIsVisible: false });
  }

  _handlePostNote() {
    // TODO(shimmy):
  }

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  render() {
    return (
      <View style={styles.container}>
        <MainMap />
        <CreateNoteModal
          isVisible={createNoteModalIsVisible}
          onCancel={() => this._handleShowModal}
          onPost={() => this._handlePostNote}
        />
        <TouchableHighlight
          onPress={() => this._handleHideModal()}
          style={styles.button}
        >
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
});

export default MapPage;
