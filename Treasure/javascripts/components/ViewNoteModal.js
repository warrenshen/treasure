// Libraries
import React, { Component, PropTypes} from 'react';

// UI
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
} from 'react-native';

import Requester from '../utils/requester';

class ViewNoteModal extends Component {

  // --------------------------------------------------
  // Props and State
  // --------------------------------------------------
  static propTypes: {
    marker: PropTypes.object,
    onCancel: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired,
    noteId: PropTypes.number,
    handleVote: PropTypes.func.isRequired,
  };

  static defaultProps = {
    noteId: 0,
  };

 constructor(props) {
    super(props);
    this.state = {
      upVoted: false,
      downVoted: false,
    };
  }

  // --------------------------------------------------
  // Handlers
  // --------------------------------------------------
  _onCancel = () => {
    this.setState({
      downVoted: false,
      upVoted: false,
    });
    this.props.onCancel();
  }

  render() {
    const {
      marker,
      onCancel,
      isVisible,
      handleVote,
    } = this.props;

    let noteImageUrl;
    let noteText;
    let popularity;
    let isUpvoted;
    let isDownvoted;
    if (marker !== null) {
      noteImageUrl = marker.note_image_url;
      noteText = marker.note_text;
      popularity = marker.popularity;
      isUpvoted = marker.upvoted;
      isDownvoted = marker.downvoted;
    }

    return (
      <Modal
        animationType={"slide"}
        transparent={true}
        visible={isVisible}
        onRequestClose={this._onCancel}>
        <TouchableWithoutFeedback
          onPress={this._onCancel}>
          <View style={styles.container}>
            <TouchableWithoutFeedback>
              <View style={styles.modal}>
                <View style={styles.header}>
                  <View style={styles.title}>
                    <Text style={styles.titleText}>
                      {"Note"}
                    </Text>
                  </View>
                  <View style={styles.action}>
                    <TouchableWithoutFeedback
                      onPress={this._onCancel}
                      style={styles.button}>
                        <Image
                          source={require('../../images/x.png')}
                          style={styles.cancel}
                        />
                    </TouchableWithoutFeedback>
                  </View>
                </View>
                <ScrollView
                  contentContainerStyle={styles.scrollView}
                  keyboardDismissMode={'on-drag'}
                  scrollEnabled={true}>
                  {noteImageUrl &&
                    <Image
                      source={{uri: `${Requester.railsApp}/${noteImageUrl}`}}
                      style={styles.image}
                    />
                  }
                  <View style={styles.bodyContainer}>
                    <Text style={styles.body}>
                      {noteText}
                    </Text>
                  </View>
                  <View style={styles.footer}>
                    <Text style={styles.city}>
                      {"Berkeley, California"}
                    </Text>
                    <View style={styles.arrows}>
                      <TouchableWithoutFeedback
                        onPress={() => handleVote(true)}
                        style={styles.button}>
                        {isUpvoted ?
                          <Image
                          source={require('../../images/up-red.png')}
                          style={styles.arrow}/>
                          :
                          <Image
                          source={require('../../images/up.png')}
                          style={styles.arrow}/>
                        }
                    </TouchableWithoutFeedback>
                      <Text style={styles.upvoteCount}>
                        {popularity}
                      </Text>
                      <TouchableWithoutFeedback
                        onPress={() => handleVote(false)}
                        style={styles.button}>
                        {isDownvoted ?
                          <Image
                          source={require('../../images/down-red.png')}
                          style={styles.arrow}/>
                          :
                          <Image
                          source={require('../../images/down.png')}
                          style={styles.arrow}/>
                        }
                    </TouchableWithoutFeedback>
                    </View>
                  </View>
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

// --------------------------------------------------
// Styles
// --------------------------------------------------

//TODO: Padding or Margin?
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    flex: 1,
  },
  modal: {
    backgroundColor: 'white',
    paddingBottom: 5,
    paddingTop: 20,
    height: 520,
    width: 340,

    borderColor: '#999',
    borderWidth: StyleSheet.hairlineWidth,
    shadowRadius: 2,
    shadowOpacity: 1.0,
    shadowOffset: {width: 0, height: 0},
    shadowColor: '#888',
  },

  cancel: {
    width: 30,
    height: 30,
  },

  button: {
    marginRight: 5,
    marginLeft: 5,
  },

  titleText: {
    fontFamily: 'JosefinSans-Bold',
    fontSize: 24,
    color: '#333',
    paddingTop: 5,
  },

  arrows: {
    alignItems: 'center',
  },

  arrow: {
    width: 30,
    height: 30,
  },

  upvoteCount: {
    color: '#999999',
    fontSize: 15,
  },

  body: {
    color: '#666',
    fontSize: 18,
    lineHeight: 26,
  },

  city: {
    color: '#CCCCCC',
    fontSize: 18,
    paddingBottom: 20,
  },

  footer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingRight: 20,
    paddingLeft: 20,
  },

  header: {
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  image: {
    flex: 1,
    marginBottom: 20,
    minHeight: 180,
  },

  bodyContainer: {
    paddingRight: 20,
    paddingLeft: 20,
  },
});

export default ViewNoteModal;
