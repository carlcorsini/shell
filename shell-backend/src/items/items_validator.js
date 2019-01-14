const payloadValidator = {
  name: 'test',
  description: 'test description',
  photo_url: 'test.com/photo.jpeg',
}

const create = payload => {
  let payloadKeys = Object.keys(payload)
  if (!payload) return { error: { status: 400, message: 'no payload sent' } }
  if (payloadKeys.length !== 5)
    return { error: { status: 400, message: 'missing or extra fields' } }
  for (key in payload) {
    if (!payloadValidator.hasOwnProperty(key)) {
      return { error: { status: 400, message: `unexpected ${key} field` } }
    }
  }

  return true
}

module.exports = { create }
