const express = require('express');
const app = express();
const port = 3000;
​
var knex = require('knex')({
  client: 'pg',
  //URI
  connection: 'postgres://huzzmuye:6ipxLo0os5DzkdSp6i_xI-9y1YzTQOJx@suleiman.db.elephantsql.com:5432/huzzmuye',
  searchPath: ['knex', 'public'],
});
​
//basic select
app.get('/', (req, res) => {
  knex.select('name').from('users').then(rows => {
    try {
      res.send(JSON.stringify(rows));
      console.log(rows)
    } catch (e) {
      console.error(e);
    }
  });
});
​
​
//insert user
app.get('/insertuser', (req, res) => {
  if (req.query.name) {
    knex.insert([{ name: req.query.name }]).into('users').then(response => {
      console.log(response);
      res.send('done!');
    });
  } else {
    res.send('no name included!')
  }
});
​
​
​
//update user 
app.get('/updateuser', (req, res) => {
  if (req.query.name && req.query.id) {
    const { name, id } = req.query;
    knex('users')
      .where({ id: id })
      .update({ name: name }, ['name']).then(response => {
        console.log(response);
        res.send(JSON.stringify(response));
      });
  } else {
    res.send('no name or id included!')
  }
});
​
​
// delete user
app.get('/deleteuser', (req, res) => {
  if (req.query.id) {
    const { id } = req.query;
    knex('users')
      .where('id', id)
      .del().then(response => {
        console.log(response);
        res.send('done!');
      })
​
  } else {
    res.send('no name or id included!')
  }
});
​
​
//RAW select 
app.get('/raw', (req, res) => {
  if (req.query.id) {
    const { id } = req.query;
    knex.raw('select * from public.users where id = ?', [id]).then(response => {
      res.send(JSON.stringify(response.rows));
    })

  } else {
    res.send('no id included!')
  }
});
​
app.listen(port, () => console.log('server started :D'))