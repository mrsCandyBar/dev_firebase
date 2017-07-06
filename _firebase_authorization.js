
class Authorize {

	signIn(auth, username, password) {
		var signInStatus = new Promise((resolve, reject) => {
			auth.signOut().then(function() { 
				resolve('sign in >>> passed', response);

			}, (error) => {
				let errorCode = error.code;
				let errorMessage = error.message;
				reject('sign in >>> failed', errorCode, errorMessage)
			});
		});

		return signinStatus;
	}
	//passed > checkAuthState();

	signOut(auth) { 
		var signOutStatus = new Promise((resolve, reject) => {
			auth.signOut().then(function() { 
				resolve('sign out >>> passed');

			}).catch(function(error) {
				reject('sign out >>> failed', error);
			});
		});

		return signOutStatus;
	};

	state(auth) {
		var authState = new Promise((resolve, reject) => {
			auth.onAuthStateChanged(function(user) {
				if (user) {
					resolve('auth state >>> signed in', user);
					
				} else {
					reject('auth state >>> signed out', user);
				}
			});
		});

		return authState;
	};
	//checkAuthState >> listenToDB();

	reAuthenticate(user, credential) {
		var reAuthStatus = new Promise((resolve, reject) => {
			user.reauthenticate(credential).then(function() {
				resolve('reauthenticate >>> passed');

			}, function(error) {
				reject('reauthenticate >>> failed');
			});
		});

		return reAuthStatus;
	}
}

module.exports = new Authorize();