const app = require('express')()
const http = require('http').createServer(app) //http 서버를 염
const io = require('socket.io')(http)// socket.io 서버를 http에 연결

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')
})

const namespace1 = io.of('/namespace1')

namespace1.on('connection', socket => {
	namespace1.emit('news', { hello : "Someone connected at namespace1"})
})

const namespace2 = io.of('/namespace2')

namespace2.on('connection', socket => {
	namespace2.emit('news', { hello : "Someone connected at Namespace2"})
})

http.listen(3000, () => {
	console.log('Connected at 3000')
})
