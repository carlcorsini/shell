exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('items')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('items').insert([
        {
          id: 1,
          name: 'Shoe',
          description: 'It fits',
          photo_url:
            'https://avatars2.githubusercontent.com/u/28901454?s=460&v=4',
        },
        {
          id: 2,
          name: 'Mouse',
          description: 'wireless and fun',
          photo_url:
            'https://avatars2.githubusercontent.com/u/28901454?s=460&v=4',
        },
        {
          id: 3,
          name: 'Cat',
          description: 'happy cat',
          photo_url:
            'https://avatars2.githubusercontent.com/u/28901454?s=460&v=4',
        },
        {
          id: 4,
          name: 'Hula Hoop',
          description: 'Burning Man 1998',
          photo_url:
            'https://avatars2.githubusercontent.com/u/28901454?s=460&v=4',
        },
        {
          id: 5,
          name: 'Frisbee',
          description: 'Burning Man 2009',
          photo_url:
            'https://avatars2.githubusercontent.com/u/28901454?s=460&v=4',
        },
        {
          id: 6,
          name: 'Baseball',
          description: 'Randy Johnson',
          photo_url:
            'https://avatars2.githubusercontent.com/u/28901454?s=460&v=4',
        },
        {
          id: 7,
          name: 'Pencil',
          description: 'Durado Black Warrior',
          photo_url:
            'https://avatars2.githubusercontent.com/u/28901454?s=460&v=4',
        },
        {
          id: 8,
          name: 'Apple',
          description: 'Granny Smith',
          photo_url:
            'https://avatars2.githubusercontent.com/u/28901454?s=460&v=4',
        },
        {
          id: 9,
          name: 'Nuts',
          description: 'Mixed',
          photo_url:
            'https://avatars2.githubusercontent.com/u/28901454?s=460&v=4',
        },
        {
          id: 10,
          name: 'Wallet',
          description: 'Cash comes seperately',
          photo_url:
            'https://avatars2.githubusercontent.com/u/28901454?s=460&v=4',
        },
      ])
    })
    .then(() =>
      knex.raw(
        `SELECT setval('"items_id_seq"', (SELECT MAX("id") FROM "items"))`
      )
    )
}
