// Libraries
import React, { Component, PropTypes } from 'react';

// UI
import {
  AppRegistry,
  StyleSheet,
  Dimensions,
  Text,
  View,
  TouchableHighlight,
  Modal,
  TextInput,
  Platform,
  Image
} from 'react-native';

import ImagePicker from 'react-native-image-picker';

class CreateNoteModal extends Component {

  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onPost: PropTypes.func.isRequired,
  }

  // --------------------------------------------------
  // State
  // --------------------------------------------------
  constructor(props) {
    super(props);
    this.state = {
      cameraVisible: false,
      text: "",
    };
  }


  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  render() {
    const { imageSource } = this.state;
    return (
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={this.props.isVisible}
        onRequestClose={() => {alert("Modal has been closed.")}}>
        <View style={styles.header}>
          <View style={styles.action}>
            <TouchableHighlight
              onPress={this.props.onCancel}
              style={styles.button}>
              <Text style={styles.actionText}>Cancel</Text>
            </TouchableHighlight>
          </View>
          <Text style={styles.title}>
            Note
          </Text>
          <View style={styles.action}>
            <TouchableHighlight
              onPress={() => this.props.onPost(this.state)}
              style={styles.button}>
              <Text style={styles.actionText}>Post</Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            multiline={true}
            numberOfLines={4}
            onChangeText={(text) => this.setState({text})}
            editable={true}
            maxLength={40}
            value={this.state.text}
            placeholder="What you gotta say?"
          />
          {imageSource !== undefined &&
            <Image source={imageSource} style={styles.noteImage} />
          }
        </View>
        <TouchableHighlight
          onPress={this._openCamera}
          style={styles.button}>
          <Text>Add Photo</Text>
        </TouchableHighlight>
      </Modal>
    );
  }
}

// --------------------------------------------------
// Styles
// --------------------------------------------------
const styles = StyleSheet.create({
  button: {
    padding: 10,
    marginRight: 5,
    marginLeft: 5,
  },
  button: {
    backgroundColor: '#FF765F',
    padding: 10,
    marginRight: 5,
    marginLeft: 5,
  },
  header: {
    paddingRight: 10, // Hacky dunno if centered either lol
    paddingTop: 30,
    backgroundColor: '#FF765F',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionText: {
    color: 'white',
  },
  title: {
    color: 'white',
    fontSize: 25,
  },
  textInputContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  textInput: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#ffffff',
    opacity: 0.5,
    borderRadius: 5,
    padding: 10,
    margin: 40
  },
  noteImage: {
    flex: 1,
    height: Dimensions.get('window').height / 3,
  }
});

export default CreateNoteModal;
