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
      currentMarkerDescription: "",
      currentMarkerId: 0,
      isPostingNote: false,
      markers: [],
      postContent: '',
      postImageSource: null,
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

  _handlePostChange = (noteText) => {
    this.setState({ postContent: noteText });
  }

  _handleImageSourceChange = (imageSource) => {
    this.setState({ postImageSource: imageSource });
  }

  _handleHideCreateModal = () => {
    this.setState({ createNoteModalIsVisible: false });
  }

  _handleShowViewNoteModal = (description, id) => {
    // Renders the View Note Modal
    // TODO: pass in upvotes and shit
    // TODO: Add in the city or something

    this.setState({
      viewNoteModalIsVisible: true,
      currentMarkerDescription: description,
      currentMarkerId: id,
    });
  }

  _handleHideViewModal = () => {
    this.setState({ viewNoteModalIsVisible: false });
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
      'http://localhost:3000/geo_notes',
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
      currentMarkerDescription,
      currentMarkerId,
      coordIsValid,
      isPostingNote,
      markers,
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
                          postContent: '',
                        });
                        navigator.pop();
                      }}
                    />
                  );
                }
              },
              RightButton: (route, navigator, index, navState) => {
                if (index === 0) {
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
                  isPostingNote={isPostingNote}
                  onMarkerPress={this._handleShowViewNoteModal}
                  markers={markers}
                  updatePostCoord={this._updatePostCoord}
                />
                <ViewNoteModal
                  isVisible={viewNoteModalIsVisible}
                  onCancel={this._handleHideViewModal}
                  bodyText={currentMarkerDescription}
                  currentMarkerId={currentMarkerId}
                />
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
});

export default MapPage;
