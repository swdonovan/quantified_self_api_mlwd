

const meals = [
  "Breakfast",
  "Snack",
  "Lunch",
  "Dinner"
]

exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE meals RESTART IDENTITY')
  .then(function () {
    return Promise.all([
      meals.forEach((meal)=>{
        knex.raw(
          'INSERT INTO meals (name, created_at, updated_at) VALUES (?,?,?)',
          [meal, new Date, new Date]
        )
      })
    ])
  })
}
