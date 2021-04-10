
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
});

/* con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT balance FROM bank where user= ", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  }); */

    res.status(200).json({
        balance: "Balance from Cloudant will be returned here"
    });
};

const addFunds = (req, res, next) => {
    /* TODO updating bank balance in Database */ 
    var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "yourusername",
  password: "yourpassword",
  database: "mydb"
});

con.connect(function(err) {
  if (err) throw err;
  var sql = "UPDATE bank SET balance += add WHERE user = 'Valley 345'";
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


