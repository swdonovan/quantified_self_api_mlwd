const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration)

module.exports = class Meals{

  static mealsFoods(mealID) {
    return database.raw(
      'SELECT * FROM foods' +
      ' INNER JOIN meal_foods ON foods.id = meal_foods.food' +
      ' WHERE meal_foods.meal = ?', [mealID]
    )
  }

  static deleteFoodFromMeal(meal_id, food_id) {
    return database.raw("DELETE FROM meal_foods WHERE meal_foods.food = ? AND meal_foods.meal = ?",
      [food_id, meal_id]
    )
  };

  static allMeals() {
    return database.raw(
      'SELECT m.id, m.name, json_agg((SELECT row_to_json(x.*) FROM (SELECT f.id, f.name, f.calories) x)) AS foods FROM meals m JOIN meal_foods mf ON mf.meal = m.id JOIN foods f ON f.id = mf.food GROUP BY m.id'
    )
  }

  static addFoodToMeals(meal_id, food_id) {
    return database.raw(
      'INSERT INTO meal_foods (meal, food, created_at, updated_at) VALUES (?, ?, ?, ?) RETURNING id',
      [meal_id, food_id, new Date, new Date]
    )
  }
}
