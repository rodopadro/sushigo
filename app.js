const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');


const config = require('./config');
const index = require('./routes/index');
const users = require('./routes/users');
import {Game} from './routes/Game';
import {Card} from './routes/Card';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const server = app.listen(8080, () => console.log("Listening to localhost:", 8080));

const io = require('socket.io')(server);

let gm;
let rooms = [];
let tmp = [];
let counter = 0;
let tmp2 = [];

function socketFunctions(socket){
	console.log('user connected');

	socket.on('disconnect', () => {
		console.log('user disconnected');
		socket.leave(socket.room);
		gm.exitPlayer();
	});

	socket.on('createRoom', (roomName, username) => {
		gm = new Game(roomName);
		rooms.push(roomName);
		socket.join(roomName);
		socket.room = roomName;
		socket.index = gm.count;
		console.log(rooms);
		console.log(socket.index);
		gm.addPlayer(username);
		socket.username = username;
		socket.emit('addPlayer', username);
		console.log(`User ${username} created ${roomName}`);
	});

	socket.on('cardPicked', (card, username, index)=>{
		console.log(card);
		console.log(index);
		gm.players[socket.index].hand.splice(index, 1);
		tmp2.push(socket);
		if(counter++ == gm.count){
			gm.switchHand();
			for(let i = 1; i < gm.count; i++){
				let player = gm.players[tmp2[i].index];
				console.log(player.hand[index]);
				tmp2[i].emit('updateHand', player.username, player.hand);
				tmp2[i].emit('updateBoard', player.username, player.hand[index]);
				tmp2[i].to(socket.room).broadcast.emit('updateBoard', player.username, player.hand[index]);
			}
			tmp2 = [];
			counter = 0;
		}

	});

	socket.on('scoreCalculated', (score, Player)=>{
		socket.to(socket.room).emit('updateScores', Player, score);
	});

	socket.on('playerReady', ()=>{
		gm.addPlayerReady();
		tmp.push(socket);
		if(gm.count > 1){
			if(gm.allPlayersReady()){
				socket.to(socket.room).broadcast.emit('fillTables', gm.players);
				gm.startGame();
				let player;
				for(let i = 0; i < tmp.length; i++){
					player = gm.players[tmp[i].index];
					tmp[i].emit('updateHand', player.username, player.hand);
				}
			}
		}
	});

	socket.on('connectToRoom', (roomName, username)=>{
		if(rooms.includes(roomName)){
			if(!gm.isFull()){
				socket.join(roomName);
				socket.room= roomName;
				socket.username = username;
				socket.index = gm.count;

				socket.index = gm.count;
				for(let i = 0; i < gm.count; i++){
					socket.emit('addPlayer', gm.players[i].username);
				}
				gm.addPlayer(username);
				socket.emit('addPlayer', username);
				socket.to(socket.room).broadcast.emit('addPlayer', username);
				console.log(`User ${username} joined ${roomName}`);
			}else {

			}
		}else{

		}
	});

}

io.on("connection", socketFunctions );