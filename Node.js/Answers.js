(1)
npm install --save socket.io-client
import React from 'react'
import io from 'socket.io-client'

class App extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			msg:''
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
				{this.state.msg}
			</div>
		)
	}
}

//
(3)
const target = document.getElementById('message')
target.scrollTo(0, target.scrollHeight)
