import React from 'react';

import {
  Container,
  Content,
  Spinner,
  List,
  ListItem,
  Text,
  Thumbnail,
  Body
} from 'native-base';

import { AllPartnersIcons } from './AllPartnersIcons';

import { firebaseApp } from '../../firebase';

export class AllPartners extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: null,
      long: null,
      error: null,
      nearbyPeople: [],
      img: '',
      'One Arm Pullups': '',
      'Favorite Climbing Area': ''
    };

    //set user db ref
    this.dbRef = firebaseApp.database().ref('users');
  }

  static navigationOptions = {
    title: 'Nearby'
  };

  componentDidMount() {
    this.getCurrentCoords();
  }

  getCurrentCoords() {
    navigator.geolocation.getCurrentPosition(
      position => {
        if (
          this.state.lat !== position.coords.latitude ||
          this.state.long !== position.coords.longitude
        ) {
          this.setState(
            {
              lat: position.coords.latitude,
              long: position.coords.longitude,
              error: null
            },
            () => this.listenForCoords()
          );
        }
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  listenForCoords() {
    this.dbRef.on('value', snapshotArr => {
      const coordsArr = [];
      snapshotArr.forEach(child => {
        coordsArr.push({
          name: child.val().name,
          _key: child.key,
          lat: child.val().lat,
          long: child.val().long,
          img: child.val().img,
          'One Arm Pullups': child.val()['One Arm Pullups'],
          'Favorite Climbing Area': child.val()['Favorite Climbing Area']
        });
      });

      this.findNearbyPartner(coordsArr);
    });
  }

  returnDistanceInMiles(lat1, lon1, lat2, lon2, unit) {
    const radlat1 = (Math.PI * lat1) / 180;
    const radlat2 = (Math.PI * lat2) / 180;
    const theta = lon1 - lon2;
    const radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist *= 180 / Math.PI;
    dist *= 60 * 1.1515;

    //conversion for different units
    if (unit === 'K') {
      dist *= 1.609344;
    }
    if (unit === 'N') {
      dist *= 0.8684;
    }

    return dist;
  }

  findNearbyPartner(coordsArr) {
    // filter by nearby and then sort by closest
    const distanceArr = [];
    coordsArr.forEach(personObj => {
      personObj.distance = this.returnDistanceInMiles(
        personObj.lat,
        personObj.long,
        this.state.lat,
        this.state.long,
        'N'
      ).toPrecision(2);
      distanceArr.push(personObj);
    });

    distanceArr.sort((a, b) => {
      return a.distance - b.distance;
    });

    this.setState({
      nearbyPeople: distanceArr
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Content>
          {!this.state.nearbyPeople.length ? (
            <Spinner color="blue" />
          ) : (
            <List
              dataArray={this.state.nearbyPeople}
              renderRow={personObj => (
                <ListItem>
                  <Thumbnail
                    size={40}
                    source={{ uri: 'https://placegoat.com/200/200' }}
                  />
                  <Body>
                    <Text>{personObj.name}</Text>
                    <Text>{personObj.distance} Mi</Text>
                  </Body>
                  <AllPartnersIcons navigate={navigate} personObj={personObj} />
                </ListItem>
              )}
            />
          )}
        </Content>
      </Container>
    );
  }
}
