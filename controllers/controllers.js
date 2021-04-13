var bal = 0;
var add = 0 ;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function createUser(){


}

const getBalance = async(req, res, next) => {
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "remotemysql.com",
  user: "nGgOkH1PqW",
  password: "CQBZveV1zb",
  port: "3306" ,
  database: 'nGgOkH1PqW'
});

con.connect( function(err) {
  if (err) throw err;
  console.log("Connected!");
});

con.query("SELECT Balance FROM Details where Username=\"test\" ", function (err, result, fields) {
  if (err) throw err;
  console.log("inside bal:"+result[0].Balance);
  
  bal = result[0].Balance;
  console.log("inside"+bal);
  console.log(result);
});

await sleep(2500);

res.status(200).json({
  balance : String(bal)
});

con.on('error', function(err) {
  console.log('db error', err);
  if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
    handleDisconnect();                        // lost due to either server restart, or a
  } else {                                      // connnection idle timeout (the wait_timeout
    throw err;                                  // server variable configures this)
  }
});

function handleDisconnect() {
  con.connect( function(err) {
    if (err) 
    { console.log("Connection Error " , err ) ; setTimeout(handleDisconnect, 2000);   }
    console.log("Connected!");
  }); }

};

const addFunds = async(req, res, next) => {
    /* TODO updating bank balance in Database */ 
var mysql = require('mysql');
//console.log(req);
console.log(req.query);
// console.log(json(req.body));
console.log(req.query.amount);
add = req.query.amount;

var con = mysql.createConnection({
  host: "remotemysql.com",
  user: "nGgOkH1PqW",
  password: "CQBZveV1zb",
  port: "3306" ,
  database: 'nGgOkH1PqW'
});

con.connect(function(err) {
  if (err) throw err;
});


var sql = "UPDATE Details SET Balance = Balance + "+ add +" WHERE Username=\"test\" ";
con.query(sql, function (err, result) {
  if (err) throw err;
  console.log(result.affectedRows + " record(s) updated");
});

con.query("SELECT Balance FROM Details where Username=\"test\" ", function (err, result, fields) {
  if (err) throw err;
console.log("inside bal:"+result[0].Balance); 
bal = result[0].Balance;
});


await sleep(2500);

res.status(200).json({
  balance: String(bal)
});

con.on('error', function(err) {
  console.log('db error', err);
  if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
    handleDisconnect();                        // lost due to either server restart, or a
  } else {                                      // connnection idle timeout (the wait_timeout
    throw err;                                  // server variable configures this)
  }
});

function handleDisconnect() {
  con.connect( function(err) {
    if (err) 
    { console.log("Connection Error " ) ; setTimeout(handleDisconnect, 2000);   }
    console.log("Connected!");
  });
}
  
};

module.exports.getBalance = getBalance;
module.exports.addFunds = addFunds;


