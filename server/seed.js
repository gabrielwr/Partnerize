import { firebaseApp } from '../firebase'

firebaseApp.database().ref('users/').set({
	Gabe: {
		name: 'Gabe',
		lat: 37.33017186,
		long: -122.03299256,
		img: 'Gabe.png',
		'One Arm Pullups': '-1',
		'Favorite Climbing Area': 'My Pullup Bar'
	},
	Omri: {
		name: 'Omri',
		lat: 37.33017187,
		long: -122.03299257,
		img: 'Omri.png',
		'One Arm Pullups': 'Math.MAX_SAFE_INTEGER',
		'Favorite Climbing Area': 'Farley, MA'
	},
	Pim: {
		name: 'Pim',
		lat: 37.33017659,
		long: -122.03314101,
		img: 'Pim.png',
		'One Arm Pullups': '23',
		'Favorite Climbing Area': 'Oliana, Spain'
	},
	John: {
		name: 'John',
		lat: 37.33676622,
		long: -122.04160728,
		img: 'John.png',
		'One Arm Pullups': 'Math.MAX_SAFE_INTEGER',
		'Favorite Climbing Area': 'Sheffield'
	},
	Tina: {
		name: 'Tina',
		lat: 37.33439537,
		long: -122.06901468,
		img: 'Tina.png',
		'One Arm Pullups': '14',
		'Favorite Climbing Area': 'The Gunks'
	}
});
