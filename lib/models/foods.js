const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration)

module.exports = class Foods{
  static allFoods() {
    return database.raw("SELECT * FROM foods")
  }

  static addFood(food) {
    return database.raw(
      "INSERT INTO foods (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?) RETURNING id",
      [food.name, food.calories, new Date, new Date]
    )
  }

  static deleteFood(id) {
    return database.raw('DELETE FROM foods WHERE id = ?', [id])
  };
}
