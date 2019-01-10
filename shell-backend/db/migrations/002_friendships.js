exports.up = function(knex, Promise) {
  return knex.schema.createTable('friendships', table => {
    table.increments()
    table
      .integer('followee_id')
      .references('users.id')
      .onDelete('cascade')
    table
      .integer('follower_id')
      .references('users.id')
      .onDelete('cascade')
    table.timestamps(true, true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('friendships')
}
