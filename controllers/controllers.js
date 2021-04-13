var bal = 0;
var add = 0 ;
var new_user; 


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const getBalance = async(req, res, next) => {

email = req.query.email;
username = req.query.username ;

 
var mysql = require('mysql');
const con = mysql.createConnection({
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

await sleep(1000);

console.log(email);

await sleep(1000);

con.query("SELECT count(Info) as count FROM Details where Info=\"" + email + "\"", function (err, result, fields) {
  if (err) throw err;
  new_user = result[0].count ;
});

console.log("Count Completed , " , new_user);

await sleep(1000);

if(new_user==0|| new_user==undefined)
{
  var sql = "INSERT into Details values(0,NULL,NULL,\"" + email + "\") ";
  con.query(sql, function (err, result) {
  if (err) throw err;
  console.log(result.affectedRows + " record(s) updated");
  new_user=1
  bal = 0 ;
  con.query("SELECT Balance FROM Details where Info=\"" + email + "\" ", async function (err, result, fields) {
    try { bal = result[0].Balance;}
    catch{
      bal=0;
    }
    console.log(result);
  });
});
}
else{
  con.query("SELECT Balance FROM Details where Info=\"" + email + "\" ", async function (err, result, fields) {
    try { bal = result[0].Balance;}
    catch{
      bal=0;
    }
    console.log(result);
  });
}


await sleep(2500);

res.status(200).json({
  balance : String(bal)
});

con.on('error', function(err) {
  console.log('db error');
  if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
    handleDisconnect();                        // lost due to either server restart, or a
  } else {                                      // connnection idle timeout (the wait_timeout
    throw err;                                  // server variable configures this)
  }
});

function handleDisconnect() {
  con.connect( function(err) {
    if (err) 
    { console.log("Connection Error ") ; setTimeout(handleDisconnect, 2000);   }
    console.log("Connected!");
  }); }

};

const addFunds = async(req, res, next) => {

//console.log(req);
var mysql = require('mysql');
console.log(req.body.amount);
console.log(req.body.email);
add = req.body.amount;
email = req.body.email;

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

await sleep(1000);

console.log(email);

var sql = "UPDATE Details SET Balance = Balance + "+ add +" WHERE Info=\"" + email +"\"";
console.log(sql);
con.query(sql, function (err, result) {
  if (err) throw err;
  console.log(result.affectedRows + " record(s) updated");
});

await sleep(1000);

con.query("SELECT Balance FROM Details where Info=\"" + email + "\" ", function (err, result, fields) {
  if (err) throw err;
console.log("inside bal:"+result[0].Balance); 
bal = result[0].Balance;
});

await sleep(2500);

res.status(200).json({
  balance: String(bal)
});

con.on('error', function(err) {
  console.log('db error');
  if(err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') { // Connection to the MySQL server is usually
    handleDisconnect();                        // lost due to either server restart, or a
  } else {                                      // connnection idle timeout (the wait_timeout
    throw err;                                  // server variable configures this)
  }
});

function handleDisconnect() {
  con.connect( function(err) {
    if (err) 
    { console.log("Connection Error ") ; setTimeout(handleDisconnect, 2000);   }
    console.log("Connected!");
  });
}
  
};

module.exports.getBalance = getBalance;
module.exports.addFunds = addFunds;


