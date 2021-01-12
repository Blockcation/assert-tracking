const mysql= require('mysql');
const crypto = require('crypto');
const express = require('express');
const { json } = require('body-parser');
 var app = express();
 app.set('view engine','ejs')
var con = mysql.createConnection({
  host:"localhost",
  user:"root",
  passwords:"",
  database:"erp1"
});
con.connect(function(err){
  if (err) throw err;
  var data = con.query("SELECT * FROM erp ", function(err,result,field){
    if (err) throw err;
    console.log(data);
    console.log(result);
  });
});
class Block {
  constructor(index, data, prevHash) {
      this.index = index;
      this.timestamp = Math.floor(Date.now() / 1000);
      this.data = data;
      this.prevHash = prevHash;
      this.hash=this.getHash();
  }

  getHash() {
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

var BChain = new BlockChain(data);
//BChain.addBlock(data);
//BChain.addBlock({sender: "bikash", reciver: "sid", amount: 550});
//BChain.addBlock({sender: "sid", reciver: "nirvan", amount: 75});
//BChain.addBlock({sender:"rohan",reciver:"sid",amount:190});
//BChain.addBlock({sender:"rohan",reciver: "sid", amount: 500});

console.dir(BChain,{depth:null})

console.log("******** Validity of this blockchain: ", BChain.chainIsValid(data))

