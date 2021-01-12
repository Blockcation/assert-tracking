const express = require('express')
const mysql = require('mysql')
const bodyparser = require('body-parser')
const app = express()
const port = 3001
//const {user_name, user_mobile, user_email} = req.body;
var connection = mysql.createConnection({
  host      :'localhost',
  user      :'root',
  password  :'',
  database  :'erp1'
});
connection.connect(function(err){
  if (err) throw err;
   console.log('connected.')
})
app.use(bodyparser.urlencoded({extended:false}))

app.set('view engine','pug')
app.get('/',function(req,res){
 res.sendFile('index.html', {root: __dirname })
})
app.get('/erp',function(req,res){
  connection.query("SELECT * FROM erp", function(err, rows, fields){
    if (err) throw err
    res.render('users', {title: 'DAta saved',items:rows })
})
 })
 app.get('/erp',function(req,res){
  connection.query("SELECT * FROM erp",author, function(err, rows, fields){
    if (err) throw err
    res.render('users', {title: 'DAta saved',items:rows })
})
 })


app.post("/submit",function(req,res){
  //console.log(req.body);
var author = {
 name : req.body.name,
  mobile : req.body.mobile,
   email : req.body.email
}
  var sql = "INSERT  INTO erp set ? ";

  //var sql = "insert into user2 values(null,'"+req.body.name+"',"+req.body.mobile+",'"+req.body.email+"')";
  //var sql = ("INSERT INTO user2(name, mobile , email ) VALUES (?, ?, ?)",[user_name,user_mobile, hash_email]);
  connection.query(sql,author, function(err){
    if (err) throw err
    res.render('index', {title: 'DAta saved',message:'saved' })
})
      connection.end();
})
//connection.end();
    app.listen(port,() => console.log(`example app listening port`))
    