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
} from 'react-native';

class CreateNoteModal extends Component {

  // --------------------------------------------------
  // Props
  // --------------------------------------------------


  // --------------------------------------------------
  // State
  // --------------------------------------------------

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  render() {
    return (
      <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.props.isVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={{marginTop: 22}}>
          <View style={styles.actions}>
            <TouchableHighlight
              onPress={this.props.onPost}
              style={styles.button}>
              <Text>Post</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={this.props.onCancel}
              style={styles.button}>
              <Text>Cancel</Text>
            </TouchableHighlight>
          </View>
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
  actions: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default CreateNoteModal;

