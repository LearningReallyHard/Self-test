const express = require('express')
const fs = require('fs')
const router = express.Router()
const template = require('../lib/template.js')

router.get('/create',function(request, response){
    	var title = 'WEB - create';
    	var list = template.list(request.list)
	    var html = template.html(title, list, `
	    			<form action="/topic/create_process" method="post">
	    				<p><input type="text" name="title" placeholder="title"></p>
	    				<p>
	    					<textarea name="description" placeholder="description"></textarea>
	    				</p>
	    				<p>
	    					<input type="submit">
	    				</p>
	    			</form>
	    		`,'')
		response.send(html)
})

router.post('/create_process', function(request, response){
	var post = request.body;
	var title = post.title;
	var description = post.description;
	fs.writeFile(`./data/${title}`, description, 'utf8', function(err){
		response.redirect(`/topic/${title}`)
	})
})

router.post('/update_process', function(request, response){
		var post = request.body
		var title = post.title;
		var id = post.id
		var description = post.description;
		fs.rename(`./data/${id}`, `./data/${title}`, function(err){
			fs.writeFile(`./data/${title}`, description, 'utf8', function(err){
				response.redirect(`/topic/${title}`)
			})
		})
})

router.get('/update/:pageId', function(request, response){
		fs.readFile(`./data/${request.params.pageId}`,'utf8', function(err, description){
			var title = request.params.pageId;
			var list = template.list(request.list)
			var html = template.html(title, list,
			    	   `
			    	    <form action="/topic/update_process" method="post">
			    	    	<input type="hidden" name="id" value="${title}"/>
		    				<p><input type="text" name="title" placeholder="title" value=${title}></p>
		    				<p>
		    					<textarea name="description" placeholder="description">${description}</textarea>
		    				</p>
		    				<p>
		    					<input type="submit">
		    				</p>
	    				</form>
			    	   `,
			    		`<a href="/topic/create">create</a><a href="/topic/update/${title}">update</a>`)
			response.send(html)
		})
})

router.post('/delete_process', function(request, response){
		var post = request.body
		var id = post.id
		fs.unlink(`./data/${id}`, function(err){
			response.redirect('/')
		})
})

router.get('/:pageId', function(request, response, next){
		fs.readFile(`./data/${request.params.pageId}`,'utf-8', function(err, description){
			 if(err){
			 	next(err)
			 }else{
			 	var title = request.params.pageId;
				var list = template.list(request.list)
				var html = template.html(title, list, `<h2>${title}</h2>${description}`,
				    		`<a href="/topic/create">create</a>
				    		<a href="/topic/update/${title}">update</a>
				    		<form action="/topic/delete_process" method="post">
				    			<input type="hidden" name="id" value="${title}">
				    			<input type="submit" value="delete">
				    		</form>`)
				 response.send(html)
			 }
		})
})
module.exports = router
