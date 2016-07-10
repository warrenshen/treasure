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
} from 'react-native';

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
              <Text style={styles.actionText}>Cancel</Text>
            </TouchableHighlight>
          </View>
          <Text style={styles.title}>
            Note
          </Text>
          <View style={styles.action}>
            <TouchableHighlight
              onPress={() => this.props.onPost(this.state.text)}
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
});

export default CreateNoteModal;

