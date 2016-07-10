// Libraries
import React, { Component } from 'react';

// UI
import {
  Navigator,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import CreateNoteModal from '../components/CreateNoteModal';
import MainMap from '../components/MainMap';

class MapPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalIsVisible: false,
      isPostingNote: false,
    };
  }

  _handleShowModal = () => {
    this.setState({ modalIsVisible: true });
  }

  _handlePostNote = () => {
    this.setState({
      isPostingNote: false,
      modalIsVisible: false
    });
  }

  _handleHideModal = () => {
    this.setState({ modalIsVisible: false });
  }

  _postNoteHandler = () => {
    const { isPostingNote } = this.state;
    if (isPostingNote) {
      this.setState({ modalIsVisible: true });
    } else {
      this.setState({ isPostingNote: !isPostingNote });
    }
  }

  _updatePostCoord = (postCoord) => {
    this.setState({ postCoord });
  }

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  render() {
    const { isPostingNote } = this.state;
    return (
      <Navigator
        initialRoute={{ index: 0, title: 'Explore' }}
        navigationBar={(
          <Navigator.NavigationBar
            routeMapper={{
              LeftButton: () => null,
              RightButton: () => null,
              Title: (route, navigator, index, navState) => (
                <Text style={styles.text}>Treasure</Text>
              ),
            }}
            style={styles.navbar}
          />
        )}
        renderScene={(route, navigator) => (
          <View style={styles.container}>
            <MainMap
              isPostingNote={isPostingNote}
              updatePostCoord={this._updatePostCoord}
            />
            <CreateNoteModal
              isVisible={this.state.modalIsVisible}
              onCancel={this._handleHideModal}
              onPost={this._handlePostNote}
            />
            <TouchableHighlight
              onPress={this._postNoteHandler}
              style={styles.button}
            >
              <Text>
                {isPostingNote ? 'Set Location' : 'Post Note'}
              </Text>
            </TouchableHighlight>
          </View>
        )}
      />
    );
  }
}

// --------------------------------------------------
// Styles
// --------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
  },
  button: {
    backgroundColor: '#eeeeee',
    padding: 10,
    marginRight: 5,
    marginLeft: 5,
  },
  navbar: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF765F',
    shadowColor: '#333333',
    shadowOffset: {
      height: 1,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
  },
  text: {
    paddingTop: 8,
    color: 'white',
  },
});

export default MapPage;
