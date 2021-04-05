const getBalance = (req, res, next) => {
    res.status(200).json({
        balance: 0
    });
};

module.exports.getBalance = getBalance;