import React from 'react';
import {
  View,
  Button,
} from 'react-native';

import {
  Container,
  Content,
  Spinner,
  List,
  ListItem,
  Text,
  Right,
  Icon,
  Thumbnail,
  Body
} from 'native-base';

//firebase imports
import { firebaseApp } from '../../firebase'


export class AllPartners extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      lat: null,
      long: null,
      error: null,
      nearbyPeople: []
    };

    //creates realtime database reference to users key
    this.dbRef = firebaseApp.database().ref('users')
  }

  static navigationOptions = {
    title: 'Nearby',
  };

  componentDidMount() {
    this.getCurrentCoords();
  }

  getCurrentCoords() {
    //get current users current position
    navigator.geolocation.getCurrentPosition( position => {
      if(this.state.lat !== position.coords.latitude || this.state.long !== position.coords.longitude ) {
          this.setState({
            lat: position.coords.latitude,
            long: position.coords.longitude,
            error: null,
          });
          this.listenForCoords()
        }
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }


  listenForCoords() {
    this.dbRef.on('value', (snapshot) => {
      var coordsArr = [];
      snapshot.forEach((child) => {
        coordsArr.push({
          name: child.val().name,
          _key: child.key,
          lat: child.val().lat,
          long: child.val().long
        });
      });

      this.findNearbyPartner(coordsArr);
    })
  }


  returnDistanceInMiles(lat1, lon1, lat2, lon2, unit) {
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

    return dist;
  }

  findNearbyPartner(coordsArr) {
    // filter by nearby and then sort by closest
    var filtered = coordsArr.filter( personObj => {
      return this.returnDistanceInMiles(personObj.lat,personObj.long,this.state.lat,this.state.long,'N') <= 1
    })

    this.setState({
      nearbyPeople: filtered
    })
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Content>
        {!this.state.nearbyPeople.length ? <Spinner color='blue' /> : this.state.nearbyPeople.map( personObj => {
          return (
            <List key={personObj.name}>
            <ListItem>
              <Thumbnail square size={40} source={{uri:'https://placegoat.com/200'}} />
              <Body>
              <Text>{ personObj.name }</Text>
              </Body>
              <Right>
                <Icon style={{color: 'steelblue'}} name='arrow-forward' onPress={ () => {
                  navigate('Message', { user: personObj })
                }}/>
              </Right>
            </ListItem>
            </List>
        )})}
        </Content>
      </Container>
    )
  }
}



   ///seed:

    //   firebaseApp.database().ref('users/').set({
    //   Gabe: {
    //     name: 'Gabe',
    //     lat: 37.33017186,
    //     long: -122.03299256
    //   },
    //   Omri: {
    //     name: 'Omri',
    //     lat: 37.33017187,
    //     long: -122.03299257
    //   },
    //   Pim: {
    //     name: 'Pim',
    //     lat: 37.33017659,
    //     long: -122.03314101
    //   },
    //   John: {
    //     name: 'John',
    //     lat: 37.33676622,
    //     long: -122.04160728
    //   },
    //   tina: {
    //     name: 'Tina',
    //     lat: 37.33439537,
    //     long: -122.06901468
    //   }
    // });


    //figure out what this event listener does and where to put it
    // this.dbRef.on("child_added", function(snapshot, prevChildKey) {

    //receive all users data from firebase
    // this.dbRef.on("value", function(snapshot) {
    //   var newPost = snapshot.val();
    //   console.log('newPost:', newPost);
    // });

  // componentWillUpdate() {
  //   console.log('here')
  //   this.getCurrentCoords();
  //   this.listenForCoords();
  // }

  // onNavigationStateChange(prev, newState, action) {
  //   this.getCurrentCoords()
  //   this.listenForCoords()
  // }

// componentWillUnmount() {
//     navigator.geolocation.clearWatch(this.watchId);
//   }
