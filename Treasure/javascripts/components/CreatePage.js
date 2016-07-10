// Libraries
import React, { Component, PropTypes} from 'react';

// UI
import {
  AppRegistry,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  DeviceEventEmitter,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import KeyboardSpacer from './KeyboardSpacer.js';

class CreatePage extends Component {

  static propTypes = {
    noteContent: PropTypes.string.isRequired,
    noteImageSource: PropTypes.object,
    onContentChange: PropTypes.func.isRequired,
    onImageChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      keyboardBottom: 0,
    };
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

      const source = { uri: 'data:image/jpeg;base64,' + response.data, isStatic: true };
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
        <ScrollView
          contentContainerStyle={{flex: 1}}
          keyboardDismissMode={'on-drag'}
          scrollEnabled={false}
          styles={{height: this.state.visibleHeight}}
        >
          <View style={styles.section}>
            <TextInput
              editable={true}
              multiline={true}

              onChangeText={onContentChange}
              placeholder={'What you gotta say?'}
              style={styles.input}
              value={noteContent}
            />
          </View>
          <View style={styles.section}>
            {noteImageSource !== undefined &&
              <Image source={noteImageSource} style={styles.image} />
            }
            <View style={styles.footer}>
              <TouchableHighlight
                onPress={this._openCamera}
                style={styles.touchable}>
                <Text style={styles.button}>Add/Change Photo</Text>
              </TouchableHighlight>
            </View>
          </View>
        </ScrollView>
        <KeyboardSpacer bottomSpacing={48} />
      </View>
    );
  }
}

// --------------------------------------------------
// Styles
// --------------------------------------------------
const styles = StyleSheet.create({
  button: {
    color: 'white',
    fontFamily: 'JosefinSans-Bold',
    fontSize: 16,
  },
  container: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 64,
    right: 0,
    left: 0,
    bottom: 48,
  },
  footer: {
    height: 48,
  },
  input: {
    flex: 1,
    padding: 16,
    color: '#333333',
    fontSize: 18,
  },
  image: {
    flex: 1
  },
  section: {
    flex: 1,
  },
  touchable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF765F',
  },
});

export default CreatePage;
