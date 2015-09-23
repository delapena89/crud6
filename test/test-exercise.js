process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/app');
var Exercise = require('../server/models/exercise');
var should = chai.should();
chai.use(chaiHttp);


describe("Exercise", function() {

  Exercise.collection.drop();
  var id;


  beforeEach(function(done) {
    var newExercise = new Exercise({
      name: "pushups",
      difficulty: 7
    });
    id = newExercise._id;
    newExercise.save(function(err) {
      done();
    });
  });
  afterEach(function(done) {
    Exercise.collection.drop();
    done();
  });

  it('should list All exercises on /exercises GET', function(done) {
    chai.request(server)
    .get('/exercises')
    .end(function(err, res) {
      console.log(res.body);
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body[0].should.have.property('name');
      res.body[0].should.have.property('difficulty');
      res.body[0].name.should.equal('pushups');
      res.body[0].difficulty.should.be.a("Number");
      res.body[0].difficulty.should.equal(7);
      done();
    });
  });

  it('should add a SINGLE exercise on /exercise POST', function(done) {
    chai.request(server)
    .post('/exercise/bicep-curls/5')
    .end(function(err, res) {
      console.log(res.body);
      res.should.have.status(200);
      res.should.be.json;
      res.should.be.a('object');
      res.body.name.should.be.a('string');
      res.body.name.should.equal('bicep-curls');
      res.body.difficulty.should.be.a('Number');
      res.body.difficulty.should.equal(5);
      done();
    });
  });

  it('should list a SINGLE exercise on /exercise/<id> GET', function(done) {
    chai.request(server)
    .get('/exercise/' + id)
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body[0].should.be.a('object');
      res.body[0].name.should.be.a('string');
      res.body[0].name.should.equal('pushups');
      res.body[0].difficulty.should.be.a('number');
      res.body[0].difficulty.should.equal(7);
      done();
    });
  });

  it('should update a SINGLE exercise on /exercise/<id> PUT', function(done) {
    chai.request(server)
    .put('/exercise/' + id + '/squats/9')
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.name.should.be.a('string');
      res.body.name.should.equal('squats');
      res.body.difficulty.should.be.a('number');
      res.body.difficulty.should.equal(9);
      done();
    });
  });

  it('should delete a SINGLE exercise on /exercise?<id> DELETE', function(done) {
    chai.request(server)
    .delete('/exercise/' + id)
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      done();
    });
  });




}); //close describe
