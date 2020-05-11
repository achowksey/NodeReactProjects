// chatroom object
let chatRoom = {
	creator: "",
	roomName: "",
	chatUsers: new Array(),
	bannedUsers: new Array(),
	private: false,
	password: "",
	sockets: new Object(),
};

// Require the packages we will use and other variables
var http = require("http"),
	socketio = require("socket.io"),
	fs = require("fs");
	usernames = [];
	rooms = [];
	chatrooms = [];
	arraySockets = [];

// Listen for HTTP connections.  This is essentially a miniature static file server that only serves our one file, client.html:
var app = http.createServer(function(req, resp){
	
	fs.readFile("client.html", function(err, data){
		
		if(err) return resp.writeHead(500);
		resp.writeHead(200);
		resp.end(data);
	});
});
app.listen(3456);

// Do the Socket.IO magic:
var io = socketio.listen(app);
io.sockets.on("connection", function(socket){
	// This callback runs when a new Socket.IO connection is established.
	
	// runs when a new user logs in
	socket.on('username_to_server', function(data, callback) {
		let user = data['username'];
		if (usernames.indexOf(data["username"]) != -1){
			callback(false);
		}
		else if(user.localeCompare("") == 0){
			callback(false);
		}
		else{
			callback(true);
			socket.username = data["username"];
			usernames.push(socket.username);
			io.sockets.emit("everyone" ,{message:" has signed on", username : socket.username});
			io.sockets.emit('allUsers', {usernames: usernames});
			io.sockets.emit('rooms', {rooms: rooms});
		} 
	});
	
	// runs when a new room is created
	socket.on('newRoom_to_server', function(data, callback) {
		let room = data["newRoom"];
		if (rooms.indexOf(data["newRoom"]) != -1){
			callback(false);
		}
		else if(room.localeCompare("") == 0){
			callback(false);
		}
		else{
			callback(true);
			let store = Object.create(chatRoom);
			store.roomName = data["newRoom"];
			store.chatUsers = [];
			store.bannedUsers =[];
			store.creator = socket.username;
			if(data['password'] == ""){
				io.sockets.emit("everyone" ,{message:" has created " + room, username : socket.username});
				store.private = false;
			}
			else{
				io.sockets.emit("everyone" ,{message:" has created " + room + ' (private)', username : socket.username});
				store.private = true;
				store.password = data['password'];
			}
			chatrooms.push(store);
			rooms.push(data["newRoom"]);
			io.sockets.emit('rooms', {rooms: rooms});
		} 
	});

	// runs when someone tries to join a chatroom
	socket.on('enterChatRoom', function(data) {
		let check = true;
		let roomName = data['roomName'];
		for(let i=0; i < chatrooms.length; ++i){
			if (roomName.localeCompare(chatrooms[i]['roomName']) == 0){
				for (let r=0; r < chatrooms[i]['bannedUsers'].length; ++r){
					if (socket.username.localeCompare(chatrooms[i]['bannedUsers'][r]) == 0){
						check = false;
						socket.emit("banAlert", {data: ""});
					}
				}
				if (check){
					socket.private = chatrooms[i]['private'];
					if (socket.private == false){
						socket.room = chatrooms[i]['roomName'];
						socket.users =  chatrooms[i]['chatUsers'];
						socket.creator = chatrooms[i]['creator'];
						chatrooms[i]['chatUsers'].push(socket.username);
						chatrooms[i]['sockets'][socket.username] = socket;
						socket.private = chatrooms[i]['private'];
						socket.join(socket.room);
						io.in(socket.room).emit('usernames', {name: socket.creator, usernames: socket.users});
						socket.emit("createChatRoom", {private: false, name: socket.room, users: socket.users, user: socket.username, creator: socket.creator});
						io.sockets.emit("everyone" ,{message:" has joined " + socket.room, username : socket.username});
						io.in(socket.room).emit("message_to_client",{message:'has joined the chat', username : socket.username}) 
					}
					else{
						socket.emit("checkPassword", {password: chatrooms[i]['password'], roomName:roomName});
					}
				}
			}
		}

	});

	// runs when someone tries to join a private chatroom
	socket.on('enterPrivateChatRoom', function(data) {
		let roomName = data['roomName'];
		for(let i=0; i < chatrooms.length; ++i){
			if (roomName.localeCompare(chatrooms[i]['roomName']) == 0){
				socket.room = chatrooms[i]['roomName'];
				socket.users =  chatrooms[i]['chatUsers'];
				socket.creator = chatrooms[i]['creator'];
				chatrooms[i]['chatUsers'].push(socket.username);
				chatrooms[i]['sockets'][socket.username] = socket;
				socket.private = chatrooms[i]['private'];
				socket.join(socket.room);
				io.in(socket.room).emit('usernames', {name: socket.creator, usernames: socket.users});
				socket.emit("createChatRoom", {private: true, name: socket.room, users: socket.users, user: socket.username, creator: socket.creator});
				io.sockets.emit("everyone" ,{message:" has joined " + socket.room + ' (private)', username : socket.username});
				io.in(socket.room).emit("message_to_client",{message:'has joined the chat', username : socket.username}) 
			}
		}

	});

	// runs when a user sends a message to their chatroom
	socket.on('message_to_server', function(data) {

		io.in(socket.room).emit("message_to_client",{message:data["message"], username : socket.username + ':'}) // broadcast the message to other users
	});

	// runs when a user sends a private message to their chatroom
	socket.on('privateMsg', function(data) {
		let person = data['whom'];
		socket.emit("message_to_client",{message:data["message"], username : '*to ' + person + '*:'});
		let privateSocket;
		for(let i=0; i < chatrooms.length; ++i){
			if ((socket.room).localeCompare(chatrooms[i]['roomName']) == 0){
				privateSocket = chatrooms[i]['sockets'][person];
			}
		}
		privateSocket.emit("message_to_client",{message:data["message"], username : '*from ' + socket.username + '*:'});
	});

	// runs when someone leaves their chatroom
	socket.on('logout', function(data){
		for(let i=0; i < chatrooms.length; ++i){
			if ((socket.room).localeCompare(chatrooms[i]['roomName']) == 0){
				if(chatrooms[i]['chatUsers'].indexOf(socket.username) != -1){
					chatrooms[i]['chatUsers'].splice(chatrooms[i]['chatUsers'].indexOf(socket.username), 1);
				}
				socket.users = chatrooms[i]['chatUsers'];
				socket.creator = chatrooms[i]['creator'];
			}
		}
		if(data['data'].localeCompare("k") == 0){
			io.in(socket.room).emit("message_to_client",{message:'has been kicked from the chat', username : socket.username}); 
			io.sockets.emit("everyone" ,{message:" has been kicked from " + socket.room, username : socket.username});
		}
		else if(data['data'].localeCompare("b") == 0){
			io.in(socket.room).emit("message_to_client",{message:'has been banned from the chat', username : socket.username});
			io.sockets.emit("everyone" ,{message:" has been banned from " + socket.room, username : socket.username});
		}
		else if(data['data'].localeCompare("m") == 0){
			io.in(socket.room).emit("message_to_client",{message:'has left the chat', username : socket.username});
			io.sockets.emit("everyone" ,{message:" has left " + socket.room, username : socket.username});
		}
		socket.emit('clear', {data: ""});
		socket.leave(socket.room);
		io.in(socket.room).emit('usernames', {name: socket.creator, usernames: socket.users});
	});

	// runs when someone is kicked from the chatroom
	socket.on('kick', function(data){
		let person = data['person'];
		let kickedUser;
		for(let i=0; i < chatrooms.length; ++i){
			if ((socket.room).localeCompare(chatrooms[i]['roomName']) == 0){
				kickedUser = chatrooms[i]['sockets'][person];
				delete chatrooms[i]['sockets'][person];
			}
		}
		kickedUser.emit('kickedOut', {data: "k"});
	});

	// runs when someone is banned from the chatroom
	socket.on('ban', function(data){
		let person = data['person'];
		let bannedUser;
		for(let i=0; i < chatrooms.length; ++i){
			if ((socket.room).localeCompare(chatrooms[i]['roomName']) == 0){
				chatrooms[i]['bannedUsers'].push(person);
				bannedUser = chatrooms[i]['sockets'][person];
				delete chatrooms[i]['sockets'][person];
			}
		}
		bannedUser.emit('kickedOut', {data: "b"});
	});


	// runs when user wants to clear their chatroom
	socket.on('clearing', function(data){
		socket.emit('clear', {data: ""});
	});


	// runs when host wants to transfer duties
	socket.on('hostChange', function(data){
		let person = data['person'];
		let newSocket;
		for(let i=0; i < chatrooms.length; ++i){
			if ((socket.room).localeCompare(chatrooms[i]['roomName']) == 0){
				chatrooms[i]['creator'] = person;
				socket.creator = person;
				for(let j=0; j<chatrooms[i]['chatUsers'].length; ++j){
					let newPerson = chatrooms[i]['chatUsers'][j];
					newSocket = chatrooms[i]['sockets'][newPerson];
					newSocket.emit("createChatRoom", {private: chatrooms[i]['private'], name: socket.room, users: socket.users, user: newSocket.username, creator: chatrooms[i]['creator']});
					io.in(socket.room).emit('usernames', {name: socket.creator, usernames: socket.users});
				}
			}
		}
		io.sockets.emit("everyone" ,{message:" has become the new host of " + socket.room, username : person});
		io.in(socket.room).emit("message_to_client",{message:'has become the host', username : person}) 
	});

	// runs when host wants to destroy room
	socket.on('destroy', function(data){
		let newSocket;
		let store;
		let roomStore;
		io.in(socket.room).emit("destroyAlert", {data: ""});
		for(let i=0; i < chatrooms.length; ++i){
			if ((socket.room).localeCompare(chatrooms[i]['roomName']) == 0){
				store = i;
				for (let j=0; j < rooms.length; ++j){
					if (rooms[j].localeCompare(socket.room) == 0){
						roomStore = j;
						break;
					}
				}
				for(let j=0; j<chatrooms[i]['chatUsers'].length; ++j){
					let newPerson = chatrooms[i]['chatUsers'][j];
					newSocket = chatrooms[i]['sockets'][newPerson];
					newSocket.emit('kickedOut', {data: ""});
				}
				break;
			}
		}
		rooms.splice(roomStore, 1);
		chatrooms.splice(store, 1);
		io.sockets.emit("everyone" ,{message:" has destroyed " + socket.room, username : socket.username});
		io.sockets.emit('rooms', {rooms: rooms});
	});

	// runs when a user sends a message to everyone
	socket.on('message_to_everyone', function(data) {
		io.sockets.emit("everyone" ,{message:data["message"], username : socket.username + ':'}); // broadcast the message to other users
	});

	// runs when a user disconnects
	socket.on('disconnect', function(data){
		if(!socket.username){
			return;
		}
		usernames.splice(usernames.indexOf(socket.username), 1);
		io.sockets.emit("everyone" ,{message:" has signed off", username : socket.username}) 
		io.sockets.emit('allUsers', {usernames: usernames});
		if(!socket.room){
			return;
		}
		let beforeL;
		let afterL;
		for(let i=0; i < chatrooms.length; ++i){
			if ((socket.room).localeCompare(chatrooms[i]['roomName']) == 0){
				beforeL = chatrooms[i]['chatUsers'].length;
				if(chatrooms[i]['chatUsers'].indexOf(socket.username) != -1){
					chatrooms[i]['chatUsers'].splice(chatrooms[i]['chatUsers'].indexOf(socket.username), 1);
				}
				socket.users = chatrooms[i]['chatUsers'];
				afterL = chatrooms[i]['chatUsers'].length;
			}
		}
		if (beforeL != afterL){
			io.in(socket.room).emit("message_to_client",{message:'has disconnected', username : socket.username}) 
			io.in(socket.room).emit('usernames', {name: socket.creator, usernames: socket.users});
			socket.leave(socket.room);
			socket.emit('clear', {data: ""});
		}
	});
});