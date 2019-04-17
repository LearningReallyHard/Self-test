const app = require('express')()
const http = require('http').createServer(app) //http 서버를 염
const io = require('socket.io')(http)// socket.io 서버를 http에 연결

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')
})

io.on('connection', socket => {
	console.log('a user connected')
	io.emit('join', `Someone just got in`)
	socket.on('chat message', (msg) => {
		io.emit('chat message', msg)
	})
	socket.on('disconnect', () => {
		io.emit('leave', 'Someone just left')
		console.log('user disconnected')
	})
})

http.listen(3000, () => {
	console.log('Connected at 3000')
})
