class EntityQuery {
  constructor(entity, db) {
    this.entity = entity
    this.db = db
  }

  getAll() {
    return this.db(this.entity).orderBy('created_at', 'desc')
  }

  getById(id) {
    return this.db(this.entity)
      .where('id', id)
      .first()
  }

  getByAttr(attr, id) {
    return this.db(this.entity)
      .whereRaw(`Lower(${attr}) LIKE ?`, `%${id}%`)
      .orWhereRaw(`Upper(${attr}) LIKE ?`, `%${id}%`)
      .first()
  }

  getByEitherOr(either, or, id) {
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
    return this.db(this.entity)
      .where('id', id)
      .update(payload)
      .returning('*')
  }

  delete(id) {
    return this.db(this.entity)
      .where('id', id)
      .del()
      .then(result => {
        return this.db(this.entity)
      })
  }
}

module.exports = EntityQuery
