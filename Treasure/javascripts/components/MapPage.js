// Libraries
import React, { Component } from 'react';
import update from 'react-addons-update';

// UI
import {
  Image,
  Navigator,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import Requester from '../utils/requester';
import CreateNoteModal from '../components/CreateNoteModal';
import MainMap from '../components/MainMap';

const mapRoutes = [
  { index: 0, title: 'Treasure' },
  { index: 1, title: 'Note' },
];

class MapPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      coordIsValid: true,
      isPostingNote: false,
      markers: [],
      postCoord: { latitude: 0, longitude: 0 },
    };
  }

  componentWillMount() {
    Requester.get(
      'http://localhost:3000/geo_notes', {},
      (geoNotes) => {
        geoNotes = geoNotes.filter((e) => e.latitude &&
                                          e.longitude &&
                                          e.note_text);
        this.setState({ markers: geoNotes });
      }
    );
  }

  _handleShowModal = () => {
    this.setState({ modalIsVisible: true });
  }

  _handlePostNote = (noteText, navigator) => {
    this.setState({ isPostingNote: false });

    const { postCoord } = this.state;
    var params = {
      note_text: noteText,
      latitude: postCoord.latitude,
      longitude: postCoord.longitude,
    };
    Requester.post(
      'http://localhost:3000/geo_notes',
      params,
      (newNote) => {
        this.setState(update(this.state, { markers: { $push: [newNote] } }));
        navigator.pop();
      }
    );
  }

  _handleHideModal = () => {
    this.setState({ modalIsVisible: false });
  }

  _updatePostCoord = (postCoord, coordIsValid) => {
    this.setState({
      postCoord,
      coordIsValid,
    });
  }

  _postNoteHandler = (navigator) => {
    const { isPostingNote } = this.state;
    if (isPostingNote) {
      navigator.push(mapRoutes[1]);
    } else {
      this.setState({ isPostingNote: !isPostingNote });
    }
  }

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  render() {
    const {
      coordIsValid,
      isPostingNote,
      markers,
      postCoord,
    } = this.state;
    return (
      <Navigator
        initialRoute={mapRoutes[0]}
        initialRoutes={mapRoutes}
        navigationBar={(
          <Navigator.NavigationBar
            routeMapper={{
              LeftButton: (route, navigator, index, navState) => {
                if (isPostingNote) {
                  return (
                    <TouchableHighlight
                      onPress={() => this.setState({ isPostingNote: false })}
                      style={styles.button}
                    >
                      <Text>Cancel</Text>
                    </TouchableHighlight>
                  );
                }
              },
              RightButton: (route, navigator, index, navState) => {
                let postNoteButtons;
                if (isPostingNote) {
                  postNoteButtons = (
                    <TouchableHighlight
                      disabled={!coordIsValid}
                      onPress={() => navigator.push(mapRoutes[1])}
                      style={styles.button}
                    >
                      <Text>
                        {coordIsValid ? 'Set Location' : 'Fuck you, user.'}
                      </Text>
                    </TouchableHighlight>
                  );
                } else {
                  postNoteButtons = (
                    <TouchableHighlight
                      onPress={() => {this.setState({
                        coordIsValid: true,
                        isPostingNote: true,
                      });}}
                      style={styles.button}
                    >
                      <Image
                        source={require('../../images/write.png')}
                        style={styles.image}
                      />
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
                  markers={markers}
                  updatePostCoord={this._updatePostCoord}
                />
              </View>
            );
          } else {
            return (
              <CreateNoteModal
                isVisible={true}
                onCancel={this._handleHideModal}
                onPost={(text) => this._handlePostNote(text, navigator)}
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
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
  },
  image: {
    width: 30,
    height: 30,
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
    fontFamily: 'JosefinSans-Bold',
    fontSize: 24,
  },
});

export default MapPage;
