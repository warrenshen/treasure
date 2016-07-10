// Libraries
import React, { Component } from 'react';

// UI
import {
  ListView,
  Navigator,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const meRoutes = [
  { index: 0, title: 'Mine' },
];

class MePage extends Component {

  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id
    });
    this.state = {
      dataSource: dataSource.cloneWithRows([
        'Well hello there cutie pie.',
        'What\'s good my homie g thangy thang.',
        'Nothin\' much yo!',
      ]),
    };
  }

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  render() {
    return (
      <Navigator
        initialRoute={meRoutes[0]}
        initialRoutes={meRoutes}
        navigationBar={(
          <Navigator.NavigationBar
            routeMapper={{
              LeftButton: (route, navigator, index, navState) => null,
              RightButton: (route, navigator, index, navState) => null,
              Title: (route, navigator, index, navState) => (
                <Text style={styles.title}>{route.title}</Text>
              ),
            }}
            style={styles.navbar}
          />
        )}
        renderScene={(route, navigator) => {
          return (
            <View style={styles.container}>
              <ListView
                dataSource={this.state.dataSource}
                renderRow={(rowData) => (
                  <View style={styles.item}>
                    <View style={styles.row}>
                      <Text style={styles.text}>{rowData}</Text>
                    </View>
                    <View style={styles.subrow}>
                      <Text style={styles.subtext}>{'Berkeley, California'}</Text>
                      <Text style={styles.votes}>{'33'}</Text>
                    </View>
                  </View>
                )}
                style={styles.list}
              />
            </View>
          );
        }}
      />
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
  list: {
    flex: 1,
  },
  navbar: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF765F',
    shadowColor: '#333333',
    shadowOffset: {
      height: 1,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
  },
  item: {
    padding: 12,
    borderColor: '#CCCCCC',
    borderBottomWidth: 1,
  },
  row: {

  },
  subrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
  },
  subtext: {
    flex: 1,
    color: '#CCCCCC',
    fontFamily: 'JosefinSans-BoldItalic',
    fontSize: 16,
  },
  text: {
    color: '#333333',
    fontSize: 18,
  },
  title: {
    paddingTop: 10,
    color: 'white',
    fontFamily: 'JosefinSans-Bold',
    fontSize: 24,
  },
  votes: {
    color: '#666666',
    fontFamily: 'JosefinSans-Bold',
    fontSize: 18,
  },
});

export default MePage;
