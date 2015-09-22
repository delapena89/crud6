process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/app');
var exercise = require('../server/models/exercise');
var should = chai.should();
chai.use(chaiHttp);
