// Libraries
import React, { Component } from 'react';
import update from 'react-addons-update';

// UI
import {
  Navigator,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Requester from '../utils/requester';
import CreateNoteModal from './CreateNoteModal';
import MainMap from './MainMap';
import NavbarButton from './NavbarButton'

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
                return isPostingNote && (
                  <NavbarButton
                    textContent={'Cancel'}
                    onPress={() => this.setState({ isPostingNote: false })}
                  />
                );
              },
              RightButton: (route, navigator, index, navState) => {
                return isPostingNote ? (
                  <NavbarButton
                    disabled={!coordIsValid}
                    imageSource={require('../../images/write.png')}
                    onPress={() => navigator.push(mapRoutes[1])}
                  />
                ) : (
                  <NavbarButton
                    imageSource={require('../../images/write.png')}
                    onPress={() => this.setState({
                      coordIsValid: true,
                      isPostingNote: true,
                    })}
                  />
                );
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
    paddingTop: 10,
    color: 'white',
    fontFamily: 'JosefinSans-Bold',
    fontSize: 24,
  },
});

export default MapPage;
