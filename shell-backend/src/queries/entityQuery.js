const knex = require('./db')

class EntityQuery {
  constructor(entity) {
    this.entity = entity
  }

  getAll() {
    return knex(this.entity).orderBy('created_at', 'desc')
  }

  getById(id) {
    console.log('hey')
    return knex(this.entity)
      .where('id', id)
      .first()
  }

  getByAttr(attr, id) {
    return knex(this.entity)
      .where(attr, id)
      .first()
  }

  getByEitherOr(either, or, id) {
    console.log('hey query')
    return knex(this.entity)
      .whereRaw(`Lower(${either}) LIKE ?`, `%${id}%`)
      .orWhereRaw(`Upper(${either}) LIKE ?`, `%${id}%`)
      .orWhereRaw(`Lower(${or}) LIKE ?`, `%${id}%`)
      .orWhereRaw(`Upper(${or}) LIKE ?`, `%${id}%`)
      .first()
  }

  create(payload) {
    return knex(this.entity)
      .insert(payload)
      .returning('*')
  }

  update(id, payload) {
    console.log('hey')
    return knex(this.entity)
      .where('id', id)
      .update(payload)
      .returning('*')
  }

  delete(id) {
    console.log(id, 'hey')
    return knex(this.entity)
      .where('id', id)
      .del()
      .then(result => {
        return knex(this.entity)
      })
  }
}

module.exports = EntityQuery
