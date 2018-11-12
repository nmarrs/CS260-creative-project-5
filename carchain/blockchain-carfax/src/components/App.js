import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Modal from 'react-responsive-modal'

import logo from '../images/logo.png'
import '../styles/App.css';
import Car from './Car'
import Block from './Block'
import TransferCarForm from './TransferCarForm'
import MaintenanceLogForm from './MaintenanceLogForm'
import { Transaction } from '../blockchain/models'

class App extends Component {
  static propTypes = {
    blockchain: PropTypes.object.isRequired,
    cars: PropTypes.object.isRequired
  }

  state = {
    transferModalOpen: false,
    addMaintenanceLogModalOpen: false,
    currentCar: {}
  }

  onToggleTransferModal = () => {
    this.setState({ transferModalOpen: !this.state.transferModalOpen })
  }

  onToggleAddMaintenanceLogModal = () => {
    this.setState({ addMaintenanceLogModalOpen: !this.state.addMaintenanceLogModalOpen })
  }

  transferOwnership = (car) => {
    this.onToggleTransferModal()
    this.setState({ currentCar: car })
  }

  addMaintenanceLog = (car) => {
    this.onToggleAddMaintenanceLogModal()
    this.setState({ currentCar: car })
  }

  performTransfer = (from, to) => {
    console.log('Origial Blockchain:', this.props.blockchain)
    let transferTransaction = new Transaction(from, to, this.state.currentCar, 'transferOwnership')
    let block = this.props.blockchain.getNextBlock([transferTransaction])
    this.props.blockchain.addBlock(block)
    console.log('Updated Blockchain:', this.props.blockchain)
    this.saveCarData()
    this.saveBlockchain()
  }

  performAddMaintenanceLog = (type, date, vendor) => {
    console.log('Origial Blockchain:', this.props.blockchain)
    let addMaintenanceLogTransaction = new Transaction('', '', this.state.currentCar, 'addMaintenanceLog', { type, date, vendor })
    let block = this.props.blockchain.getNextBlock([addMaintenanceLogTransaction])
    this.props.blockchain.addBlock(block)
    console.log('Updated Blockchain:', this.props.blockchain)
    this.saveCarData()
    this.saveBlockchain()
  }

  saveCarData = async() => {
    var data = JSON.stringify(this.props.cars)
    console.log(data)
    var url = "http://ec2-54-218-255-196.us-west-2.compute.amazonaws.com:4200/cardata"
    fetch(url, {
      method: 'post',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: data
    }).then(function(response) {
      console.log('successfully saved data!')
    })
  }

  saveBlockchain = async() => {
    var data = JSON.stringify(this.props.blockchain)
    console.log(data)
    var url = "http://ec2-54-218-255-196.us-west-2.compute.amazonaws.com:4200/blockchain"
    fetch(url, {
      method: 'post',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: data
    }).then(function(response) {
      console.log('successfully saved data!')
    })
  }

  render() {
    const {
      transferModalOpen,
      addMaintenanceLogModalOpen,
      currentCar
    } = this.state

    const {
      cars,
      blockchain
    } = this.props

    return (
      <div className="App">
        <header className="App-header shadow">
          <img src={logo} className="App-logo shadow" alt="logo" />
        </header>
        <h3 className='m-3'><i class="fas fa-info-circle"></i> Explanation</h3>
        <div className='w-50 mx-auto'>
        <h4><i class="fas fa-air-freshener"></i> What's New</h4>
        <p>I added onto my previous creative project and implemented a MongoDB backend to store / persist data. Now the blockchain actually persists! Yay!</p>
        <h4><i class="far fa-lightbulb"></i> Idea</h4>
        <p>
        This project is a proof of concept of a business application of blockchain technology. Specifically to the used car industry.
        Imagine if, when buying a used car, you could reliably know who's owned the car in the past, how the car has been driven, and that the car always has
        a comprehensive maintainance log. Implementing blockchain into the peer to peer used car marketplace would help facilitate greater trust and transparency and eradicate market inefficiences.
        </p>
        <h4><i class="fas fa-chalkboard-teacher"></i> How To</h4>
        <p>
        This proof of concept allows you manage a few cars in your inventory found below (both Tesla <i class="fas fa-car"></i>s of course).
        You can transfer ownership or add a new maintainance log.
        The beauty of the proof of concept comes in that, every time you make an action on a car, the corresponding block is written in the
        blockchain found at the top of page automatically. Since this project is written in React, these changes occur seamlessly, without
        the need to refresh the page.
        </p>
        </div>
        <h3 className='mt-3'><i className="fas fa-th"></i> Current Blockchain</h3>
          <div className='container'>
            <div className='row'>
            {
              Object.entries(blockchain.blocks).map(([key, block]) => (
                  <div key={key} className='col-md-6 col-xl-4 mb-3'>
                    <Block block={block} />
                  </div>
              ))
            }
          </div>
        </div>
        <h3 className='mt-3'><i className="fas fa-road"></i> Current Cars</h3>
        {
          Object.entries(cars).map(([key, car]) => (
            <div key={key}>
                <Car
                  car={car}
                  transferOwnership={this.transferOwnership}
                  addMaintenanceLog={this.addMaintenanceLog} />
            </div>
          ))
        }

        <Modal open={transferModalOpen} onClose={this.onToggleTransferModal} center>
          <TransferCarForm
            currentOwner={currentCar.owner}
            performTransfer={this.performTransfer}
            closeModal={this.onToggleTransferModal} />
        </Modal>

        <Modal open={addMaintenanceLogModalOpen} onClose={this.onToggleAddMaintenanceLogModal} center>
          <MaintenanceLogForm
            performAddMaintenanceLog={this.performAddMaintenanceLog}
            closeModal={this.onToggleAddMaintenanceLogModal} />
        </Modal>
      </div>
    );
  }
}

export default App;
