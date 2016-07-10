// Libraries
import React, { Component } from 'react';

// UI
import {
  ListView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

class MePage extends Component {

  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id
    });
    this.state = {
      dataSource: dataSource.cloneWithRows([
        '1',
        '2',
        '3',
      ]),
      modalIsVisible: false, // What is this for?
    };
  }

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => (
            <View style={styles.row}>
              <Text>{rowData}</Text>
            </View>
          )}
          style={styles.list}
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
  },
  list: {
    flexDirection: 'column',
    flex: 1,
  },
  row: {
    borderColor: 'gray',
    borderBottomWidth: 1,
  },
});

export default MePage;
