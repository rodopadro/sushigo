

function generateDeck(){
  console.log("Hola");
  var ref = firebase.database().ref();
  console.log(ref.key);
  var urlRef = ref.child("cartas");
  console.log(urlRef.key);
  urlRef.once("value", function(snapshot) {
  snapshot.forEach(function(child) {
    console.log(child.key+": "+child.val());
  });
});
}
//http://imgur.com/gallery/Oz8LELN
