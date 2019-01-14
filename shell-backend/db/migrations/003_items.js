exports.up = function(knex, Promise) {
  return knex.schema.createTable('items', function(table) {
    table.increments()
    table.text('name').notNullable()
    table.text('description').defaultTo('')
    table.text('photo_url').defaultTo('')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('items')
}
