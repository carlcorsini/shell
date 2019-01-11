class EntityModel {
  constructor(query, entity) {
    this.query = query
    this.entity = entity
  }

  async getAll() {
    try {
      let entities = await this.query.getAll()
      return entities
    } catch (error) {
      return error
    }
  }

  async getById(id) {
    try {
      let entity = await this.query.getById(id)
      return !entity ? { message: 'entity not found', status: 404 } : entity
    } catch (error) {
      return error
    }
  }

  async getByAttr(attr, id) {
    try {
      let entity = await this.query.getByAttr(attr, id)

      return !entity
        ? {
            error: `${this.entity} with ${attr} ${id} not found`,
            status: 404,
          }
        : entity
    } catch (error) {
      return error
    }
  }

  async getByEitherOr(either, or, id) {
    try {
      console.log(either, or, id)
      let entity = await this.query.getByEitherOr(either, or, id)
      return !entity
        ? {
            error: `${either} or ${or} with attribute ${id} not found`,
            status: 404,
          }
        : entity
    } catch (error) {
      return error
    }
  }

  async create(payload) {
    console.log('hey create model')
    try {
      let entity = await this.query.create(payload)
      return !entity ? { error: 'entity was not created', status: 404 } : entity
    } catch (error) {
      return error
    }
  }

  async update(id, payload) {
    try {
      let entity = await this.query.update(id, payload)
      return entity
    } catch (error) {
      return error
    }
  }

  async delete(id) {
    try {
      let entity = await this.query.delete(id)
      return entity
    } catch (error) {
      return error
    }
  }
}

module.exports = EntityModel
