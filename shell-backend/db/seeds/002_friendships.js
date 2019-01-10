exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('friendships')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('friendships').insert([
        {
          id: 1,
          followee_id: 1,
          follower_id: 2
        },
        {
          id: 2,
          followee_id: 1,
          follower_id: 3
        },
        {
          id: 3,
          followee_id: 1,
          follower_id: 4
        },
        {
          id: 4,
          followee_id: 2,
          follower_id: 1
        },
        {
          id: 5,
          followee_id: 2,
          follower_id: 3
        },
        {
          id: 6,
          followee_id: 2,
          follower_id: 4
        },
        {
          id: 7,
          followee_id: 3,
          follower_id: 1
        },
        {
          id: 8,
          followee_id: 3,
          follower_id: 2
        },
        {
          id: 9,
          followee_id: 3,
          follower_id: 4
        },
        {
          id: 10,
          followee_id: 4,
          follower_id: 1
        },
        {
          id: 11,
          followee_id: 4,
          follower_id: 2
        },
        {
          id: 12,
          followee_id: 4,
          follower_id: 3
        },
        {
          id: 13,
          followee_id: 1,
          follower_id: 5
        }
      ])
    })
    .then(() =>
      knex.raw(
        `SELECT setval('"friendships_id_seq"', (SELECT MAX("id") FROM "friendships"))`
      )
    )
}
