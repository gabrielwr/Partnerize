import React from 'react';
import {
  Text,
  View,
  Button
} from 'react-native';

//firebase imports
import { firebaseApp } from '../../firebase'

export class AllPartners extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      lat: null,
      long: null,
      error: null,
      dataSource: null,
      peopleAndCoordsArr: [],
      nearbyPeople: []
    };

    //creates realtime database reference to users key
    this.dbRef = firebaseApp.database().ref('users')
  }

  componentDidMount() {


    //figure out what this event listener does and where to put it
    // this.dbRef.on("child_added", function(snapshot, prevChildKey) {

    //receive all users data from firebase
    // this.dbRef.on("value", function(snapshot) {
    //   var newPost = snapshot.val();
    //   console.log('newPost:', newPost);
    // });


    console.log('we are back from listen for coords')

    //get current users current position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          lat: position.coords.latitude,
          long: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );

    //post the current users data to firebase
    //how does this work?
    // var newPostRef = this.dbRef.push();
    // newPostRef.set({
    //   lat: this.state.latitude,
    //   long: this.state.longitude
    // })
    //
    this.listenForCoords();

  }

  componentWillUnmount() {
    this.setState({
      lat: null,
      long: null,
      error: null,
      dataSource: null,
      peopleAndCoordsArr: [],
      nearbyPeople: []
    })
  }

  listenForCoords() {
    this.dbRef.on('value', (snapshot) => {
      console.log('listening for coords:', snapshot.val())
      var coordsArr = [];
      snapshot.forEach((child) => {
        console.log('child in iterator', child.val())
        coordsArr.push({
          name: child.val().name,
          _key: child.key,
          lat: child.val().lat,
          long: child.val().long
        });
      });

      //set state
      this.setState({
        // what does this data source do?
        // dataSource: this.state.dataSource.cloneWithRows(coordsArr)
        peopleAndCoordsArr: coordsArr
      })

      // console.log('state', this.state)
      this.findNearbyPartner();
    })
  }


  returnDistanceInMiles(lat1, lon1, lat2, lon2, unit) {
    // console.log('made it:', lat1, lat2)
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

    console.log(dist)
    return dist
  }

  findNearbyPartner() {
    console.log('curr long and lat:', this.state.long, this.state.lat)
    console.log('made it to findNearby')
    // filter by nearby and then sort by closest
    var filtered = this.state.peopleAndCoordsArr.filter( personObj => {
      console.log('curr personObj is:', personObj)
      return this.returnDistanceInMiles(personObj.lat,
                                        personObj.long,
                                        this.state.lat,
                                        this.state.long,
                                        'N') <= 1;
    })


    this.setState({
      nearbyPeople: filtered
    })
    console.log('people closeby are:', this.state.nearbyPeople);
  }

  static navigationOptions = {
    title: 'Nearby',
  };

  //in on press, should set up socket connection
  render() {
    const { navigate } = this.props.navigation;
    console.log('in render:',this.state.nearbyPeople)
    return (
      <View>
        {this.state.nearbyPeople && this.state.nearbyPeople.map( personObj => {
          return (
            <View key={ personObj.name }>
            <Text> { personObj.name } </Text>
            <Button
              onPress={ () => {
                navigate('Message', { user: personObj })
              }}
              title="Chat"
            />
          </View>
        )})}
      </View>
    )
  }
}



// this.itemsRef.on('evntExample1', (dataSnapshot) => {
//     this.items.push({id: dataSnapshot.key(), text: dataSnapshot.val()});
//     this.setState({
//       todoSource: this.state.todoSource.cloneWithRows(this.items)
//     });
//   });

//   // When a todo is removed
//   this.itemsRef.on('evntExample2', (dataSnapshot) => {
//       this.items = this.items.filter((x) => x.id !== dataSnapshot.key());
//       this.setState({
//         todoSource: this.state.todoSource.cloneWithRows(this.items)
//       });
//   });




   ///seed:
  // firebaseApp.database().ref('users/').set({
  //     gabe: {
  //       name: 'gabe',
  //       lat: 37.33017186,
  //       long: -122.03299256
  //     },
  //     omri: {
  //       name: 'omri',
  //       lat: 37.33017187,
  //       long: -122.03299257
  //     },
  //     sam: {
  //       name: 'sam',
  //       lat: 37.33017659,
  //       long: -122.03314101
  //     },
  //     john: {
  //       name: 'john',
  //       lat: 37.33676622,
  //       long: -122.04160728
  //     },
  //     tina: {
  //       name: 'tina',
  //       lat: 37.33439537,
  //       long: -122.06901468
  //     }
  //   });

