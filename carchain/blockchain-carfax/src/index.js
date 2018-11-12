import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { Block, Blockchain, Car } from './blockchain/models'


// Set up blockchain here, with initial data being source and passed into React app
// Create genesis block
var genesisBlock = new Block()
var blockchain = new Blockchain(genesisBlock)

var blockchainurl = "http://ec2-54-218-255-196.us-west-2.compute.amazonaws.com:4200/blockchain"
fetch(blockchainurl)
    .then(function(response) {
        return response.json()
    })
    .then(function(blocks) {
        if (blocks.blocks && blocks.blocks.length > 0) {
            blocks.blocks.forEach(function(block) {
                if (block.index !== 0) {
                    var newBlock = new Block(block.index, block.previousHash, block.hash, block.nonce, block.transactions)
                    blockchain.addBlock(newBlock)
                }
            })
        }
    })
    .then(function() {
        var url = "http://ec2-54-218-255-196.us-west-2.compute.amazonaws.com:4200/cardata"
        fetch(url)
            .then(function(response) {
                var data = response.json()
                console.log(data)
                return data
            })
            .then(function(testData) {
                var car1 = new Car(testData[0].VIN, testData[0].make, testData[0].model, testData[0].color, testData[0].purchaseDate, testData[0].purchasePrice, testData[0].originalPrice, testData[0].mileage, testData[0].maintenanceHistory, testData[0].owner, testData[0].previousOwners)
                var car2 = new Car(testData[1].VIN, testData[1].make, testData[1].model, testData[1].color, testData[1].purchaseDate, testData[1].purchasePrice, testData[1].originalPrice, testData[1].mileage, testData[1].maintenanceHistory, testData[1].owner, testData[1].previousOwners)
                var cars
                if (car1.model === 'Roadster') {
                    cars = { car1, car2 }
                }
                else {
                    cars = { car2, car1 }
                }

                ReactDOM.render(<App blockchain={blockchain} cars={cars} />, document.getElementById('root'));
                registerServiceWorker();
            })
    })
    .catch(function(error) {
        console.log('An error occurred!', error)
    });
