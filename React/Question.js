// 27
// (1)
import React,{ Component } from 'react'

class AddColorForm extends Component{
  constructor(props){
    super(props)
    this.submit = this.submit.bind(this)
  }
  submit(e){
    const { _title, _color } = this.refs
    console.log(_title.value, _color.value)
    _title.value = ''
    _color.value = '#CCC'
    _title.focus()
    e.preventDefault()
  }
  render(){
    const { submit } = this

    return(
      <form onSubmit={submit}>
        <input name="title" ref="_title" required/>
        <input type="color" ref="_color" required/>
        <button>Submit</button>
      </form>
    )
  }
}

// (2)
const logColor = (title, color) => console.log(title, color)

<AddColorForm onNewColor={logColor}/>

submit(e){
    const { _title, _color } = this.refs
    this.props.onNewColor(_title.value, _color.value)
    _title.value = ''
    _color.value = '#CCC'
    _title.focus()
    e.preventDefault()
}

// (3)
const AddColorForm = ({onNewColor}) => {
  let _title = ''
  let _color = ''

  const submit = (e) => {
    onNewColor(_title.value, _color.value)
    _title.value = ''
    _color.value = '#CCC'
    _title.focus()
    e.preventDefault()
  }
  return (
    <form onSubmit={submit}>
      <input name="title" ref={input => _title = input} required/>
      <input type="color" ref={input => _color = input} required/>
      <button>Submit</button>
    </form>
  )
}

// 30
// (2)
import React, { Component } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

class Clock extends Component{
  constructor(props){
    super(props)
    this.state = this.getClockTime()
  }
  componentDidMount(){
    this.interval = setInterval(() => this.setState(this.getClockTime()), 1000)
  }
  componentWillUnmount(){
    clearInterval(this.interval)
  }
  getClockTime(){
    const date = new Date()
    return ({
      hours : date.getHours(),
      minutes : date.getMinutes(),
      seconds : date.getSeconds()
    })
  }
  render(){
    const { hours, minugtes, seconds } = this.state
    const { onClose } = this.props
    return (
      <div className="clock">
        {hours} : {minutes} : {seconds}
        <span onClick={onClose}>x</span>
      </div>
    )
  }
}

const target = document.getElementById('root')
render(
  <Clock onClose={() => unmountComponentAtNode(target)}/>
  , target)

// 31
// (2)
componentWillMount(){
  this.style = {backgroundColor:'#CCC'}
}
componentWillUpdate(){
  this.style = null
}
shouldComponentUpdate(nextProps, nextState){
  return nextProps.rating !== this.props.rating
}

// 32
// (1)
import React from 'react'
import ReactDOM from 'react-dom'

const PeopleList = ({data}) =>
  <div>
    {
      data.results.map(
        (person, i) => {
          const { first, last } = person.name
          return <div key={i}>{first}{last}</div>
        }
      )
    }
  </div>

const RandomMeUsers = DataComponent(PeopleList, "https://randomuser.me/api/")
ReactDOM.render(
  <RandomMeUsers count={10}/>
  ,document.getElementById('root'))

// (2)
import React, { Component } from 'react'
import { fetch } from 'isomorphic-fetch'

const DataComponent = (ComposedComponent, url) =>
  class DataComponent extends Component{
    constructor(props){
      super(props)
      this.state = {
        data:[],
        loading:false,
        loaded:false
      }
    }
    componentWillMount(){
      this.setState({loading:true})
      fetch(url+`/?count=${this.props.count}`)
      .then(response => JSON.parse(response))
      .then(data => this.setState({
        date,
        loading:false,
        loaded:true
      }))
    }
    render(){
      const { data, loading } = this.state

      return (
        <div>
          {
            ( loading ) ? '데이터 로딩 중' :
            <ComposedComponent {...this.state}/>
          }
        </div>
      )
    }
  }

// 33
// (1)
import React,{ Component } from 'react'

