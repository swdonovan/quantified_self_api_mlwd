
exports.up = function(knex, Promise) {
  let createQuery = `CREATE TABLE meal_foods(
    id SERIAL PRIMARY KEY NOT NULL,
    meal INTEGER,
    food INTEGER,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
  )`
  return knex.raw(createQuery)
};

exports.down = function(knex, Promise) {
  let dropQuery = `DROP TABLE meal_foods`
  return knex.raw(dropQuery)
};
