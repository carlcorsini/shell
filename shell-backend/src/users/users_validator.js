const signUpValidator = {
  first_name: 'test',
  last_name: 'testLast',
  username: 'testusername',
  email: 'test@test.email',
  password: 'testpasword',
}

const createUser = payload => {
  let payloadKeys = Object.keys(payload)
  if (!payload) return { error: { status: 400, message: 'no payload sent' } }
  if (payloadKeys.length !== 5)
    return { error: { status: 400, message: 'missing or extra fields' } }
  for (key in payload) {
    if (!signUpValidator.hasOwnProperty(key)) {
      return { error: { status: 400, message: `unexpected ${key} field` } }
    }
  }

  return true
}

module.exports = { createUser }
