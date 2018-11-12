var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Car = mongoose.model('Car');

var testCarData = {
    car1: {
        VIN: '5FNYF3H52DB030806',
        make: 'Tesla',
        model: 'Roadster',
        color: 'Red',
        purchaseDate: '09/15/18',
        purchasePrice: 250000.00,
        originalPrice: 250000.00,
        owner: 'Nathan Marrs',
        previousOwners: [],
        mileage: 2000,
        maintenanceHistory: [{
                type: 'Wiper Fluid Replacement',
                date: '09/10/18',
                vendor: 'Oil Rig'
            },
            {
                type: 'Tire Alignment',
                date: '09/09/18',
                vendor: 'Clegg Auto'
            }
        ]
    },
    car2: {
        VIN: '1HTLKUGR4EHA92618',
        make: 'Tesla',
        model: 'Model S P100D',
        color: 'Silver',
        purchaseDate: '09/15/14',
        purchasePrice: 50000.00,
        originalPrice: 80000.00,
        owner: 'Nolan Maddy',
        previousOwners: ['Michael Shim'],
        mileage: 80000,
        maintenanceHistory: [{
                type: 'Wiper Fluid Replacement',
                date: '07/18/15',
                vendor: 'Wiper Emporium'
            },
            {
                type: 'Tire Replacement',
                date: '02/10/17',
                vendor: 'Tires on Fires'
            },
            {
                type: 'Wiper Fluid Replacement',
                date: '10/10/17',
                vendor: 'Oil Rig'
            },
            {
                type: 'Tire Alignment',
                date: '05/09/18',
                vendor: 'Clegg Auto'
            }
        ]
    }
}

var blocks = []

// Initially add two car objects to the database
// var car1 = new Car(testCarData.car1)
// car1.save()
// var car2 = new Car(testCarData.car2)
// car2.save()

function initializeCars(carData) {
    var car1 = new Car(carData.car1)
    car1.save()
    var car2 = new Car(carData.car2)
    car2.save()
}

var testBlockchain = {
    blocks: [{
        hash: "05cb71f35c3115a138a8f975bc946f5a470f7850570860c0662bc0e7ce513377",
        index: 0,
        nonce: 0,
        previousHash: "0000000000000000",
        transactions: []
    }]
}

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/cardata', function(req, res) {
    Car.find(function(err, cars) {
        if (err) {
            return next(err)
        }
        else {
            res.send(cars)
        }
    })
});

router.post('/cardata', function(req, res) {
    console.log("In CarData Post");
    Car.collection.drop();
    initializeCars(req.body)
    res.end(`{"success" : "Updated Successfully", "status" : 200`);
});

router.get('/blockchain', function(req, res) {
    res.send(blocks);
});

router.post('/blockchain', function(req, res) {
    console.log("In Blockchain Post");
    blocks = req.body;
    res.end(`{"success" : "Updated Successfully", "status" : 200`);
});

module.exports = router;
