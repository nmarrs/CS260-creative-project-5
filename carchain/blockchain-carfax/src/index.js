import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
// import { initializeBlockchain } from './blockchain/setup'
import { Block, Blockchain, Car } from './blockchain/models'

// let sampleMaintenanceLog = {
//     type: 'Tire Pressure Check',
//     date: '09/25/18',
//     vendor: 'Tire PRESSure'
// }

// Set up blockchain here, with initial data being source and passed into React app
// Create genesis block
var genesisBlock = new Block()
var blockchain = new Blockchain(genesisBlock)
// var blockchainurl = "http://ec2-54-218-255-196.us-west-2.compute.amazonaws.com:4200/blockchain"
// fetch(blockchainurl)
//     .then(function(response) {
//         return response.json()
//     })
//     .then(function(testBlockchain) {
//         blockchain = testBlockchain
// })

var url = "http://ec2-54-218-255-196.us-west-2.compute.amazonaws.com:4200/cardata"
fetch(url)
    .then(function(response) {
        return response.json()
    })
    .then(function(testData) {
        var car1 = new Car(testData.car1.VIN, testData.car1.make, testData.car1.model, testData.car1.color, testData.car1.purchaseDate, testData.car1.purchasePrice, testData.car1.originalPrice, testData.car1.mileage, testData.car1.maintenanceHistory, testData.car1.owner, testData.car1.previousOwners)
        var car2 = new Car(testData.car2.VIN, testData.car2.make, testData.car2.model, testData.car2.color, testData.car2.purchaseDate, testData.car2.purchasePrice, testData.car2.originalPrice, testData.car2.mileage, testData.car2.maintenanceHistory, testData.car2.owner, testData.car2.previousOwners)
        var cars = { car1, car2 }

        //create sample transactions
        // let transaction = new Transaction('Nathan Marrs', 'Michael Shim', car1, 'transferOwnership')
        // let block = blockchain.getNextBlock([transaction])
        // blockchain.addBlock(block)

        // let transaction1 = new Transaction('', '', car2, 'addMaintenanceLog', sampleMaintenanceLog)
        // let block1 = blockchain.getNextBlock([transaction1])
        // blockchain.addBlock(block1)

        ReactDOM.render(<App blockchain={blockchain} cars={cars} />, document.getElementById('root'));
        registerServiceWorker();
    })
    .catch(function() {
        console.log('An error occurred!')
    });
