var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
const port = 3000
var mysql      = require('mysql');
var jsonParser = bodyParser.json()

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

app.put('/api/edit/rams', jsonParser, function (req, res) {
 console.log("Logging Edit Value " + JSON.stringify(req.body));
  connection.query('UPDATE `rambrand` SET `Brand`=?, `Model`=?, `ramtype_id`=?, `Size`=?,`CAS_latency`=?,`ECC_status`=?, `Price`=?,`Clock_speed`=? where `id`=?', [req.body.Brand, req.body.Model, req.body.Ttype, req.body.Size, req.body.CAS_latency, req.body.ECC_status, req.body.Price, req.body.Clock_speed, req.body.id], function (error, results, fields) {
    if (error) throw error;
   res.end(JSON.stringify(results));
 });
  })  

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
  })

//connection.end();

