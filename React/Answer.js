// 34
(10)
const dispatcher = new CountDownDispatcher();
const actions = CountdownActions(dispatcher);
const store = new CountdownStore(10, dispatcher);

const render = count =>
  render(<CountDown count={count} {...actions}/>
    ,document.getElementById('root'))

store.on('TICK', (count) => render(count))
store.on('RESET', (count) => render(count));
render(store._count);

// 35
(2)
const initialState = {
  colors:[
    {
      id:'',
      title:'',
      color:'',
      rating:'',
      timestamp:''
    }
  ],
  sort:"SORTED_BY_ID"
}

(3)
const constants = {
  ADD_COLOR:"ADD_COLOR",
  REMOVE_COLOR:"REMOVE_COLOR",
  SORT_COLOR:"SORT_COLOR",
  RATE_COLOR:"RATE_COLOR"
};

export default constants;

(5)
const colors = (state=[], action) => {//잎
  return [];
}

const color = (state={}, action) => { //가지
  return {};
}

const sort = (state="",action) => { //잎
  return "";
}

(6)
import C from './constants'

const color = (state={}, action) => {
  switch(action.type){
    case C.ADD_COLOR:
      return {
        id:actions.id,
        title:action.title,
        color:action.color,
        rating:action.rating,
        timestamp:action.timestamp
      }
    case C.RATE_COLOR:
      return (state.id != action.id) ?
              state :
              {
                ...state,
                rating:action.rating
              }
    default:
      return state;
  }
}

(7)
import C from './constants'

const colors = (state=[], action) => {
  switch(action.type){
    case C.ADD_COLOR:
      return [
        ...state,
        color({}, action)
      ]
    case C.RATE_COLOR:
      return state.map( v => color(v, action));
    case C.REMOVE_COLOR:
      return state.filter(color => color.id != action.id);
    default:
      return state;
  }
}

(8)
const sort = (state="", action) => {
  switch(action.type){
    case C.SORT_COLOR:
      return action.sortBy
    default:
      return state;
  }
}

(9)
import { createStore } from redux

const store = createStore(color);
console.log(store.getState())
/*
{}
*/

(10)
import { createStore, combineReducers } from redux

const store = createStore(combineReducers({colors, sort}), initialState)
console.log(store.getState())
/*
{
  colors:[],
  sort:""
}
*/

(11)
store.dispatch({
    type:C.ADD_COLOR,
    id:"",
    title:"",
    rating:"",
    color:"",
    timestamp:""
})

store.dispatch({
  type:C.RATE_COLOR,
  id:"",
  rating:""
})

(12)
const undescribe = store.discribe(() => console.log(store.getState()))

(13)
undescribe();

// 36
(1)
import { v4 } from 'uuid'
const removeColor = id => ({
  type:"REMOVE_COLOR",
  id
})

const rateColor = (id, rating) => ({
  type:"RATE_COLOR",
  id,
  rating
})

(2)
const addColor = (title, rating, color, timestamp) => ({
  type:"ADD_COLOR"
  id: v4(),
  title,
  rating,
  color,
  timestamp
})

const sortColor = (sortBy) => ({
  type:"SORT_COLOR",
  sortBy
})

(4)
import { createStore, combineReducers } from redux

const store = createStore(combineReducers({colors, sort}),
              (localStorage['redux-store']) ? JSON.parse(localStorage['redux-store'])
                : initialState)

// 37
(4)
import { createStore, combineReducers, applyMiddleware } from 'redux'

const logger = store => next => action => {
  console.log(store.getState())
  next(action)
  console.log(store.getState())
}

const saver = store => next => action => {
  next(action);
  localStorage['redux-store'] = JSON.stringify(store.getState());
}

const storeFactory = (initialState={}) =>
  applyMiddleware(logger, saver)(createStore)
   (combineReducers({colors, sort}),
    (localStorage['redux-store']) ? JSON.parse(localStorage['redux-store'])
     : initialState)


(5)
const store = storeFactory();
store.dispatch(addColor(
  'title',
  'rating',
  'color',
  'timestamp'
))

// 38
(3)
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

