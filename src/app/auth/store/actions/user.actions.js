import history from "@history";
import { setDefaultSettings, setInitialSettings } from "app/store/actions/fuse";
import _ from "@lodash";
import store from "app/store";
import * as Actions from "app/store/actions";
import firebase from "firebase/app";
import firebaseService from "app/services/firebaseService";

export const SET_USER_DATA = "[USER] SET DATA";
export const REMOVE_USER_DATA = "[USER] REMOVE DATA";
export const USER_LOGGED_OUT = "[USER] LOGGED OUT";

/**
 * Set user data from Firebase data
 */
export function setUserDataFirebase(user) {
	if (
		user &&
		user.data &&
		user.data.settings &&
		user.data.settings.theme &&
		user.data.settings.layout &&
		user.data.settings.layout.style
	) {
		// Set user data but do not update

		return setUserData(user);
	} else {
		// Create missing user settings
		return createUserSettingsFirebase(user);
	}
}

/**
 * Create User Settings with Firebase data
 */
export function createUserSettingsFirebase(authUser) {
	return (dispatch, getState) => {
		const guestUser = getState().auth.user;
		const fuseDefaultSettings = getState().fuse.settings.defaults;
		const currentUser = firebase.auth().currentUser;

		/**
		 * Merge with current Settings
		 */
		const user = _.merge({}, guestUser, {
			uid: authUser.uid,
			from: "firebase",
			role: ["admin"],
			data: {
				displayName: authUser.displayName,
				email: authUser.email,
				settings: { ...fuseDefaultSettings }
			}
		});
		currentUser.updateProfile(user.data);

		updateUserData(user);
		return dispatch(setUserData(user));
	};
}

/**
 * Set User Data
 */
export function setUserData(user) {
	return (dispatch) => {
		/*
        Set User Settings
         */
		dispatch(setDefaultSettings(user.data.settings));

		/*
        Set User Data
         */
		dispatch({
			type: SET_USER_DATA,
			payload: user
		});
	};
}

/**
 * Update User Settings
 */
export function updateUserSettings(settings) {
	return (dispatch, getState) => {
		const oldUser = getState().auth.user;
		const user = _.merge({}, oldUser, { data: { settings } });

		updateUserData(user);

		return dispatch(setUserData(user));
	};
}

/**
 * Update User Shortcuts
 */
export function updateUserShortcuts(shortcuts) {
	return (dispatch, getState) => {
		const user = getState().auth.user;
		const newUser = {
			...user,
			data: {
				...user.data,
				shortcuts
			}
		};

		updateUserData(newUser);

		return dispatch(setUserData(newUser));
	};
}

/**
 * Remove User Data
 */
export function removeUserData() {
	return {
		type: REMOVE_USER_DATA
	};
}

/**
 * Logout
 */
export function logoutUser() {
	return (dispatch, getState) => {
		const user = getState().auth.user;

		if (!user.role || user.role.length === 0) {
			// is guest
			return null;
		}

		history.push({
			pathname: "/login"
		});

		firebaseService.signOut();

		dispatch(setInitialSettings());

		dispatch({
			type: USER_LOGGED_OUT
		});
	};
}

/**
 * Update User Data
 */
function updateUserData(user) {
	if (!user.role || user.role.length === 0) {
		// is guest
		return;
	}

	firebaseService.updateUserData(user);

	store.dispatch(
		Actions.showMessage({ message: "User data saved to default" })
	);
}
