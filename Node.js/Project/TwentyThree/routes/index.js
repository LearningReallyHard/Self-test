const express = require('express')
const router = express.Router()
const template = require('../lib/template.js')

router.get('/', (request, response) =>{
   	var title = 'welcome';
    var description = "Hello, Node.js"
    var list = template.list(request.list)
	var html = template.html(title, list,
		`<h2>${title}</h2>${description}
		<img src="/images/hello.jpg" style="width:200px;height:200px;display:block;">
		`,
	   	`<a href="/topic/create">create</a>`)
	response.send(html);
})

module.exports = router
