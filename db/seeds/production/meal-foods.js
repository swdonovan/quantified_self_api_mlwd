
exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE meal_foods RESTART IDENTITY')
  .then(function () {
    return Promise.all([
      knex.raw(
      'INSERT INTO meal_foods (food, meal, created_at, updated_at) VALUES (?, ?, ?, ?)',
      [1, 3, new Date, new Date]
      ),
      knex.raw(
        'INSERT INTO meal_foods (food, meal, created_at, updated_at) VALUES (?, ?, ?, ?)',
        [2, 4, new Date, new Date]
      ),
      knex.raw(
        'INSERT INTO meal_foods (food, meal, created_at, updated_at) VALUES (?, ?, ?, ?)',
        [2, 3, new Date, new Date]
      ),
      knex.raw(
        'INSERT INTO meal_foods (food, meal, created_at, updated_at) VALUES (?, ?, ?, ?)',
        [6, 2, new Date, new Date]
      ),
      knex.raw(
        'INSERT INTO meal_foods (food, meal, created_at, updated_at) VALUES (?, ?, ?, ?)',
        [3, 1, new Date, new Date]
      ),
      knex.raw(
        'INSERT INTO meal_foods (food, meal, created_at, updated_at) VALUES (?, ?, ?, ?)',
        [2, 4, new Date, new Date]
      ),
      knex.raw(
        'INSERT INTO meal_foods (food, meal, created_at, updated_at) VALUES (?, ?, ?, ?)',
        [4, 2, new Date, new Date]
      ),
      knex.raw(
        'INSERT INTO meal_foods (food, meal, created_at, updated_at) VALUES (?, ?, ?, ?)',
        [4, 1, new Date, new Date]
      )
    ])
  })
}
