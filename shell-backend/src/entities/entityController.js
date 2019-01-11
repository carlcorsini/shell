class EntityController {
  constructor(model, middleware, env) {
    this.model = model
    this.middleware = middleware
    this.env = env
    this.create = this.create.bind(this)
    this.getAll = this.getAll.bind(this)
    this.getById = this.getById.bind(this)
    // this.getByEitherOr = this.getByEitherOr.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  async getAll(req, res, next) {
    try {
      let authorization = await this.middleware.authorize(
        req.headers.authorization
      )
      if (authorization.error) {
        return next(authorization)
      }

      let entities = await this.model.getAll()
      return res.status(200).json(entities)
    } catch (error) {
      return next(error)
    }
  }

  async getById(req, res, next) {
    let id = Number(req.params.id)
    try {
      let authorization = await this.middleware.authorize(
        req.headers.authorization
      )
      if (authorization.error) {
        return next(authorization)
      }

      let entity = await this.model.getById(id)
      if (entity.error == 'error retrieving entity') {
        return next(entity)
      }

      return res.status(200).json(entity)
    } catch (error) {
      return next(error)
    }
  }

  async getByAttr(req, res, next, attr) {
    try {
      let entity = await this.model.getByAttr(
        attr,
        req.params.username.toLowerCase()
      )
      return entity.error ? next(entity) : res.status(200).json(entity)
    } catch (error) {
      return next(error)
    }
  }

  // async getByEitherOr(either, or, id) {
  //   try {
  //     console.log(either, or, id)
  //     let entity = await this.query.getByEitherOr(either, or, id)
  //     return !entity
  //       ? {
  //           error: `${either} or ${or} with attribute ${id} not found`,
  //           status: 404,
  //         }
  //       : entity
  //   } catch (error) {
  //     return error
  //   }
  // }

  async create(req, res, next) {
    try {
      let payload = req.body
      let isValid = this.middleware.usersValidators.createUser(payload)
      if (!isValid) return next(isValid)

      let entity = await this.model.create(payload)

      return entity.error ? next(entity) : res.status(201).json(entity)
    } catch (error) {
      return next(error)
    }
  }

  async update(req, res, next) {
    try {
      let id = Number(req.params.id)
      let payload = req.body

      let user = await this.model.update(id, payload)

      return res.status(201).json(user)
    } catch (error) {
      return next(error)
    }
  }

  async delete(req, res, next) {
    try {
      let id = Number(req.params.id)
      let response = await this.model.delete(id)
      return res.status(201).json(response)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = EntityController
