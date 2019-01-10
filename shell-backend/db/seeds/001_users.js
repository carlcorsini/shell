exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          first_name: 'Carl',
          last_name: 'Corsini',
          username: 'DJshmarl',
          email: 'carl.c.1192@gmail.com',
          hashedPassword:
            '$2b$10$hjBmT2NQAtV6Qq.ul4E7JOFOU6NGJC76tKlNw4S7Nz30xJUjrpSzS',
          profile_pic:
            'https://avatars2.githubusercontent.com/u/28901454?s=460&v=4',
          location: 'San Francisco, CA',
          bio: 'Software Engineer',
          soundcloud_url: 'https://soundcloud.com/carl-corsini',
          is_admin: true
        },
        {
          id: 2,
          first_name: 'Jon',
          last_name: 'Riemer',
          username: 'jonbeersly',
          email: 'jriemer@gmail.com',
          hashedPassword:
            '$2b$10$XHKm7JBcdYyawcgCr3xyP.RUXaFaLV9TQhkvSWGi58Wj4/9GH4guy',
          profile_pic:
            'https://avatars2.githubusercontent.com/u/23747060?s=460&v=4',
          location: 'San Francisco, CA',
          bio: 'Software Engineer',
          soundcloud_url: 'https://soundcloud.com/carl-corsini',
          is_admin: false
        },
        {
          id: 3,
          first_name: 'Glen',
          last_name: 'Pegado',
          username: 'glenpgd',
          email: 'glenpgd@gmail.com',
          hashedPassword: 'hashedPassword',
          profile_pic:
            'https://cdn-images-1.medium.com/max/1200/0*tzjHqs7icyhShRvw.',
          location: 'San Francisco, CA',
          bio: 'Software Engineer',
          soundcloud_url: 'https://soundcloud.com/carl-corsini',
          is_admin: false
        },
        {
          id: 4,
          first_name: 'Panda',
          last_name: 'Panda',
          username: 'panda',
          email: 'panda@gmail.com',
          hashedPassword: 'hashedPassword',
          profile_pic:
            'https://listen-current-prod.s3.amazonaws.com/events/photos/000/000/467/5dc32f692b8388e9e001b1c7c940bb74e17aa1bc/medium/Panda.Square.png?1434136392',
          location: 'San Francisco, CA',
          bio: 'I love bamboo',
          soundcloud_url: 'https://soundcloud.com/carl-corsini',
          is_admin: false
        },
        {
          id: 5,
          first_name: 'Tom',
          last_name: 'Myspace',
          username: 'tommyspace',
          email: 'tom@myspace.com',
          hashedPassword: 'hashedPassword',
          profile_pic:
            'https://data1.ibtimes.co.in/cache-img-297-0/en/full/552120/imgtom-anderson.png',
          location: 'San Francisco, CA',
          bio: 'Created Myspace',
          soundcloud_url: 'https://soundcloud.com/carl-corsini',
          is_admin: false
        },
        {
          id: 6,
          first_name: 'Michael',
          last_name: 'Corleon',
          username: 'thegodfather',
          email: 'michael.alex.guia@gmail.com',
          hashedPassword: 'hashedPassword',
          profile_pic:
            'http://images1.fanpop.com/images/quiz/2462_1210885994882_446_240.jpg',
          location: 'San Francisco, CA',
          bio: 'I like turtles ',
          soundcloud_url: 'https://soundcloud.com/carl-corsini',
          is_admin: false
        }
      ])
    })
    .then(() =>
      knex.raw(
        `SELECT setval('"users_id_seq"', (SELECT MAX("id") FROM "users"))`
      )
    )
}
