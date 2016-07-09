// Libraries
import React, { Component } from 'react';

// UI
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Modal,
  TextInput,
} from 'react-native';

class CreateNoteModal extends Component {

  // --------------------------------------------------
  // State
  // --------------------------------------------------
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
  }

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  render() {
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
              <Text>Cancel</Text>
            </TouchableHighlight>
          </View>
          <Text style={styles.title}>
            Note
          </Text>
          <View style={styles.action}>
            <TouchableHighlight
              onPress={this.props.onPost}
              style={styles.button}>
              <Text>Post</Text>
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
       </View>
      </Modal>
    );
  }
}

  // --------------------------------------------------
  // Styles
  // --------------------------------------------------
  const styles = StyleSheet.create({

  button: {
    backgroundColor: '#eeeeee',
    padding: 10,
    marginRight: 5,
    marginLeft: 5,
  },
  header: {
    flexDirection: 'row',
  },
  actions: {

  },
  textInputContainer: {
    flex: 1,
    flexDirection: 'column',
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
  },
  textInput: {
    flex: 1,
    height: 100,
    borderColor: 'gray',
    borderWidth: 4,
  },
});

export default CreateNoteModal;

