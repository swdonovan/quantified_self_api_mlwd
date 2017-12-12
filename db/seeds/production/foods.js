


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE foods RESTART IDENTITY')
    .then(function () {
      return Promise.all([
        knex.raw(
          'INSERT INTO foods (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)',
          ["Banana", "150", new Date, new Date]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)',
          ["Bagel Bites - Four Cheese", "650", new Date, new Date]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)',
          ["Chicken Burrito", "800", new Date, new Date]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)',
          ["Grapes", "180", new Date, new Date]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)',
          ["Blueberry Muffins", "450", new Date, new Date]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)',
          ["Yogurt", "550", new Date, new Date]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)',
          ["Macaroni and Cheese", "950", new Date, new Date]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)',
          ["Granola Bar", "200", new Date, new Date]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)',
          ["Gum", "50", new Date, new Date]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)',
          ["Cheese", "400", new Date, new Date]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)',
          ["Fruit Snacks", "120", new Date, new Date]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories, created_at, updated_at) VALUES (?, ?, ?, ?)',
          ["Apple", "220", new Date, new Date]
        ),
      ]).then((data)=>{
        console.log("success")
      })
    });
};
