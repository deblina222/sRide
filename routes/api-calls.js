var express = require('express');
var router = express.Router();
const client = require('../config/connection');

const {
    isPrime
} = require('../util/utility');
const {
    requestExternalApi
} = require('./request-calls');

function insertResponse(dbName, collectionName, data){
    client.initialize(dbName, collectionName, function (dbCollection) { // successCallback
        // get all items
        dbCollection.insertOne(data, function (err, result) {
            if (err) throw err;
            console.log("records inserted successfully");
        })
    }, function (err) { // failureCallback
        throw (err);
    });
}

/* GET home page. */
router.get('/weather', function (req, res, next) {
    let currentDate = new Date().getDate() || 0;
    const dbName = "sRide";
    const collectionName = "weatherReports";
    console.log('currentDate >>> ', currentDate);

    if (isPrime(currentDate)) {
        requestExternalApi()
            .then(data => {
                insertResponse(dbName, collectionName, data);
                res.send(data);
            })
            .catch((err) => {
                insertResponse(dbName, collectionName, err);
                res.send('Error in getting response')
            });
    } else {
        let obj = {result : 'Date is not prime so no data'}
        insertResponse(dbName, collectionName,obj);
        res.send(obj.result);
    }
});

module.exports = router;