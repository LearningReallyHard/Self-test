const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const app = express()
const topicRouter = require('./routes/topic.js')
const indexRouter = require('./routes/index.js')
const helmet = require('helmet')
app.use(helmet())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended : false }))
app.use(compression())
app.get('*',function(request, response, next){
	fs.readdir('./data', function(err, filelist){
		request.list = filelist
		next()
	})
})
app.use('/', indexRouter)
app.use('/topic', topicRouter)
app.use(function(req, res, next){
	res.status(404).send('Sorry Cat find that')
})
app.use(function(err, req, res, next){
	console.error(err.stack)
	res.status(500).send('Something Broke')
})

app.listen(3000, () => console.log('Example app listening on port 3000'))
