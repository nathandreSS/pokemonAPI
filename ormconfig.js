module.exports = {
  "type": "postgres",
  "url": process.env.DATABASE_URL,
  "entities": [process.env.ENTITIES],
  "migrations": [process.env.MIGRATIONS],
  "ssl": true,
  "extra": {
    "ssl": {
      "rejectUnauthorized": false,
    },
  },
  "cli": {
    "migrationsDir": "./src/shared/infra/typeorm/migrations"
  }
}
