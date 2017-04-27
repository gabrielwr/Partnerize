import React from 'react';
import {
  Text,
  View,
  Button
} from 'react-native';


const dbPersonLocationSimulator = [
  {
    name: 'Omri',
    latitude: 1,
    longitude: 2,
  }, {
    name: 'Sam da killa',
    latitude: 3,
    longitude: 4
  }, {
    name: 'John',
    latitude: 5,
    longitude: 6
  }
]

export class AllPartners extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  distance(lat1, lon1, lat2, lon2, unit) {
    let radlat1 = Math.PI * lat1/180
    let radlat2 = Math.PI * lat2/180
    let theta = lon1-lon2
    let radtheta = Math.PI * theta/180
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (unit === "K") { dist *= 1.609344 }
    if (unit === "N") { dist *= 0.8684 }
    return dist
  }

  findNearbyPartner() {
    // filter by nearby and then sort by closest
    // return dbPersonLocationSimulator.filter( personObj => {
    //   return (
    //     this.state.latitude - personObj.latitude
    //   )
    // })
  }

  static navigationOptions = {
    title: 'Partners Nearby:',
  };

  //in on press, should set up socket connection
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text> Gabe </Text>
        <Button
            onPress={ () => {
              navigate('Message')
            }}
            title="Chat"
          />
      </View>
    )
  }
}
