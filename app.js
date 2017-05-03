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

function socketFunctions(socket){
	console.log('user connected');

	socket.on('disconnect', () => {
		console.log('user disconnected');
		socket.leave(socket.room);
		gm.exitPlayer();
	});

	socket.on('createRooms', (roomName, username) => {
		gm = new Game(roomName);
		rooms.push(roomName);
		socket.join(roomName);
		socket.room = roomName;
		socket.index = gm.count;
		gm.addPlayer(username);
		socket.username = username;
		socket.to(roomName).emit('addPlayer', username);
		console.log(`User ${username} created ${roomName}`);

	});

	socket.on('cardPicked', (card, username, index)=>{
		gm.player[socket.index].hand.splice(index, 1);
		gm.switchHand();
		let player = gm.players[socket.index];
		socket.emit('updateHand', player.username, player.hand);
		socket.to(socket.room).emit('updateBoard', username, card);
	});

	socket.on('scoreCalculated', (score, Player)=>{
		socket.to(socket.room).emit('updateScores', Player, score);
	});

	socket.on('playerReady', ()=>{
		gm.addPlayerReady();
		if(gm.count > 1){
			if(gm.allPlayersReady()){
				gm.startGame();
				let player = gm.players[socket.index];
				//let player = gm.players[0];
				socket.emit('updateHand', player.username, player.hand);
			}
		}
	});

	socket.on('connectToRoom', (roomName, username)=>{
		if(rooms.includes(roomName)){
			if(!gm.isFull()){
				socket.join(roomName);
				socket.room = roomName;
				socket.username = username;
				socket.index = gm.count;
				gm.addPlayer(username);
				socket.index = gm.count;
				socket.emit('addPlayer', username);
				console.log(`User ${username} joined ${roomName}`);
			}else {
				socket.emit('error', 'This room is full');
			}
		}else{
			socket.emit('error', 'There is not such room');
		}
	});

}

io.on("connection", socketFunctions );