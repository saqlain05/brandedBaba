const prodConfig = {
	apiKey: "AIzaSyBb6_SQ3UMYpbOuXgwco6_yepqdgKryJ-4",
	authDomain: "brandedbabapwa.firebaseapp.com",
	databaseURL: "https://brandedbabapwa.firebaseio.com",
	projectId: "brandedbabapwa",
	storageBucket: "brandedbabapwa.appspot.com",
	messagingSenderId: "1066756242290",
	appId: "1:1066756242290:web:695cb46d3c3b875e8fbbeb",
	measurementId: "G-S2BGFZ6HET"
};

const devConfig = {
	apiKey: "AIzaSyBb6_SQ3UMYpbOuXgwco6_yepqdgKryJ-4",
	authDomain: "brandedbabapwa.firebaseapp.com",
	databaseURL: "https://brandedbabapwa.firebaseio.com",
	projectId: "brandedbabapwa",
	storageBucket: "brandedbabapwa.appspot.com",
	messagingSenderId: "1066756242290",
	appId: "1:1066756242290:web:695cb46d3c3b875e8fbbeb",
	measurementId: "G-S2BGFZ6HET"
};

const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;

export default config;
