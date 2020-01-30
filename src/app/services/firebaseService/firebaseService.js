import config from "./firebaseServiceConfig";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
class firebaseService {
	init() {
		if (firebase.apps.length) {
			return;
		}
		firebase.initializeApp(config);
		this.db = firebase.database();
		this.auth = firebase.auth();
		this.firestore = firebase.firestore();
	}

	getUserData = (user) => {
		if (!firebase.apps.length) {
			return;
		}
		return new Promise((resolve, reject) => {
			return user;
		});
	};

	updateUserData = (user) => {
		if (!firebase.apps.length) {
			return;
		}
		return user;
	};

	onAuthStateChanged = (callback) => {
		if (!this.auth) {
			return;
		}
		this.auth.onAuthStateChanged(callback);
	};

	signOut = () => {
		if (!this.auth) {
			return;
		}
		this.auth.signOut();
	};
}

const instance = new firebaseService();

export default instance;
