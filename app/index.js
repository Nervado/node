const express = require('express')

const app = express()

const port = 3000

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}

const mysql = require('mysql')

const connection = mysql.createConnection(config)

const sql = `INSERT INTO people(name) values('Evandro')`

connection.query(sql)

app.get('/', (req, res) => {

  let greeting = ''

  connection.query("SELECT id,name FROM people ORDER BY id DESC LIMIT 100", (error, results, fields) => {
    Object.keys(results).forEach(function (key) {
      greeting = greeting + `<p>Hello ${results[key].name}!</p>`
    });
  })
  res.send(`<h1>Full Cycle</h1>` + greeting)
});


app.listen(port, () => {
  console.log('Running on port ' + port)
})