const Expandable = ComposedComponent =>
  class Expandable extends Component{
    constructor(props){
      super(props)
      this.state = {
        collapsed : props.hidden
      }
      this.expandCollapse = this.expandCollapse.bind(this)
    }
    expandCollapse(){
      this.setState({collapsed:!this.state.collapsed})
    }
    render(){
      const { expandCollapse } = this
      return (
        <ComposedComponent expandCollapse={expandCollapse} {...this.state} {...this.props}/>
      )
    }
  }

// (2)
const ShowHideMessage = ({children, collapsed, expandCollapse}) =>
  <div onClick={expandCollapse}>
    {
      (collapsed) ? '' : children
    }
  </div>

// (3)
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class MenuButton extends Component {
  constructor(props){
    super(props)
    this.state = {
      collapsed : true
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({collasped : nextProps.collapsed})
  }
  render(){
    const { collapsed, children, expandCollapse, txt } = this.props

    return (
      <div>
        {
          (collapsed) ? '' : children
        }
        <button onClick={expandCollapse}>{txt}</button>
      </div>
    )
  }
}

const PopUpButton = Expandable(MenuButton)
ReactDOM.render(
  <PopUpButton hidden={true} txt="Button">
    <span>Children</span>
  </PopUpButton>
  document.getElementById('root'))

// 34
// (5)
const CountDown = ({count=5, tick, reset}) => {
  if(count){
    setTimeOut(tick, 1000)
  }

  return (
    {
      (count) ? count :
      <button onClick={() => reset(10)}>reset</button>
    }
  )
}
//

// (7)
const countdownActions = dispatch => ({
  tick(){
    dispatch.handleAction({
      type:'TICK',
    })
  },
  reset(count){
    dispatch.handleAction({
      type:'RESET',
      count
    })
  }
})

// (8)
import Dispatcher from 'flux'
import React from 'react'

class CountdownDispatcher extedns Dispatcher{
  handleAction(action){
    this.dispatch({
      action
    })
  }
}

// (9)
import { EventEmitter } from 'events'

class CountdownStore extedns EventEmitter{
  constructor(count, dispatcher){
    super()
    this._count = count
    this.dispatchIndex = dispatcher.register(
      this.dispatch.bind(this)
    )
  }
  dispatch(payload){
    const { type, count } = payload.action

    switch(type){
      case 'TICK':
        this._count -= 1
        this.emit('TICK', this._count)
        return true
      case 'RESET':
        this._count = count
        this.emit('RESET', this._count)
        return true
    }
  }
}

// (10)
const dispatcher = new CountdownDispatcher()
const actions = countdownActions(dispatcher)
const store = new CountdownStore(10, dispatcher)

const render = count => ReactDOM.render(
                          <CountDown count={count} {...actions}/>
                          ,document.getElementById('root'))

store.on('TICK', (count) => render(count))
store.on('RESET', (count) => render(count))
render(store._count)

// 35
// (2)
const initialState = {
  colors:[
    {
      id:'',
      title:'',
      color:'',
      rating:0,
      timestamp:''
    }
  ],
  sort:'SORTED_BY_ID'
}

// (3)
const constants = {
  ADD_COLOR:'ADD_COLOR',
  REMOVE_COLOR:'REMOVE_COLOR',
  SORT_COLOR:'SORT_COLOR',
  RATE_COLOR:'RATE_COLOR'
}

export default constants

// (5)
const colors = (state = [], action){ // 잎
  return []
}

const color = ( state = {}, action){ //가지
  return {}
}

const sort = ( state = '', action){ //잎
  return ''
}

// (6)
const color = ( state = {}, action){
  switch(action.type){
    case 'ADD_COLOR':
      return {
        id:action.id,
        title:action.title,
        color:action.color,
        rating:action.rating,
        timestamp:action.timestamp
      }
    case 'RATE_COLOR':
      return ( state.id !== action.id ) ? state :
              {
                ...state,
                rating:action.rating
              }
    default:
      return state
  }
}

// (7)
const colors = (state = [], action) => {
  switch(action.type){
    case 'ADD_COLOR':
      return [
        ...state,
        color({}, action)
      ]
    case 'REMOVE_COLOR':
      return state.filter( color => color.id !== action.id )
    case 'RATE_COLOR':
      return state.map(
        c => color(c, action)
      )
    default:
      return state
  }
}

// (8)
const sort = (state = 'SORTED_BY_ID', action) => {
  switch(action.type){
    case 'SORT_COLOR':
      return action.sortBy
    default:
      return state
  }
}

// (9)
import { createStore } from 'redux'

const store = createStore(color)
console.log(store.getState())
/*
{}
*/

// (10)
import { createStore, combineReducers } from 'redux'

const store = createStore(combineReducers({colors, sort}), initialState)
console.log(store.getState())
/*
{
  colors:[],
  sort:''
}
*/

// (11)
store.dispatch({
  type:'ADD_COLOR',
  id:'',
  title:'',
  color:'',
  rating:0,
  timestamp:''
})

store.dispatch({
  type:'RATE_COLOR',
  id:'',
  rating:1
})

// (12)
const unsubscribe = store.subscribe(() => console.log(store.getState()))

// (13)
unsubscribe()

// 36
// (1)
const removeColor = id => ({
  type:'REMOVE_COLOR',
  id
})

const rateColor = (id, rating) => ({
  type:'RATE_COLOR',
  id,
  rating
})

// (2)
const addColor = (id, title, content, rating, timestamp) => ({
  type:'ADD_COLOR',
  id,
  title,
  content,
  rating,
  timestamp
})

const sortColor = sortBy => ({
  type:'SORT_COLOR',
  sortBy
})

// (4)
import { createStore, combineReducers } from 'redux'

const store = createStore(combineReducers({colors, sort}),
  (localStorage['redux-store']) ? JSON.parse(localStorage['redux-store']) :
  initialState)
const unsubscribe = store.subscribe( () => localStorage['redux-store'] = JSON.stringify(store.getState()))

// 37
// (4)
import { createStore, combineReducers, applyMiddleware } from 'redux'

const logger = store => next => action => {
  console.log(store.getState())
  next(action)
  console.log(store.getState())
}

const saver = store => next => action => {
  next(action)
  localStorage['redux-store'] = JSON.stringify(store.getState())
}

const storeFactory = (initialState = {}) =>
  applyMiddleware(logger, saver)(createStore)
  (combineReducers({colors, sort}),
   (localStorage['redux-store']) ? JSON.parse(localStorage['redux-store'])
   : initialState)

export default storeFactory

// (5)
import storeFactory from './store'

const store = storeFactory()
store.dispatch(addColor(~))

// 38
// (3)
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

const store = storeFactory()

ReactDOM.render(
  <Provider store = {store}>
    <App/>
  </Provider>
  ,document.getElementById('root'))

// (5)
import { connect } from 'react-redux'

const NewColor = connect(
  null,
  dispatch => ({
    onNewColor(title, color){
      dispatch(addColor(title, color))
    }
  })
)(AddColorForm)

const Menu = connect(
  state => ({
    sort : state.sort
  }),
  dispatch => ({
    onSelect(sortBy){
      dispatch(sortColor(sortBy))
    }
  })
)(SortMenu)

// 39
// (3)
import React from 'react'

export const Home = () =>
  <div>
    Home
  </div>

export const About = () =>
  <div>
    About
  </div>

export const Events = () =>
  <div>
    Events
  </div>

export const Products = () =>
  <div>
    Products
  </div>

export const Contact = () =>
  <div>
    Contact
  </div>

// (4)
import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'
import {
  Home,
  About,
  Events,
  Products,
  Contact
} from './pages'

ReactDOM.render(
  <HashRouter>
    <Route exact path="/" component={Home}/>
    <Route path="/about" component={About}/>
    <Route path="/events" component={Events}/>
    <Route path="/products" component={Products}/>
    <Route path="/contact" component={Contact}/>
  </HashRouter>
  ,document.getElementById('root'))

// (6)
import { Link } from 'react-router-dom'

export const Home = () =>
  <div>
    Home
    <Link to="/about">회사소개</Link>
    <Link to="/events">이벤트</Link>
    <Link to="/products">제품</Link>
    <Link to="/contact">고객지원</Link>
  </div>

// (7)
const Whoops404 = ({location}) =>
  <div>
    {location.pathname}
  </div>

export default Whoops404

// (8)
import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'
import {
  Home,
  About,
  Events,
  Products,
  Contact
} from './pages'
import Whoops404 from './Whoops404'

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/events" component={Events}/>
      <Route path="/products" component={Products}/>
      <Route path="/contact" component={Contact}/>
      <Route component={Whoops404}/>
    </Switch>
  </HashRouter>
  ,document.getElementById('root'))

