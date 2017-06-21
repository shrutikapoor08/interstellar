import React from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList} from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeZero : new Date('June 18, 2017 07:00:00'),
      earthTime: new Date()
    };
  }


  componentDidMount(){
    this.timerID = setInterval(
      () => this.getEarthTime(), 1000
    );
  }

  setTimeZero(){
    this.setState({
      'timeZero': new Date()
    });
  }

  getEarthTime(){
    this.setState({
      earthTime: new Date()
    });
  }

  getMarsTime(){
    var earthTime = this.state.earthTime;
    var timeZero = this.state.timeZero;
    var marsTime= ((earthTime.getTime()-timeZero.getTime())*(1-.027)) + timeZero.getTime();
    return marsTime;
  }

  render() {
    var marsTime = new Date(this.getMarsTime());
    return (
      <View style={[styles.container, styles.background]}>
      <Text style={styles.appHeader}>Interstellar Time</Text>
        <Planet uri='http://solarviews.com/raw/earth/bluemarblewest.jpg' time={this.state.earthTime.toLocaleString()} name='Earth' />
        <Planet uri='http://media.salon.com/2015/09/mars-614x412.jpg' time={marsTime.toLocaleString()} name='Mars' />
        <Text style={styles.timeZero}> Time sync&apos;d on {this.state.timeZero.toLocaleString()}</Text>
        <Button
          title="Sync Time Now"
          onPress={this.setTimeZero.bind(this)}
          accessibilityLabel="Synchronize time across all planets"
        />
      </View>
    );
  }
}

class Planet extends React.Component {
  render(){
    return (
      <View style={styles.planet}>
        <Image
            style={styles.planetImage}
            source={{uri: this.props.uri}}
          />
          <View style={styles.planetDetails}>
            <Text style={styles.planetTitle}>{this.props.name}</Text>
            <Text style={styles.planetTime}>{this.props.time}</Text>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
  },
  appHeader: {
    fontSize: 42,
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '100',
  },
  planet: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  planetDetails: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
  },
  planetImage: {
    height: 200,
    width: 200,
    marginBottom: 20,
  },
  planetTitle: {
    fontSize: 32,
    color: '#ffffff',
  },
  planetTime: {
    fontSize: 18,
    color: '#d2d2d2'
  },
  timeZero: {
    color: '#cccccc',
    textAlign: 'center',
    paddingBottom: 10,
  }

});
