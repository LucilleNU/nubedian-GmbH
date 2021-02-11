var express = require('express')
var cors = require('cors')
var app = express()
const port = 3000
var mysql      = require('mysql');

app.use(cors())

//database parameters
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Nawaanika1',
  database : 'RAMS'
});

var ramBrands = [];
connection.connect();
 
//querying the database
connection.query('SELECT rambrand.id, rambrand.Brand, rambrand.Model, ramtype.Ttype, rambrand.Clock_speed, rambrand.Size, rambrand.CAS_latency, rambrand.ECC_status, rambrand.Price FROM ramtype LEFT JOIN rambrand ON ramtype.id = rambrand.ramtype_id;', function (error, results, fields) {
  if (error) throw error;
  ramBrands = results;
  //console.log('The solution is: ', results);
});

//returns ramBrands[] whenever called
app.get('/api/get/rams', function (req, res) {
    res.send(ramBrands)
  })

app.post('/api/edit/rams', function (req, res) {
 // res.json(req.body);
  var postData  = req.body;
  connection.query('UPDATE `rambrand` SET `Size`=?,`CAS_latency`=?,`ECC_status`=?, `Price`=?,`Clock_speed`=? where `id`=?', [req.body.Size, req.body.CAS_latency, req.body.ECC_status, req.body.Price, req.body.Clock_speed, req.body.id], function (error, results, fields) {
    if (error) throw error;
   res.end(JSON.stringify(results));
 });
  })  

 /*app.post('/api/post/rams', function(res){
    if (res){
        res.send('success')
    }
    else
    res.send('error')
} )*/

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
  })

connection.end();

