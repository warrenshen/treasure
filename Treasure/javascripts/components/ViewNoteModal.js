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
                    <Text style={styles.titleText}>
                      {"Title"}
                    </Text>
                  </View>
                  <View style={styles.action}>
                    <TouchableWithoutFeedback
                      onPress={onCancel}
                      style={styles.button}>
                        <Image
                          source={require('../../images/x.png')}
                          style={styles.cancel}
                        />
                    </TouchableWithoutFeedback>
                  </View>
                </View>
                <View style={styles.bodyContainer}>
                  <Text style={styles.body}>
                    {bodyText}
                  </Text>
                </View>
                <View style={styles.footer}>
                  <Text style={styles.city}>
                    {"Berkeley, California"}
                  </Text>
                  <View style={styles.arrows}>
                    <Image
                      source={require('../../images/up.png')}
                      style={styles.arrow}
                    />
                    <Text style={styles.upvoteCount}>
                      {"3"}
                    </Text>
                    <Image
                      source={require('../../images/down.png')}
                      style={styles.arrow}
                    />
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
      paddingRight: 20,
      paddingBottom: 5,
      paddingLeft: 20,
      paddingTop: 20,
      height: 520,
      width: 340,
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
      fontSize: 20,
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
      fontSize: 18,
      // paddingLeft: 20,
    },

    city: {
      color: '#CCCCCC',
      fontSize: 18,
      paddingBottom: 20,
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
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });

export default ViewNoteModal;
