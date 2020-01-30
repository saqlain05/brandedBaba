import React, { Component } from "react";
import { connect } from "react-redux";
import * as userActions from "app/auth/store/actions";
import { bindActionCreators } from "redux";
import * as Actions from "app/store/actions";
import firebaseService from "app/services/firebaseService";

class Auth extends Component {
	/*eslint-disable-next-line no-useless-constructor*/
	constructor(props) {
		super(props);

		/**
		 * Comment the line if you do not use Firebase
		 */
		this.firebaseCheck();
	}

	firebaseCheck = () => {
		firebaseService.init();

		firebaseService.onAuthStateChanged((authUser) => {
			if (authUser) {
				this.props.showMessage({ message: "Logging in with Firebase" });

				/**
				 * Retrieve user data from Firebase
				 */

				this.props.setUserDataFirebase(authUser);

				this.props.showMessage({ message: "Logged in with Firebase" });
			}
		});
	};

	render() {
		const { children } = this.props;

		return <React.Fragment>{children}</React.Fragment>;
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			logout: userActions.logoutUser,
			setUserData: userActions.setUserData,
			setUserDataFirebase: userActions.setUserDataFirebase,
			showMessage: Actions.showMessage,
			hideMessage: Actions.hideMessage
		},
		dispatch
	);
}

export default connect(null, mapDispatchToProps)(Auth);
