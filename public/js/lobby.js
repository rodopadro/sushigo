/**
 * Created by RPadro on 03/05/2017.
 */

function create(){
	let name = $( "#lobbyname1" ).val();
	sessionStorage.setItem('tipo', 'create');
	sessionStorage.setItem('id', name);
}

function join(){
	let name = $( "#lobbyname2" ).val();
	sessionStorage.setItem('tipo', 'join');
	sessionStorage.setItem('id', name);
}
