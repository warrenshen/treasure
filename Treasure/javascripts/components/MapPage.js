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

  _unhideModal = () => {

  }

  _updatePostCoord = (postCoord, postCoordIsValid) => {
    this.setState({
      postCoord,
      postCoordIsValid,
    });
  }

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  render() {
    const { isPostingNote, postCoordIsValid } = this.state;

    let postNoteButtons;
    if (isPostingNote) {
      postNoteButtons = [(
        <TouchableHighlight
          onPress={() => this.setState({ modalIsVisible: true })}
          style={styles.button}
          disabled={!postCoordIsValid}
          key={1}
        >
          <Text>
            {postCoordIsValid ? 'Set Location' : 'Fuck you, user.'}
          </Text>
        </TouchableHighlight>
      ), (
        <TouchableHighlight
          onPress={() => this.setState({ isPostingNote: false })}
          style={styles.button}
          key={2}
        >
          <Text>Cancel</Text>
        </TouchableHighlight>
      )]
    } else {
      postNoteButtons = (
        <TouchableHighlight
          onPress={() => this.setState({
            isPostingNote: true,
            postCoordIsValid: true,
          })}
          style={styles.button}
        >
          <Text>Post Note</Text>
        </TouchableHighlight>
      )
    }

    return (
      <Navigator
        initialRoute={{ index: 0, title: 'Explore' }}
        navigationBar={(
          <Navigator.NavigationBar
            routeMapper={{
              LeftButton: (route, navigator, index, navState) =>
               { return (<Text>Cancel</Text>); },
              RightButton: (route, navigator, index, navState) =>
                { return (<Text>Done</Text>); },
              Title: (route, navigator, index, navState) =>
                { return (
                  <View style={styles.titleContainer}>
                    <Text style={styles.text}>Treasure</Text>
                  </View>
                ); },
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
            {postNoteButtons}
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
    backgroundColor: '#FF765F',
  },
  text: {
    color: 'white',
  },
  title: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
});

export default MapPage;
