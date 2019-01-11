class EntityQuery {
  constructor(entity, db) {
    this.entity = entity
    this.db = db
  }

  getAll() {
    return this.db(this.entity).orderBy('created_at', 'desc')
  }

  getById(id) {
    console.log('hey')
    return this.db(this.entity)
      .where('id', id)
      .first()
  }

  getByAttr(attr, id) {
    return this.db(this.entity)
      .where(attr, id)
      .first()
  }

  getByEitherOr(either, or, id) {
    console.log('hey query')
    return this.db(this.entity)
      .whereRaw(`Lower(${either}) LIKE ?`, `%${id}%`)
      .orWhereRaw(`Upper(${either}) LIKE ?`, `%${id}%`)
      .orWhereRaw(`Lower(${or}) LIKE ?`, `%${id}%`)
      .orWhereRaw(`Upper(${or}) LIKE ?`, `%${id}%`)
      .first()
  }

  create(payload) {
    return this.db(this.entity)
      .insert(payload)
      .returning('*')
  }

  update(id, payload) {
    console.log('hey')
    return this.db(this.entity)
      .where('id', id)
      .update(payload)
      .returning('*')
  }

  delete(id) {
    console.log(id, 'hey')
    return this.db(this.entity)
      .where('id', id)
      .del()
      .then(result => {
        return this.db(this.entity)
      })
  }
}

module.exports = EntityQuery
