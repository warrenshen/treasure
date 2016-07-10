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

const routes = [
  { index: 0, title: 'Treasure' },
  { index: 1, title: 'Note' },
];

class MapPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalIsVisible: false,
      isPostingNote: false,
      postCoordIsValid: true,
    };
  }

  _handleShowModal = () => {
    this.setState({ modalIsVisible: true });
  }

  _handlePostNote = (navigator) => {
    this.setState({
      isPostingNote: false,
    });
    navigator.pop();
  }

  _handleHideModal = () => {
    this.setState({ modalIsVisible: false });
  }

  _updatePostCoord = (postCoord, postCoordIsValid) => {
    this.setState({
      postCoord,
      postCoordIsValid,
    });
  }

  _postNoteHandler = (navigator) => {
    const { isPostingNote } = this.state;
    if (isPostingNote) {
      navigator.push(routes[1]);
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
  /*
  <TouchableHighlight
    onPress={() => this.setState({ isPostingNote: false })}
    style={styles.button}
    key={2}
  >
    <Text>Cancel</Text>
  </TouchableHighlight>
  */
  render() {
    const { isPostingNote, postCoordIsValid } = this.state;
    return (
      <Navigator
        initialRoute={routes[0]}
        initialRoutes={routes}
        navigationBar={(
          <Navigator.NavigationBar
            routeMapper={{
              LeftButton: () => null,
              RightButton: (route, navigator, index, navState) => {
                let postNoteButtons;
                if (isPostingNote) {
                  postNoteButtons = (
                    <TouchableHighlight
                      onPress={() => navigator.push(routes[1])}
                      style={styles.button}
                      disabled={!postCoordIsValid}
                      key={1}
                    >
                      <Text>
                        {postCoordIsValid ? 'Set Location' : 'Fuck you, user.'}
                      </Text>
                    </TouchableHighlight>
                  );
                } else {
                  postNoteButtons = (
                    <TouchableHighlight
                      onPress={() => {this.setState({
                        isPostingNote: true,
                        postCoordIsValid: true,
                      });}}
                      style={styles.button}
                    >
                      <Text>Post Note</Text>
                    </TouchableHighlight>
                  );
                }
                return (
                  <View>{postNoteButtons}</View>
                )
              },
              Title: (route, navigator, index, navState) => (
                <Text style={styles.text}>{route.title}</Text>
              ),
            }}
            style={styles.navbar}
          />
        )}
        renderScene={(route, navigator) => {
          if (route.index == 0) {
            return (
              <View style={styles.container}>
                <MainMap
                  isPostingNote={isPostingNote}
                  updatePostCoord={this._updatePostCoord}
                />
              </View>
            );
          } else {
            return (
              <CreateNoteModal
                isVisible={true}
                onCancel={this._handleHideModal}
                onPost={() => this._handlePostNote(navigator)}
              />
            );
        }}}
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
