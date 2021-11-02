const express = require('express')
const mysql = require('mysql')

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

const query = async (conn, q, params) => new Promise(
  (resolve, reject) => {
    const handler = (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      conn.end()
      resolve(result);
    }
    conn.query(q, params, handler);
  });


// insert data in database 
const bootDatabase = async (config) => {
  const conn = await connection(config).catch(e => { })
  await query(conn, "INSERT INTO people(name) values('Paula')").catch(console.log);
  await query(conn, "INSERT INTO people(name) values('Thais')").catch(console.log);
  await query(conn, "INSERT INTO people(name) values('Fernanda')").catch(console.log);
  await query(conn, "INSERT INTO people(name) values('João')").catch(console.log);
}
bootDatabase(config)

// routes
app.get('/', async (req, res) => {

  const conn = await connection(config).catch(e => { })
  const results = await query(conn, "SELECT id,name FROM people ORDER BY id DESC").catch(console.log);

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