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
    // this.saveBlockchain()
  }

  performAddMaintenanceLog = (type, date, vendor) => {
    console.log('Origial Blockchain:', this.props.blockchain)
    let addMaintenanceLogTransaction = new Transaction('', '', this.state.currentCar, 'addMaintenanceLog', { type, date, vendor })
    let block = this.props.blockchain.getNextBlock([addMaintenanceLogTransaction])
    this.props.blockchain.addBlock(block)
    console.log('Updated Blockchain:', this.props.blockchain)
    this.saveCarData()
    // this.saveBlockchain()
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

  // saveBlockchain = async() => {
  //   var data = JSON.stringify(this.props.blockchain)
  //   console.log(data)
  //   var url = "http://ec2-54-218-255-196.us-west-2.compute.amazonaws.com:4200/blockchain"
  //   fetch(url, {
  //     method: 'post',
  //     headers: {
  //       "Content-Type": "application/json; charset=utf-8",
  //     },
  //     body: data
  //   }).then(function(response) {
  //     console.log('successfully saved data!')
  //   })
  // }

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
