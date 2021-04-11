
const getBalance = (req, res, next) => {
var mysql = require('mysql');
var bal ;

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
  bal = result;
  console.log(result);
});
});

    res.status(200).json({
        balance: bal
    });
};

const addFunds = (req, res, next) => {
    /* TODO updating bank balance in Database */ 
var mysql = require('mysql');
add = 100 ;

var con = mysql.createConnection({
  host: "remotemysql.com",
  user: "nGgOkH1PqW",
  password: "CQBZveV1zb",
  port: "3306" ,
  database: 'nGgOkH1PqW'
});

con.connect(function(err) {
  if (err) throw err;
  var sql = "UPDATE Details SET Balance += 100 WHERE Username=\"test\" ";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
  });
});
    res.status(200).json({
        balance: "Balance will be updated in Cloudant Database"
    });
};

module.exports.getBalance = getBalance;
module.exports.addFunds = addFunds;


