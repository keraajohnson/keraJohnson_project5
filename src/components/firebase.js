import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDzqdezahqnQ7AFPytKVuzaU0KQKhipqus",
    authDomain: "virtual-recipe-box.firebaseapp.com",
    databaseURL: "https://virtual-recipe-box.firebaseio.com",
    projectId: "virtual-recipe-box",
    storageBucket: "virtual-recipe-box.appspot.com",
    messagingSenderId: "829227345556"
};
firebase.initializeApp(config);

export default firebase;