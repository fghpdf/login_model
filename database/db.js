var knex = require('knex')({
    client:'mysql',
    connection:{
        host:'localhost',
        user:'hekr',
        password:'hekr',
        database:'app9d',
        charset:'utf8'
    },
    pool:{
        min: 0,
        max: 7
    },
    acquireConnectionTimeout: 10000
});

var bookshelf = require('bookshelf')(knex);

module.exports.db = bookshelf;