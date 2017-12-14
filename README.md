# Quantified Self API

The Quanitified Self API is primarily used to drive data to the <a href="https://mimilettd.github.io/quantified-self/index.html">Quantified Self</a> frontend.

The API is <a href="https://en.wikipedia.org/wiki/Representational_state_transfer">REST API</a>. All endpoints will return the data as JSON.

The following endpoints are available:

## Endpoints

### Food Resources

* `GET /api/v1/foods`
  - returns all foods currently in the database
* `GET /api/v1/foods/:id` 
  - returns the food object with the specific `:id` you've passed in or `404` if the food is not found
* `POST /api/v1/foods` 
  - allows creating a new food with the parameters: 
```
{ food: { name: "Name of food here", calories: "Calories here"} }
```
  - If food is successfully created, the food item will be returned. If the food is not successfully created, a `400` status code will be returned. Both name and calories are required fields.
* `PATCH /api/v1/foods/:id` 
  - allows one to update an existing food with the parameters:
```
{ food: { name: "Name of food here", calories: "Calories here"} }
```
  - If food is successfully updated (name and calories are required fields), the food item will be returned. If the food is not successfully updated, a `400` status code will be returned.
* `DELETE /api/v1/foods/:id` 
  - will delete the food with the `id` passed in. If the food can't be found, a `404` will be returned.

### Meal Resources

* `GET /api/v1/meals` 
  - returns all the meals in the database along with their associated foods
* `GET /api/v1/meals/:meal_id/foods` 
  - returns all the foods associated with the meal with an id specified by `:meal_id` or a `404` if the meal is not found
* `POST /api/v1/meals/:meal_id/foods/:id` 
  - adds the food with `:id` to the meal with `:meal_id`
  - This creates a new record in the MealFoods table to establish the relationship between this food and meal. If the meal/food cannot be found, a `404` will be returned.
* `DELETE /api/v1/meals/:meal_id/foods/:id` 
  - removes the food with :id from the meal with `:meal_id`
  - This deletes the existing record in the MealFoods table that creates the relationship between this food and meal. If the meal/food cannot be found, a `404` will be returned.

## Installing

1. Clone the repo and change into the `quantified_self_api_mlwd` directory:

```
$ git clone https://github.com/swdonovan/quantified_self_api_mlwd.git
$ cd quantified_self_api_mlwd
```

2. Run the following commands in your terminal to start the server:

```
$ npm install
$ npm start
```

3. To hit the endpoints, use the following base URL:

```
http://localhost:3000
```

## Built With

  * Express (Node.js web application framework)
  * PostgreSQL

## Authors

  * <a href="https://github.com/mimilettd"><b>Mimi Le</b></a>
  * <a href="https://github.com/swdonovan"><b>Wil Donovan</b></a>
