const crypto = require('crypto')
const express = require('express')
const mysql = require('mysql')
const bodyparser = require('body-parser')
const port = 3000
const app = express()
var connection = mysql.createConnection({
    host      :'localhost',
    user      :'root',
    password  :'',
    database  :'employee'
  });
  connection.connect(function(err){
    if (err) throw err;
     console.log('connected.')
  })

class Block {
    constructor(index,data,preveHash){
        this.index=index;
        this.data= data;
        this.timestamp = Math.floor(Data.now() / 1000);
        this.preveHash = preveHash;
        this.hash = this.getHash();
     }
    getHash(){
        var encript=JSON.stringify(this.data) + this.prevHash + this.index + this.timestamp;
       var hash=crypto.createHmac('sha256', "secret")
       .update(encript)
       .digest('hex');
       // return sha(JSON.stringify(this.data) + this.prevHash + this.index + this.timestamp);
       return hash;
   }
    
}
class BlockChain {
    constructor() {
      this.chain = [];
    }
 
    addBlock(data) {
        let index = this.chain.length;
        let prevHash = this.chain.length !== 0 ? this.chain[this.chain.length - 1].hash : 0;
        let block = new Block(index, data, prevHash);
        this.chain.push(block);
    }
 
    chainIsValid(){
            for(var i=0;i<this.chain.length;i++){
                if(this.chain[i].hash !== this.chain[i].getHash())
                    return false;
                if(i > 0 && this.chain[i].prevHash !== this.chain[i-1].hash)
                    return false;
            }
            return true;
        }
 }
 app.use(bodyparser.urlencoded({extended:false}))

app.set('view engine','pug')
app.get('/',function(req,res){
 res.sendFile('index.html', {root: __dirname })
})
app.get('/user2',function(req,res){
    connection.query("SELECT * FROM user2",BChain, function(err, rows, fields){
      if (err) throw err
      res.render('user', {title: 'Data saved',items:rows })
  })
   })

   app.post("/submit",function(req,res){
   
    var BChain = new BlockChain();
  BChain.addBlock  = ({
   name : req.body.name,
    mobile : req.body.mobile,
     email : req.body.email
  });
    var sql = "INSERT  INTO user2 set ? ";
  
    //var sql = "insert into user2 values(null,'"+req.body.name+"',"+req.body.mobile+",'"+req.body.email+"')";
    //var sql = ("INSERT INTO user2(name, mobile , email ) VALUES (?, ?, ?)",[user_name,user_mobile, hash_email]);
    connection.query(sql,author, function(err){
      if (err) throw err
      res.render('index', {title: 'DAta saved',message:'saved' })
  })
        connection.end();
  })   
  //console.dir(BChain,{depth:null})
  //console.log("******** Validity of this blockchain: ", BChain.chainIsValid());
  app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))