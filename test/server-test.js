const assert = require('chai').assert
const app = require('../server')
const request = require('request')
const environment = process.env.NODE_ENV || 'test'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)
const Foods = require('../lib/models/foods')

describe('Server', function(){
  before(function(done){
    this.port = 9876
    this.server = app.listen(this.port, function(err, result){
      if(err) { return done(err) }
      done()
    })
    this.request = request.defaults({
      baseUrl: 'http://localhost:9876'
    })
  })

  after(function(){
    this.server.close()
  })

  it('should exist', function(){
    assert(app)
  })

  describe('GET /', function(){
    it('should return a 200', function(done){
      this.request.get('/', function(error, response){
        if (error) { done(error) }
        assert.equal(response.statusCode, 200)
        done()
      })
    })

    it('should have a body with the name of the application', function(done){
      this.request.get('/', function(error, response){
        if (error) { done(error) }
        assert.include(response.body, app.locals.title)
        done()
      })
    })
  })

  describe('GET /api/foods/', function(){
    beforeEach((done) => {
      Promise.all([
        Foods.createFood(["Hamburger", 150, new Date, new Date]),
        Foods.createFood(["Pizza", 200, new Date, new Date]),
        Foods.createFood(["Pasta", 75, new Date, new Date]),
      ]).then((data) => done())
    })

    afterEach(function(done) {
      Foods.destroyAll()
        .then(() => done())
    })

    it('should return a 404 if the resource is not found', function(done){
      this.request.get('/api/foods/1000', function(error, response){
        if (error) { done(error) }
        assert.equal(response.statusCode, 404)
        done()
      })
    })

    it('should have all foods', function(done){
      this.request.get(('/api/v1/foods/' ), function(error, response){

        if (error) { done(error) }

        let parsedSecret = JSON.parse(response.body)

        assert.equal(parsedSecret.length, 3)
        done()
      })
    })
  })
  // describe('GET /api/foods/:id', function(){
  //   beforeEach((done) => {
  //     Promise.all([
  //       Foods.createFood(["Hamburger", 150, new Date, new Date]),
  //       Foods.createFood(["Pizza", 200, new Date, new Date]),
  //       Foods.createFood(["Pasta", 75, new Date, new Date]),
  //     ]).then((data) => done())
  //   })
  //
  //   afterEach(function(done) {
  //     Foods.destroyAll()
  //       .then(() => done())
  //   })
  //
  //   it('should return a 404 if the resource is not found', function(done){
  //     this.request.get('/api/foods/1000', function(error, response){
  //       if (error) { done(error) }
  //       assert.equal(response.statusCode, 404)
  //       done()
  //     })
  //   })
  //
  //   it('should have single food attrs', function(done){
  //     var id = 1
  //     var name = "Hamburger"
  //     var calories = 150
  //     this.request.get(('/api/v1/foods/' + id ), function(error, response){
  //
  //       if (error) { done(error) }
  //
  //       let parsedSecret = JSON.parse(response.body)
  //
  //       assert.equal(parsedSecret.id, id)
  //       assert.equal(parsedSecret.name, name)
  //       assert.equal(parsedSecret.calories, calories)
  //       done()
  //     })
  //   })
  // })
  //
  // describe('POST /api/foods', function(){
  //
  //   it('should receive and store data', function(done){
  //     var name = "Hamburger"
  //     var calories = 150
  //     var created_at = new Date
  //     var updated_at = new Date
  //     var food = {name, calories, created_at, updated_at}
  //
  //     this.request.post('/api/v1/foods', { form: food }, function(error, response){
  //       if (error) { done(error) }
  //       assert.equal(response.statusCode, 201);
  //       done()
  //     })
  //   })
  // })
  // describe('Patch /api/foods/:id', function(){
  //   beforeEach((done) => {
  //     Promise.all([
  //       Foods.createFood(["Hamburger", 150, new Date, new Date]),
  //       Foods.createFood(["Pizza", 200, new Date, new Date]),
  //       Foods.createFood(["Pasta", 75, new Date, new Date]),
  //     ]).then((data) => done())
  //   })
  //
  //   afterEach(function(done) {
  //     Foods.destroyAll()
  //       .then(() => done())
  //   })
  //
  //   it('should update receive and store updated data', function(done){
  //     var name = "Buffalo Burger"
  //     var calories = 175
  //     var food = {name, calories}
  //
  //     this.request.patch('/api/v1/foods/1', { form: food }, function(error, response){
  //       if (error) { done(error) }
  //       assert.equal(response.statusCode, 201);
  //       done()
  //     })
  //   })
  // })
  //
  // describe('Delete /api/foods/:id', function(){
  //   beforeEach((done) => {
  //     Promise.all([
  //       Foods.createFood(["Hamburger", 150, new Date, new Date]),
  //       Foods.createFood(["Pizza", 200, new Date, new Date]),
  //       Foods.createFood(["Pasta", 75, new Date, new Date]),
  //     ]).then((data) => done())
  //   })
  //
  //   afterEach(function(done) {
  //     Foods.destroyAll()
  //       .then(() => done())
  //   })
  //
  //   it('should delete a food data', function(done){
  //     this.request.delete('/api/v1/foods/1', function(error, response){
  //       if (error) { done(error) }
  //       assert.equal(response.statusCode, 201);
  //       done()
  //     })
  //   })
  // })
})
