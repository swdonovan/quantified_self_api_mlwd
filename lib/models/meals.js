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
}
