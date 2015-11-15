'use strict;'

require('dotenv').load();

module.exports = {
  development: {
    host: 'db',
    database: 'data_dev',
    username: 'postgres',
    password: 'password',
    dialect: 'postgres',
    logging: true,
  },
  test: {
    host: 'db',
    database: 'data_test',
    username: 'postges',
    password: 'password',
    dialect: 'postgres',
  },
  production: {
    host: process.env.DB_URL,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: 'postgres',
  }
};
