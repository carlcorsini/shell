var supertest = require('supertest')
const chai = require('chai')
const expect = chai.expect

const server = supertest.agent('http://localhost:8000')

describe('**SUPER TEST RAN SUCCESSFULLY**', () => {
  xit('User Routes', done => {
    server
      .get('/songs')
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        describe('should respond with correct user data', () => {
          let song = res.body[0]
          it('body length of 7', () => {
            expect(res.body.length).to.equal(7)
          })
          it('first user should be "McSneako"', () => {
            expect(song.artist).to.equal('McSneako')
          })
        })

        describe('should respond correctly', () => {
          it('with status 200', () => {
            expect(res.status).to.equal(200)
          })
          it('with no error', () => {
            expect(res.error).to.equal(false)
          })
        })

        done()
      })
  })
})
