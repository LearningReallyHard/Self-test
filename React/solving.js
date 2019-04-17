// 5
// (1)
class Vacation{
  constructor(destination, length){
    this.destination = destination
    this.length = length
  }
  print(){
    console.log(`destination : ${destination}, length : ${length}`)
  }
}

// (2)
class Expedition extends Vacation{
  constructor(destination, length, gear){
    super(destination, length)
    this.gear = gear
  }
  print(){
    super.print()
    console.log(`${gear}`)
  }
}

// 6
// (2)
const print = message => log(message, new Data())
const log = (message, timestamp) => console.log(`${timestamp} : ${message}`)

module.exports = { print, log }

// (3)
const { print, log } = require('./txt-helpers')

// 7
// (2)
const createScream = logger => message => logger(message.toUpperCase())

// 8
const a = message => message.replace(,'-')

// 9
// (1)
const a = {
  title,
  color,
  rating
}

// (2)
const rateColor = (color, rating) => Object.assign({}, color, { rating })

// 11
// (1)
const schools = [A,B,C]

// (2)
const highschools = schools => schools.map( school => { name : school })

// (3)
const editNth = (schools, index, name) => schools.map(
      (school, i) => ( i === index) ? { name : name } : school
    )

// (4)
const schools = {
  A:1,
  B:2,
  C:3
}

const schoolArray = schools => Object.keys(schools).map(
      key => { name : key, wins : schools[key]}
    )


// 12
// (1)
const ages = [1,2,3,4,5,6,7]

const max = ages => ages.reduce(
    (max, v) => (max > v) ? max : v
  ,0)


// (2)
const colors = [
  {
    id:'',
    title:'',
    rating:''
  }
]

const hasColors = colors => colors.reduce(
      (hashColor, color) => {
        hashColor[color.id] = { title : color.title, rating : color.rating }
        return hashColor
      }
    ,{})

// (3)
const colors = ['A','A','B','B','C']

const distinctColors = colors => colors.reduce(
      (distinct, color) => ( distinct.indexOf(color) === -1 ) ?
                            [...distinct, color] :
                            distinct
  ,[])


// 14
// (2)
const compose = (...args) => composed =>
  args.reduce(
      (composed, f) => f(composed)
  ,composed)


// 15
// (1)
const oneSecond = () => 1000
const getCurrentTime = () => new Date()
const clear = () => console.clear()
const log = message => console.log(message)

(2)
const abstractClockTime = date => ({
  hours:date.getHours(),
  minutes:date.getMinutes(),
  seconds:date.getSeconds()
})

const civilianHours = date => ({
  ...date,
  hours : ( date.hours > 12) ? date.hours - 12 : date.hours
})

const appendAMPM = date => ({
  ...date,
  ampm : ( date.hours >= 12) ? "pm" : "am"
})

// (3)
const display = target => date => target(date)

const formatClock = template => date =>
  template.replace('hh', date.hours)
          .replace('mm', date.minutes)
          .replace('ss', date.seconds)
          .replace('tt', date.ampm)

const prependZero = key => date => ({
  ...date,
  [key] : ( date[key] <= 9 ) ? "0"+date[key] : date[key]
})

// (4)
const convertToCivilianTime = date =>
  compose(
    appendAMPM,
    civilianHours
  )(date)

const doubleDigits = date =>
  compose(
    prependZero(hours),
    prependZero(minutes),
    prependZero(seconds)
  )(date)

const startTicking = setTimeOut(
    compose(
      abstractClockTime,
      convertToCivilianTime,
      doubleDigits,
      formatClock("hh : mm : ss tt"),
      display(log),
      clear
    )(getCurrentTime())
  , oneSecond())

startTicking()

// 19
// (1)
const items = [1,2,3,4,5]
ReactDOM.render(
  <ul>
    {
      items.map(
        (item, i) =>
      )
    }
  </ul>
, document.getElementById('root'))


// 20
// (1)
const items = ['a','b','c','d','e','f']

const IngredientLists =

// (2)
// (3)

// (22)
// (1)
const recipes = [
    {
      name:'',
      ingredients:[
          {name:'', amount:'', measurement:''},
          {name:'', amount:'', measurement:''},
          {name:'', amount:'', measurement:''},
      ],
      steps:[
          'first',
          'second',
          'third'
      ]
    },{
      name:'',
      ingredients:[
          {name:'', amount:'', measurement:''},
          {name:'', amount:'', measurement:''},
          {name:'', amount:'', measurement:''},
      ],
      steps:[
          'first',
          'second',
          'third'
      ]
    }
]

// (2)
const Menu = ({title, recipes}) =>
    <div className="menu">
        <div>{title}</div>
        {
          recipes.map(
              (recipe, i) => <Recipe key={i} {...recipe}/>
          )
        }
    </div>

// (3)
const Recipe = ({name, ingredients, steps}) =>
    <div className="recipe">
        <div>{name}</div>
        <div className="ingredients">
            {
              ingredients.map(
                  (ingredient, i) => <div key={i}>{ingredient.name}{ingredient.amount}{ingredient.measurement}</div>
              )
            }
        </div>
        <ul className="steps">
            {
              steps.map(
                (step, i) => <li key={i}>{step}</li>
              )
            }
        </ul>
    </div>
