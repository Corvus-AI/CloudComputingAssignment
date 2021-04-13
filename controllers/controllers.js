var bal = 0;
var add = 0 ;

const getBalance = (req, res, next) => {
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "remotemysql.com",
  user: "nGgOkH1PqW",
  password: "CQBZveV1zb",
  port: "3306" ,
  database: 'nGgOkH1PqW'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("SELECT Balance FROM Details where Username=\"test\" ", function (err, result, fields) {
  if (err) throw err;
  console.log("inside bal:"+result[0].Balance);
  
  bal = result[0].Balance;
  console.log("inside"+bal);
  console.log(result);
});
});
    console.log("test"+bal)
    res.status(200).json({
        balance : String(bal)
    });
};

const addFunds = (req, res, next) => {
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
  var sql = "UPDATE Details SET Balance = Balance + "+ add +" WHERE Username=\"test\" ";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
  });
  con.query("SELECT Balance FROM Details where Username=\"test\" ", function (err, result, fields) {
    if (err) throw err;
  console.log("inside bal:"+result[0].Balance); }); 
  bal = result[0].Balance;

});


    res.status(200).json({
        balance: String(bal)
    });
};

module.exports.getBalance = getBalance;
module.exports.addFunds = addFunds;


