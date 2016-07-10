// Libraries
import React, { Component } from 'react';
import update from 'react-addons-update';

// UI
import {
  Navigator,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
} from 'react-native';

import Requester from '../utils/requester';

import CreatePage from './CreatePage';
import MainMap from './MainMap';
import NavbarButton from './NavbarButton'
import ViewNoteModal from '../components/ViewNoteModal';

const mapRoutes = [
  { index: 0, title: 'Treasure' },
  { index: 1, title: 'Create Note' },
];

class MapPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coordIsValid: true,
      viewNoteModalIsVisible: false,
      currentMarker: null,
      isPostingNote: false,
      markers: [],
      treasures: [],
      postContent: '',
      postImageSource: null,
      postCoord: { latitude: 0, longitude: 0 },
    };
  }

  _queryMarkers = (coords) => {
    const handleGeoNotes = (geoNotes) => {
      geoNotes = geoNotes.filter((e) => e.latitude &&
                                        e.longitude &&
                                        e.note_text);
      this.setState({ markers: geoNotes });
    };
    const handleTreasures = (geoNotes) => {
      geoNotes = geoNotes.filter((e) => e.latitude &&
                                        e.longitude &&
                                        e.note_text);
      this.setState({ treasures: geoNotes });
    };
    Requester.get(
      `${Requester.railsApp}/geo_notes`, {},
      handleGeoNotes,
    );
    Requester.post(
      `${Requester.railsApp}/geo_notes/visible_treasure`,
      {latitude: coords.latitude, longitude: coords.longitude},
      handleTreasures,
    );
  }

  _handlePostChange = (noteText) => {
    this.setState({ postContent: noteText });
  }

  _handleImageSourceChange = (imageSource) => {
    this.setState({ postImageSource: imageSource });
  }

  _handleHideCreateModal = () => {
    this.setState({ createNoteModalIsVisible: false });
  }

  _handleShowViewNoteModal = (marker, treasure = false) => {
    console.log('lol');
    this.setState({
      viewNoteModalIsVisible: true,
      currentMarker: marker,
    });
  }

  _handleHideViewModal = () => {
    this.setState({ viewNoteModalIsVisible: false });
  }

  _handleVote = (up) => {
    var params = {
      id: this.state.currentMarker.id,
    }
    const endpoint = up ? 'upvote' : 'downvote';
    Requester.post(
      `${Requester.railsApp}/geo_notes/${endpoint}`,
      params,
      (marker) => this.setState({currentMarker: marker}),
    );
  }

  _handlePostNote = (navigator) => {
    const {
      postCoord,
      postContent,
      postImageSource,
    } = this.state;

    var params = {
      note_text: postContent,
      latitude: postCoord.latitude,
      longitude: postCoord.longitude,
    };
    if (postImageSource) {
      params.note_image = postImageSource.uri;
    }

    this.setState({ isPostingNote: false });

    Requester.post(
      `${Requester.railsApp}/geo_notes`,
      params,
      (newNote) => {
        this.setState(update(this.state, { markers: { $push: [newNote] } }));
        this.setState({ postContent: '', postImageSource: null });
        navigator.pop();
      }
    );
  }

  _updatePostCoord = (postCoord, coordIsValid) => {
    this.setState({
      postCoord,
      coordIsValid,
    });
  }

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  render() {
    const {
      viewNoteModalIsVisible,
      currentMarker,
      coordIsValid,
      isPostingNote,
      markers,
      treasures,
      postContent,
      postImageSource,
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
                if (index === 0) {
                  return isPostingNote && (
                    <NavbarButton
                      textContent={'Cancel'}
                      onPress={() => this.setState({ isPostingNote: false })}
                    />
                  );
                } else {
                  return (
                    <NavbarButton
                      textContent={'Cancel'}
                      onPress={() => {
                        this.setState({
                          isPostingNote: false,
                        });
                        navigator.pop();
                      }}
                    />
                  );
                }
              },
              RightButton: (route, navigator, index, navState) => {
                if (index === 0) {
                  return !isPostingNote && (
                    <NavbarButton
                      imageSource={require('../../images/write.png')}
                      onPress={() => this.setState({
                        coordIsValid: true,
                        isPostingNote: true,
                      })}
                    />
                  );
                } else {
                  return (
                    <NavbarButton
                      imageSource={require('../../images/write.png')}
                      onPress={() => this._handlePostNote(navigator)}
                    />
                  );
                }
              },
              Title: (route, navigator, index, navState) => (
                <Text style={styles.title}>{route.title}</Text>
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
                  markers={markers}
                  treasures={treasures}
                  onMarkerPress={this._handleShowViewNoteModal}
                  isPostingNote={isPostingNote}
                  updatePostCoord={this._updatePostCoord}
                  queryMarkers={this._queryMarkers}
                />
                <ViewNoteModal
                  isVisible={viewNoteModalIsVisible}
                  onCancel={this._handleHideViewModal}
                  handleVote={this._handleVote}
                  marker={currentMarker}
                />
                {isPostingNote && (
                  <TouchableHighlight
                    onPress={() => navigator.push(mapRoutes[1])}
                    style={styles.setNoteButton}>
                    <View style={styles.centerText}>
                      <Image
                        source={require('../../images/mine.png')}
                        style={{height: 35, width: 35, marginLeft: 15, marginRight: 15}}
                      />
                      <View style={{flex: 1}}>
                        <Text style={{color: '#999', fontSize: 16}}>{'Set Note Here'}</Text>
                      </View>
                      <Image
                        source={require('../../images/right.png')}
                        style={{height: 40, width: 40}}
                      />
                    </View>
                  </TouchableHighlight>
                )}
              </View>
            );
          } else {
            return (
              <CreatePage
                noteContent={postContent}
                noteImageSource={postImageSource}
                onContentChange={this._handlePostChange}
                onImageChange={this._handleImageSourceChange}
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
  title: {
    paddingTop: 10,
    color: 'white',
    fontFamily: 'JosefinSans-Bold',
    fontSize: 24,
  },
  setNoteButton: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 73,
    left: 25,
    right: 25,
    height: 70,
    padding: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#999',
    borderWidth: StyleSheet.hairlineWidth,
    shadowRadius: 2,
    shadowOpacity: 1.0,
    shadowOffset: {width: 0, height: 0},
    shadowColor: '#666',
  },
  centerText: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default MapPage;
