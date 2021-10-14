const config = require('../config')
const mongoose = require('mongoose')

module.exports = async function () {
  const { isDevelopment } = config
  mongoose
    .connect(
      config.databaseConfig.db_cloud,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    )
    .then(() => {
      if (isDevelopment) {
        console.log('connected to mongodb')
      }
    })
    .catch((error) => {
      if (isDevelopment) {
        console.error('Error connected to mongodb:', error.reason)
      }

      process.exit(1)
    })
}
