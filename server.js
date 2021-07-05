const express = require('express')
const mysql = require('mysql')
require('dotenv').config()

const port = 8081
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB
})

const app = express()
app.use(express.json())
app.use(express.static(__dirname, { dotfiles: 'allow' } ))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
})

app.get('/', (req, res) => {
  res.status(200).send('TimeLine-API')
})

app.get('/doctors', (req, res) => {
  const getDoctors = `
    SELECT
      id,
      name,
      active,
      times,
      default_times
    FROM doctors
  `
  connection.query(getDoctors, (err, rows, fields) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(rows)
    }
  })
})

app.listen(port, () => {
  console.log(`API Started on http://localhost:${port}\n`)
})
