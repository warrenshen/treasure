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
} from 'react-native';

class ViewNoteModal extends Component {

  // --------------------------------------------------
  // Props
  // --------------------------------------------------
  static propTypes: {
    bodyText: PropTypes.string,
    onCancel: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired,
  }

  // --------------------------------------------------
  // State
  // --------------------------------------------------

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  // Messy cause onclick outside of modal should close it
  // TODO: Scrollview
  // TODO: Blur background
  render() {
    const {
      bodyText,
      onCancel,
      isVisible,
      currentMarkerId,
    } = this.props;

    return (
      <Modal
        animationType={"slide"}
        transparent={true}
        visible={isVisible}
        onRequestClose={onCancel}>
        <TouchableWithoutFeedback
          onPress={onCancel}>
          <View style={styles.container}>
            <TouchableWithoutFeedback>
              <View style={styles.modal}>
                <View style={styles.header}>
                  <View style={styles.title}>
                    <Text styles={styles.titleText}>
                      {"Title"}
                    </Text>
                  </View>
                  <View style={styles.action}>
                    <TouchableHighlight
                      onPress={onCancel}
                      style={styles.button}>
                        <Text style={styles.actionText}>X</Text>
                    </TouchableHighlight>
                  </View>
                </View>
                <View style={styles.textInputContainer}>
                  <Text style={styles.textInput}>
                    {bodyText}
                  </Text>
                </View>
                <View style={styles.footer}>
                  <Text style={styles.city}>
                    {"Berkeley, California"}
                  </Text>
                  <View style={styles.arrows}>
                    <Text style={styles.upArrow}>
                      {"^"}
                    </Text>
                    <Text style={styles.downArrow}>
                      {"v"}
                    </Text>
                  </View>
                </View>
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
  modal: {
    backgroundColor: 'white',
    height: 500,
    width: 300,
  },

  button: {
    marginRight: 5,
    marginLeft: 5,
  },

  footer: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  header: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'brown',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  });

export default ViewNoteModal;