// (9)
import { NavLink } from 'react-router-dom'

const MainMenu = () => {
  const style = {backgroundColor:white,color:black}

  return (
    <div>
      <NavLink to="/about" activeStyle={style}>회사소개</NavLink>
      <NavLink to="/events" activeStyle={style}>이벤트</NavLink>
      <NavLink to="/products" activeStyle={style}>제품</NavLink>
      <NavLink to="/contact" activeStyle={style}>고객지원</NavLink>
    </div>
  )
}

// (10)
const PageTemplate = ({children}) =>
  <div>
    <MainMenu/>
    {children}
  </div>


export const About = () =>
  <PageTemplate>
    <div>
      About
    </div>
  </PageTemplate>

export const Events = () =>
  <PageTemplate>
    <div>
      Events
    </div>
  </PageTemplate>

export const Products = () =>
  <PageTemplate>
    <div>
      Products
    </div>
  </PageTemplate>

export const Contact = () =>
  <PageTemplate>
    <div>
      Contact
    </div>
  </PageTemplate>

// (11)
import { NavLink } from 'react-router-dom'

const AboutMenu = ({match}) => {
  const style = {backgroundColor:white,color:black}

  return (
    <div>
      <NavLink to="/about" activeStyle={match.isExact && style}>회사</NavLink>
      <NavLink to="/about/history" activeStyle={style}>연혁</NavLink>
      <NavLink to="/about/services" activeStyle={style}>서비스</NavLink>
      <NavLink to="/about/location" activeStyle={style}>위치</NavLink>
    </div>
  )
}

