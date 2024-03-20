import express from 'express'
import cookieParser from 'cookie-parser'
import 'dotenv/config'

import sequelize from './libs/sequelize.js'

import router from './router/index.js'

const app = express()
const port = 8000

app.use(express.json())
app.use(cookieParser())
app.use(router)

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})