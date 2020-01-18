var express = require('express');
var router = express.Router();
const {
    client
} = require('../config/connection');

const {
    isPrime
} = require('../util/utility');
const {
    requestExternalApi
} = require('./request-calls');

/* GET home page. */
router.get('/weather', function (req, res, next) {
    let currentDate = new Date('02-02-2020').getDate() || 0;
    console.log('currentDate >>> ', currentDate);

    if (isPrime(currentDate)) {
        requestExternalApi()
            .then(data => {
                // console.log(client.adminCommand( { listDatabases: 1, nameOnly: true} ))
                const collection = client.db("sRide").collection("weatherReports");
                // // perform actions on the collection object 
                // collection.insertOne(data.weather, (error, result) => {
                //     if(error) {
                //         return res.status(500).send(error);
                //     }
                //     res.send(data);
                // });
                res.send(data);
            })
            .catch(() => res.send('Error in getting response'));
    } else {
        res.send('Date is not prime so no data');
    }
});

module.exports = router;