const getBalance = (req, res, next) => {
    res.status(200).json({
        balance: 0
    });
};

const addFunds = (req, res, next) => {
    res.status(200).json({
        balance: 0
    });
};

module.exports.getBalance = getBalance;
module.exports.addFunds = addFunds;


/*

var Cloudant = require('@cloudant/cloudant');
var cloudant = Cloudant({ account: acct, username: me, password: password });

var db = cloudant.db.use('db');
db.get('non-existent-doc', function(err, data) {
    console.log(err);
});

function findById(id) {
    return new Promise((resolve, reject) => {
        db.get(id, (err, document) => {
            if (err) {
                if (err.message == 'missing') {
                    logger.warn(`Document id ${id} does not exist.`, 'findById()');
                    resolve({ data: {}, statusCode: 404 });
                } else {
                    logger.error('Error occurred: ' + err.message, 'findById()');
                    reject(err);
                }
            } else {
                resolve({ data: JSON.stringify(document), statusCode: 200 });
            }
        });
    });
}

function update(id, description) {
    return new Promise((resolve, reject) => {
        // Retrieve the list (need the rev)
        findById(id).then((response) => {
            // Parse the stringified JSON
            let list = JSON.parse(response.data);
            // Update the description
            list.description = description;
            list.whenModified = Date.now();
            // Update the document in Cloudant
            db.insert(list, (err, response) => {
                if (err) {
                    logger.error('Error occurred: ' + err.message, 'update()');
                    reject(err);
                } else {
                    resolve({ data: { updatedId: response.id, updatedRevId: response.rev }, statusCode: 200 });
                }
            });
        }).catch((err) => {
            logger.error('Error occurred: ' + err.message, 'update()');
            reject(err);
        });
    });
}


*/