// (14)
import { Route } from 'react-router-dom'
import AboutMenu from './AboutMenu'

export const About = () =>
  <PageTemplate>
    <Route component={AboutMenu}/>
    <Route exact path="/about" component={Company}/>
    <Route path="/about/history" component={History}/>
    <Route path="/about/services" component={Services}/>
    <Route path="/about/location" component={Location}/>
  </PageTemplate>

// (15)
import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import {
  Home,
  About,
  Events,
  Products,
  Contact
} from './pages'
import Whoops404 from './Whoops404'

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Redirect from="/history" to="/about/history"/>
      <Redirect from="/services" to="/about/services"/>
      <Redirect from="/location" to="/about/location"/>
      <Route path="/events" component={Events}/>
      <Route path="/products" component={Products}/>
      <Route path="/contact" component={Contact}/>
      <Route component={Whoops404}/>
    </Switch>
  </HashRouter>
  ,document.getElementById('root'))

// (16)
import { compose } from 'redux'

const filterArrayById = (arr, id) => arr.filter( arr.id === id )
const getFirstArrayIndex = arr => arr[0]
const findById = compose(getFirstArrayIndex, filterArrayById)

// (17)
<Route path="/:id/:pass" component={Unique}/>
const Unique = ({match}) => console.log(match.params.id, match.params.pass)

// (18)
import { connect } from 'react-redux'

const color = connect(
  (state, props) => findById( state.colors, props.match.params.id )
)(ColorDetails)


// (21)
../../studyeveryday/Project
