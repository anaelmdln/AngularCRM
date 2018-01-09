let NgAppConfigs = {
	marvel: {
		publicKey: 'cbc73071c2465d8275ca86032adf167f'
	},
	giphy: {
		apiKey: 'a4OGfMQYElfyWkAvBuRFvQ9YPym4qacT'
	},
	firebase: {
		apiKey: 'AIzaSyB9SwxkGL0ryoDdukwu2Kx3CxOGUcFRCtk',
		authDomain: 'angular-crm-2017.firebaseapp.com',
		databaseURL: 'https://angular-crm-2017.firebaseio.com',
		projectId: 'angular-crm-2017',
		storageBucket: 'angular-crm-2017.appspot.com',
		messagingSenderId: '313121292589'
	}
}
// Initialize Firebase
var config = {
	apiKey: NgAppConfigs.firebase.apiKey,
	authDomain: NgAppConfigs.firebase.authDomain,
	databaseURL: NgAppConfigs.firebase.databaseURL,
	projectId: NgAppConfigs.firebase.projectId,
	storageBucket: NgAppConfigs.firebase.storageBucket,
	messagingSenderId: NgAppConfigs.firebase.messagingSenderId
};
firebase.initializeApp(config);