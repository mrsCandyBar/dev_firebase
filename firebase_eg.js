
import Authorize from _firebase_authorization.js;
import User from _firebase_user.js;
import Query from _firebase_queries.js;
import Command from _firebase_commands.js;

class runFirebase {
	
	constructor() {
		this.user;
		this.database;
		this.credential;
		this.auth = firebase.auth();
		this.init();
	}

	init() {
		this.database = firebase.database();
		this.logUserIn(this.user, this.credential);
		this.bindUIEvents();
	}

	logUserIn(user, credential) {
		this._isUserLoggedIn();
		if (!this.user) {
			Authorize.signIn(this.auth, 'candicekswartz@yahoo.com', 'logMeIn').then((resolve) => {
				this.user = firebase.auth().currentUser;
				this.credential = resolve;
				this._returnUserData();
			}, (error) => {
				alert('Sign in attempt failed >>', error);
			});
		}
	}

		_isUserLoggedIn(user, credential) {
			Authorize.reAuthenticate(user, credential).then((resolve) => {
				this.user = firebase.auth().currentUser;
				this._returnUserData();
				
			}, (error) => { console.log('user is not logged in', error)});
		}

		_returnUserData() {
			/*Query.data(this.database, '/users').then((dataRetrieved) =>{
				// Do something with data once only;
			});*/

			Query.dataAndsubscribeToUpdates(this.database, '/users').then((data) =>{
				// Do something with data and subscribe to data updates;
			}, (error) => {
				alert('Error returning user data >>', error)
			});
		}


	bindUIEvents() {
		let className = _getButtonClasses();

		if (className.contains("addUser")) {
		  	Command.addUser(this.database, userId, username, email);
		}
		else if (className.contains("updateUser")) {
			Command.addUser(this.database, userId, username, email);
		}
		else if (className.contains("removeUser")) {
			Command.removeUser(this.database, userId);
		}
	}
}

function _getButtonClasses() {
	let toolbar = document.querySelector(".toolbar");
	let buttonHandler = function(e) {
	  	let button = e.delegateTarget;
	  	if (button.classList.contains("btn")) {
		  	return button.classList
		}
		return '';
	};

	toolbar.addEventListener("click", delegate(buttonHandler));
}


var config = {
		apiKey: [apiKey],
		authDomain: "[projectname].firebaseapp.com",
		databaseURL: "https://[projectname].firebaseio.com",
		projectId: [projectname],
		storageBucket: "",
		messagingSenderId: [messagingSenderId]
	};
}

firebase.initializeApp(config);