const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')
})

let room = ['room1','room2']

io.on('connection', socket => {
	socket.on('disconnect', () => {
		console.log('user disconnected')
	})

	socket.on('leaveRoom', (num, name) => {
		socket.leave(room[num], () => {
			console.log(name + ' leave a ' + room[num])
			io.to(room[num]).emit('leaveroom', num, name)
		})
	})

	socket.on('joinRoom', (num, name) => {
		socket.join(room[num], () => {
			console.log(name + ' join a ' + room[num])
			io.to(room[num]).emit('joinRoom', num, name)
		})
	})

	socket.on('chat message', (num, name, msg) => {
		io.to(room[num]).emit('chat message', name, msg)
	})
})

http.listen(3000, () => {
	console.log('Connect at 3000')
})
