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

  static getFood(id) {
    return database.raw(
      'SELECT * FROM foods WHERE id =?',
      [id]
    )
  }

  static updateFood(id, name, calories) {
    return database.raw(
      'UPDATE foods SET name = ?, calories = ? WHERE id = ? RETURNING id, name, calories',
      [name, calories, id]
    )
  }
}
