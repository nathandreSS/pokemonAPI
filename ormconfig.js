module.exports = {
  "type": "postgres",
  "url": process.env.DATABASE_URL,
  "entities": [process.env.ENTITIES],
  "migrations": [process.env.MIGRATIONS],
  "ssl": !(process.env.NODE_ENV == 'development'),
  "extra":  process.env.NODE_ENV == 'development' ? null : {
    "ssl": {
      "rejectUnauthorized": false,
    },
  },
  "cli": {
    "migrationsDir": "./src/shared/infra/typeorm/migrations"
  }
};
