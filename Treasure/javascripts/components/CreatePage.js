// Libraries
import React, { Component, PropTypes} from 'react';

// UI
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Modal,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

class CreatePage extends Component {

  static propTypes = {
    noteContent: PropTypes.string.isRequired,
    noteImageSource: PropTypes.object,
    onContentChange: PropTypes.func.isRequired,
    onImageChange: PropTypes.func.isRequired,
  }

  _openCamera = () => {
    ImagePicker.showImagePicker(response => {
      if (response.didCancel || response.error) {
        return;
      }

      // TODO: Faster, but base64 is currently how the API works (we can change later)
      // if (Platform.OS === 'ios') {
      //   const source = {uri: response.uri.replace('file://', ''), isStatic: true};
      // } else {
      //   const source = {uri: response.uri, isStatic: true};
      // }

      const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
      this.props.onImageChange(source);
    });
  }

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  render() {
    const {
      noteContent,
      noteImageSource,
      onContentChange,
    } = this.props;
    return (
      <View style={styles.container}>
        <TextInput
          editable={true}
          multiline={true}
          onChangeText={onContentChange}
          placeholder={'What you gotta say?'}
          style={styles.input}
          value={noteContent}
        />
        {noteImageSource !== undefined &&
          <Image source={noteImageSource} style={styles.noteImage} />
        }
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            onPress={this._openCamera}
            style={styles.button}>
            <Text style={{color: '#fff'}}>Add Photo</Text>
          </TouchableHighlight>
        </View>
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
    paddingTop: 64,
  },
  input: {
    flex: 1,
    padding: 12,
    color: '#333333',
    fontSize: 18,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#FF765F',
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  noteImage: {
    flex: 1
  }
});

export default CreatePage;
