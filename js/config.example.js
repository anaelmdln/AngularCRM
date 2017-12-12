let NgAppConfigs = {
	marvel: {
		publicKey: 'publicKey'
	},
	giphy: {
		apiKey: 'apiKey'
	},
	firebase: {
		apiKey: 'apiKey',
		authDomain: 'authDomain',
		databaseURL: 'databaseURL',
		projectId: 'projectId',
		storageBucket: 'storageBucket',
		messagingSenderId: 'messagingSenderId'
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