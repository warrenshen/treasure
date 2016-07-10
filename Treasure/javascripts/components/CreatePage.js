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

class CreatePage extends Component {

  static propTypes = {
    noteContent: PropTypes.string.isRequired,
    onContentChange: PropTypes.func.isRequired,
  }

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  render() {
    const {
      noteContent,
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
    fontSize: 16,
  },
});

export default CreatePage;

