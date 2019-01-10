const chai = require('chai')
const expect = chai.expect
const users = require('../src/models/users_model')
const usersControllers = require('../src/controllers/users_controller')
const Response = require('./response')
const config = require('../knexfile').test

describe('thatSong', () => {
  before(() => {
    const tmpConnection = require('knex')({
      client: 'pg',
      connection: config.connection,
    })
    return tmpConnection
      .raw(`CREATE DATABASE ${config.connection.database};`)
      .catch(err => {
        Promise.resolve('Everything is OK')
      })
      .then(() => (global.knex = require('../src/queries/db')))
      .then(() => knex.migrate.rollback())
      .then(() => knex.migrate.latest(config))
      .then(() => knex.seed.run())
      .catch(() => console.log(`Migrations or seeds failed.`))
  })

  describe('#getAllUsers()', () => {
    it('should return a list of all the users in the database', () => {
      return users.getAllUsers().then(result => {
        expect(result.length).to.equal(6)

        const user = result[0]
        expect(user.id).to.be.ok
        expect(user.first_name).to.equal('Carl')
      })
    })
  })

  describe('#getUserById()', () => {
    it('should return one user from the database', () => {
      return users.getUserById(1).then(result => {
        expect(result.id).to.be.ok
        expect(result.id).to.equal(1)
        expect(result.first_name).to.equal('Carl')
        expect(result.last_name).to.equal('Corsini')
      })
    })
  })

  describe('#getUserByUsername()', () => {
    it('should return one user from the database', () => {
      return users.getUserByUsername('djshmarl').then(result => {
        expect(result.id).to.be.ok
        expect(result.id).to.equal(1)
        expect(result.first_name).to.equal('Carl')
        expect(result.last_name).to.equal('Corsini')
      })
    })
  })

  const loginUserData = {
    body: {
      username: 'djshmarl',
      password: 'yahoo',
    },
  }

  const res = new Response()

  describe('#loginUser()', () => {
    it('should login one user and return a request body', () => {
      return usersControllers.loginUser(loginUserData, res).then(result => {
        expect(user.client).to.be.ok
      })
    })
  })

  const updateUserData = { first_name: 'jerry', last_name: 'garcia' }

  describe('#updateUser()', () => {
    it('should update one user from the database', () => {
      return users.updateUser(1, updateUserData).then(result => {
        const user = result[0]
        expect(user.id).to.equal(1)
        expect(user.first_name).to.equal('jerry')
        expect(user.last_name).to.equal('garcia')
      })
    })
  })

  const createUserData = {
    first_name: 'barry',
    last_name: 'bonds',
    email: 'john@jerry.jerry',
    username: 'heresjohnny',
    password: 'Password123!',
  }

  describe('#createUser()', () => {
    it('should create one user from the database', () => {
      return users.createUser(createUserData).then(result => {
        const user = result[0]
        expect(user.id).to.equal(7)
        expect(user.first_name).to.equal('barry')
        expect(user.last_name).to.equal('bonds')
      })
    })
  })

  describe('#deleteUser()', () => {
    it('should delete one user from the database', () => {
      return users.deleteUser(1).then(result => {
        const user = result[0]
        expect(user.id).to.equal(2)
        expect(user.first_name).to.equal('Jon')
        expect(user.last_name).to.equal('Riemer')
      })
    })
  })
})
