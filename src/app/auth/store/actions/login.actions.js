import firebaseService from "app/services/firebaseService";
import * as Actions from "app/store/actions";

export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export function submitLoginWithFireBase({ username, password }) {
	return (dispatch) =>
		firebaseService.auth &&
		firebaseService.auth
			.signInWithEmailAndPassword(username, password)
			.then((res) => {
				console.log(res);
				return dispatch({
					type: LOGIN_SUCCESS
				});
			})
			.catch((error) => {
				const usernameErrorCodes = [
					"auth/email-already-in-use",
					"auth/invalid-email",
					"auth/operation-not-allowed",
					"auth/user-not-found",
					"auth/user-disabled"
				];
				const passwordErrorCodes = [
					"auth/weak-password",
					"auth/wrong-password"
				];

				const response = {
					username: usernameErrorCodes.includes(error.code)
						? error.message
						: null,
					password: passwordErrorCodes.includes(error.code)
						? error.message
						: null
				};

				if (error.code === "auth/invalid-api-key") {
					dispatch(Actions.showMessage({ message: error.message }));
				}

				return dispatch({
					type: LOGIN_ERROR,
					payload: response
				});
			});
}
