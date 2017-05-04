/**
 * Created by RPadro on 03/05/2017.
 */
var config = {
	apiKey: "AIzaSyCGsjiw6NUqH1IMV5LW7cB6WAUFfhcc7Os",
	authDomain: "sushigo-dcf8d.firebaseapp.com",
	databaseURL: "https://sushigo-dcf8d.firebaseio.com",
	projectId: "sushigo-dcf8d",
	storageBucket: "sushigo-dcf8d.appspot.com",
	messagingSenderId: "1028162049014"
};
//firebase.initializeApp(config);

var userId;
function searchFriend(){
	var friendname = document.getElementById('friendsname').value;
	var ref = firebase.database().ref('Users/');
	ref.once("value").then(function(datasnapshot) {
		datasnapshot.forEach(function(subSnap){
			var name = subSnap.child("username").val();
			console.log(name);

			if(friendname === name){
				ref.child(userId).child("friends").push({
					friendname: name
				});
				alert("amigo agregado :)");
			}
		});
	});
}


function userNames(){
	var name;
	const dbRefObject=firebase.database().ref().child('Users');
	const game=dbRefObject.child(userId);
	game.on('value', snapshot => {
		name = snapshot.val().username;
		console.log(name);
	});
	return name;
}


function logOut(){
	firebase.auth().signOut().then(function() {
		console.log('Signed Out');
		window.location = "/login";
	}, function(error) {
		console.error('Sign Out Error', error);
	});
}
firebase.auth().onAuthStateChanged(function(user) {
	if(user){
		userId = firebase.auth().currentUser.uid;
		console.log(userId);
		//searchFriend();
	}else{
		console.log("not loged in!");
	}
});