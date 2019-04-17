1번
var url = require('url');
...
var _url = request.url
var queryData = url.parse(_url,true).query


2번
var fs = require('fs');
fs.readFile('sample.txt','utf-8',function(err, data){
	console.log(data);
})


3번
var testFolder = '../data';
var fs = require('fs')

fs.readdir(testFolder, function(err, filelist){
	console.log(filelist)
})

4번
var http = require('http');
var app = http.createServer(function(request,response){
	response.writeHead(200) // 페이지 통신 코드
	response.end('success')
});
app.listen(3000);

5번
var qs = require('querystring')

var body
request.on('data', callback(data){
	body += data;
})

request.on('end', callback(){
	var post = qs.parse(body)
})

6번
var fs = require('fs')
fs.writeFile(A, B, 'utf8', function(err){
				response.writeHead(302,{Location:`/?id=test`});
				response.end()
})

7번
var fs = require('fs')
fs.rename(`../data/A`, `../data/B`, function(err){
			})

8번
./test/eight

9번
const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World'))

app.listen(3000, () => console.log('Example app listening on port 3000'))

10번
app.get('/page/:pageId', function(request, response){
	console.log(request.params.pageId) // { pageId : 값 }
})

11번
app.post('/create_process', function(request, response){
})

12번
npm install body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended : false }))
...
app.post('/create_process', function(request, response){
	console.log(request.body.id, request.body.pass)
})

13번
app.post('/A',function(request, response){
	console.log(request.body)
})
ex) <input name="title"><input name="content">
결과 = { title : 값, content : 값}

14번
npm install compression
const compression = require('compression')
app.use(compression())

15번
app.use(function(request, response, next){
	fs.readdir('../data', function(err, filelist){
		request.list = filelist
		next()
	})
})

16번
app.get('*', ...)

17번
app.use(express.static('public'))
...
<img src="/images/sky.jpg">

18번
app.use(function(req, res, next){
	res.status(404).send('Sorry Cat find that')
})

19번
app.get('/', function(request, response, next){
		fs.readFile(`A`,'utf-8', function(err, description){
			 if(err){
			 	next(err)
			 }else{
				...
			}
		})
})

20번
app.use(function(err, req, res, next){
	console.error(err.stack)
	res.status(500).send('Something Broke')
})

21번
- ./routes/topic.js
	const express = require('express')
	const router = express.Router()

	router.get('/create', ... )
	router.post('/update', ... )

	module.exports = router

- main.js
	const topicRouter = require('./routes/topic')
	...
	app.use('/topic', topicRouter)

22번
npm install --save helmet
const helmet = require('helmet')
app.use(helmet())

23번
./test/TwentyThree

24번
npm install --save socket.io
const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

25번
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')
})

26번
$('form').submit(e => {
	...
})

27번
<script src="/socket.io/socket.io.js"></script>
//

28번
const socket = io()
socket.emit('chat message', $('#m').val()[, params, ...])
socket.on('chat message', msg => {
	$('#messages').append($('<li>').text(msg))
})

29번
(1)$(() => {})
(2)$(document).ready(function(){})

30번
const io = require('socket.io')(http)
io.on('connection', socket => {
	socket.on('chat message', (msg) => {
		io.emit('chat message', msg)
	})
})

31번
app.js
-------------------------------------------------------------------
const namespace1 = io.of('/namespace1')

namespace1.on('connection', socket => {
	namespace1.emit('news', 'hello')
})
--------------------------------------------------------------------
index.html
---------------------------------------------------------------------
const namespace = io('/namespace1')
namespace.on('news', data => {
console.log(data)
})
---------------------------------------------------------------------

32번
socket.join('room1', () => {
	io.to('room1').emit('joinRoom', num, name)
})

33번
socket.leave('room1', () => {
	io.to('room1').emit('leaveroom', num, name)
})

34번
../test/ThirtyFour

35번
../test/ThirtyFive

36번
../test/ThirtySix

37번
$('#navigation li').on('click', function(){
	$('#navigation li').removeClass('selected')
	$(this).addClass('selected')
})

38번
$( "ul.first" ).find( ".foo" ).css( "background-color", "red" )
  .end().find( ".bar" ).css( "background-color", "green" );

39번
client
---------------------------------
npm install --save socket.io-client (설치)

import io from 'socket.io-client'

class App extends Component{
	constructor(){
		super()
		this.state = {
			msg:""
		}
		this.socket = io('http://localhost:80')
	}
	componentDidMount(){
		const { socket } = this
		socket.on('chat message', msg => {
			this.setState({msg})
		})
	}
	render(){
		return(
			<div>
				{msg}
			</div>
		)
	}
}
---------------------------------
//

40번
const messages = document.getElementById('messages')
messages.scrollTo(0, messages.scrollHeight)
