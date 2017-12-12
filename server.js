const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)
const path = require("path");
const Foods = require('./lib/models/foods')
const Meals = require('./lib/models/meals')

app.set('port', process.env.PORT || 3000)
app.locals.title = 'Quantified Self API'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname+'/welcome.html'))
})

app.get('/api/v1/foods', (request, response) => {
  Foods.allFoods()
  .then((data) => {
    if (data.rowCount == 0) {return response.sendStatus(404)}
    response.json(data.rows)
  })
})

app.post('/api/v1/foods', (request, response) => {
  const food = request.body;
  if (food.name == '' || food.calories == '') {
    return response.status(422).send({ error: "Make sure all properties are provided!"})
  }

  Foods.addFood(food).then((data) => {
    if (data.rowCount == 0) {return response.sendStatus(404)}
    food.id = data.rows[0].id
    response.status(201).json(food)
  })
})

app.delete('/api/v1/foods/:id', (request, response) => {
  const id = request.params.id

  Foods.deleteFood(id).then((data) => {
    if (data.rowCount == 0) {return response.sendStatus(404)}
    response.status(201).json(id)
  })
})

app.get('/api/v1/meals/:meal_id/foods', (request, response) => {
  const meal_id = request.params.meal_id
  Meals.mealsFoods(meal_id)
  .then((data) => {
    if (data.rowCount == 0) {return response.sendStatus(404)}
    response.status(201).json(data['rows']);
  });
});

app.delete('/api/v1/meals/:meal_id/foods/:id', (request, response) => {
  const meal_id = request.params.meal_id
  const food_id = request.params.id
  Meals.deleteFoodFromMeal(meal_id, food_id)
  .then((data)=>{
    if (data.rowCount == 0) {return response.sendStatus(404)}
    response.status(201).send("Successfully Deleted")
  })
})


if(!module.parent) {
  app.listen(app.get('port'), function() {
    console.log(app.locals.title + " is running on " + app.get('port') + ".")
  })
}

module.exports = app
