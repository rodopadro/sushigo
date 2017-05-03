

function generateDeck(){
  console.log("Hola");
  var ref = firebase.database().ref();
  console.log(ref.key);
  var urlRef = ref.child("cartas");
  console.log(urlRef.key);
  urlRef.once("value", function(snapshot) {
  snapshot.forEach(function(child) {
    console.log("Nombre: "+child.child("nombre").val());
    console.log("Tipo: "+child.child("tipo").val());
    console.log("Cantidad: "+child.child("cantidad").val());
    console.log("Valor: "+child.child("valor").val());
    console.log("Src: "+child.child("src").val());
  });
});
}
