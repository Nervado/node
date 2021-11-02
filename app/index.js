const express = require('express')
const mysql = require('mysql')
const faker = require('faker')

const app = express()

const port = 3000

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}

const connection = async (params) => new Promise(
  (resolve, reject) => {
    const connection = mysql.createConnection(params);
    connection.connect(error => {
      if (error) {
        reject(error);
        return;
      }
      resolve(connection);
    })
  });

const query = async (conn, q, params, close = false) => new Promise(
  (resolve, reject) => {
    const handler = (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      if (close) conn.end()
      resolve(result);
    }
    conn.query(q, params, handler);
  });


// insert some names in database 
const bootDatabase = async (config) => {
  const conn = await connection(config).catch(e => { })

  Array.from(Array(5).keys()).forEach(async () => {
    const randomName = faker.name.findName();
    await query(conn, `INSERT INTO people(name) values('${randomName}')`).catch(console.log);
  })
}

bootDatabase(config)

// routes
app.get('/', async (req, res) => {

  // create connection
  const conn = await connection(config).catch(e => { })
  // generate new name
  const randomName = faker.name.findName();
  // insert new name
  await query(conn, `INSERT INTO people(name) values('${randomName}')`).catch(console.log);
  // query updated list of names
  const results = await query(conn, "SELECT id,name FROM people ORDER BY id DESC LIMIT 100", true).catch(console.log);

  let greeting = `<ul>`

  Object.keys(results).forEach(function (key) {
    greeting = greeting + `<li><p>${results[key].name}</p></li>`
  });

  greeting = greeting + `</ul>`

  res.send(`<h1>Full Cycle Rocks!</h1>` + greeting)
});


app.listen(port, () => {
  console.log('Running on port ' + port)
})