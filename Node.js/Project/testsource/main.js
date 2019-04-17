const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')
})

const rooms = ['room1','room2']
io.on('connection', socket => {
	socket.on('joinroom', (num, name) => {
		socket.join(rooms[num], () => {
			io.to(rooms[num]).emit('chat message', `${name} joined ${rooms[num]}`)
		})
	})
	socket.on('leaveroom', (num, name) => {
		socket.leave(rooms[num], () => {
			io.to(rooms[num]).emit('chat message', `${name} just left ${rooms[num]}`)
		})
	})
	socket.on('chat message', (num, name, msg) => {
		io.to(rooms[num]).emit('chat message',`${name} : ${msg}`)
	})

})

http.listen(3000)