const store = storeFactory();

render(
  <Provider store = {store}>
    <App/>
  </Provider>
  ,document.getElementById('root'))

(5)
import { connect } from 'react-redux'

const NewColor = connect(
  null,
  dispatch => ({
    onNewColor(title, color){
      dispatch(addColor(title,color))
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
(3)
import React from 'react'

export const Home = () =>
  <div className="home">
    Home
  </div>

...

(4)
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
    <Route path="/Contact" component={Contact}/>
  </HashRouter>
,document.getElementById('root'))

(6)
import { Link } from 'react-router-dom'

export const Home = () =>
  <div className="home">
    Home
    <Link to="/about">About</Link>
    <Link to="/events">Events</Link>
    <Link to="/products">Products</Link>
    <Link to="/contact">Contact</Link>
  </div>

(7)
const Whoops404 = ({location}) =>
  <div>
    {location.pathname}
  </div>

(8)
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

ReactDOM.render(
  <HashRouter>
    <div>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/events" component={Events}/>
        <Route path="/products" component={Products}/>
        <Route path="/Contact" component={Contact}/>
        <Route component={Whoops404}/>
      </Switch>
    </div>
  </HashRouter>
,document.getElementById('root'))

(9)
import { NavLink } from 'react-router-dom'

const style = {backgroundColor:white, color:black};
const MainMenu = () =>
  <div>
    <NavLink path="/about" activeStyle={style}>about</NavLink>
    <NavLink path="/events" activeStyle={style}>events</NavLink>
    <NavLink path="/products" activeStyle={style}>products</NavLink>
    <NavLink path="/contact" activeStyle={style}>contact</NavLink>
  </div>

(10)
const PageTemplate = children =>
  <div>
    <MainMenu/>
    {children}
  </div>

  import React from 'react'

  export const Home = () =>
    <div className="home">
      <PageTemplate>
        Home
      </PageTemplate>
    </div>
  ...

(11)
import { NavLink } from 'react-router-dom'

const style = {backgroundColor:white,color:black};
export const AboutMenu = ({match}) =>
  <div>
    <NavLink to="/about" activeStyle={match.isExact && style}>회사</NavLink>
    <NavLink to="/about/history" activeStyle={style}>연혁</NavLink>
    <NavLink to="/about/services" activeSylte={style}>서비스</NavLink>
    <NavLink to="/about/location" activeStyle={style}>위치</NavLink>
  </div>

(14)
const About = () =>
  <PageTemplate>
    <Route component={AboutMenu}/>
    <Route exact path="/about" component={Company}/>
    <Route path="/about/history" component={History}/>
    <Route path="/about/services" component={Services}/>
    <Route path="/about/location" component={Location}/>
  </PageTemplate>

(15)
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

ReactDOM.render(
  <HashRouter>
    <div>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
        <Redirect from="/history" to="/about/history"/>
        <Redirect from="/services" to="/about/services"/>
        <Redirect from="/location" to="/about/location"/>
        <Route path="/events" component={Events}/>
        <Route path="/products" component={Products}/>
        <Route path="/Contact" component={Contact}/>
        <Route component={Whoops404}/>
      </Switch>
    </div>
  </HashRouter>
,document.getElementById('root'))

(16)
import { compose } from 'redux'

const filterArrayById = (arr, id) => arr.filter( v => v.id == id)
const getFirstArrayIndex = arr => arr[0]
const findById = compose(getFirstArrayIndex, filterArrayById);

(17)
<Route path="/:id/:pass" component={Unique}/>
const Unique = ({match}) => <div>{match.params.id}{match.params.pass}</div>

(18)
import { connect } from 'react-redux'

const Color = connect(
  (state, props) => findById(state.colors, props.match.params.id)
)(ColorDetails)


----------------------------------------------------

// 39
(14)
export const About = () =>
  <PageTemplate>
    <Route component={AboutMenu}/>
    <Route path="/about" component={Company}/>
    <Route path="/about/history" component={History}/>
    <Route path="/about/services" component={Services}/>
    <Route paht="/about/location" component={Location}/>
  </PageTemplate>
