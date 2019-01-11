const chai = require('chai')
const expect = chai.expect
const users = require('../src/users/users_model')
const usersControllers = require('../src/users/users_controller')
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
      .then(() => (global.knex = require('../src/db')))
      .then(() => knex.migrate.rollback())
      .then(() => knex.migrate.latest(config))
      .then(() => knex.seed.run())
      .catch(() => console.log(`Migrations or seeds failed.`))
  })

  describe('#getAlls()', () => {
    it('should return a list of all the users in the database', () => {
      return users.getAll().then(result => {
        expect(result.length).to.equal(6)

        const user = result[0]
        expect(user.id).to.be.ok
        expect(user.first_name).to.equal('Carl')
      })
    })
  })

  describe('#getById()', () => {
    it('should return one user from the database', () => {
      return users.getById(1).then(result => {
        expect(result.id).to.be.ok
        expect(result.id).to.equal(1)
        expect(result.first_name).to.equal('Carl')
        expect(result.last_name).to.equal('Corsini')
      })
    })
  })

  describe('#getByAttr()', () => {
    it('should return one user from the database', () => {
      return users.getByAttr('username', 'djshmarl').then(result => {
        expect(result.id).to.be.ok
        expect(result.id).to.equal(1)
        expect(result.first_name).to.equal('Carl')
        expect(result.last_name).to.equal('Corsini')
      })
    })
  })

  const loginData = {
    body: {
      username: 'djshmarl',
      password: 'yahoo',
    },
  }

  const res = new Response()

  describe('#login()', () => {
    xit('should login one user and return a request body', () => {
      return usersControllers.login(loginData, res).then(result => {
        expect(result.client).to.be.ok
      })
    })
  })

  const updateData = { first_name: 'jerry', last_name: 'garcia' }

  describe('#update()', () => {
    it('should update one user from the database', () => {
      return users.update(1, updateData).then(result => {
        const user = result[0]
        expect(user.id).to.equal(1)
        expect(user.first_name).to.equal('jerry')
        expect(user.last_name).to.equal('garcia')
      })
    })
  })

  const createData = {
    first_name: 'barry',
    last_name: 'bonds',
    email: 'john@jerry.jerry',
    username: 'heresjohnny',
    hashedPassword: 'Password123!',
  }

  describe('#create()', () => {
    it('should create one user from the database', () => {
      return users.create(createData).then(result => {
        const user = result[0]
        expect(user.id).to.equal(7)
        expect(user.first_name).to.equal('barry')
        expect(user.last_name).to.equal('bonds')
      })
    })
  })

  describe('#delete()', () => {
    it('should delete one user from the database', () => {
      return users.delete(1).then(result => {
        const user = result[0]
        expect(user.id).to.equal(2)
        expect(user.first_name).to.equal('Jon')
        expect(user.last_name).to.equal('Riemer')
      })
    })
  })
})
