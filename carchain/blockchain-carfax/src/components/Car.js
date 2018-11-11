import React, { Component } from 'react'
import PropTypes from 'prop-types'

import '../styles/Car.css'
import roadster from '../images/roadster.jpg';
import modelS from '../images/modelS.jpg';

class Car extends Component {
  static propTypes = {
    car: PropTypes.object.isRequired,
    transferOwnership: PropTypes.func.isRequired,
    addMaintenanceLog: PropTypes.func.isRequired
  }

  render() {
    const {
      car,
      transferOwnership,
      addMaintenanceLog
    } = this.props

    let image
    if (car.model === 'Roadster') {
      image = roadster
    } else {
      image = modelS
    }

    return (
      <div className="card shadow font-title mb-5 ml-5 mr-5 car-card mx-auto">
      <div className="card-body">
        <img src={image} className='img-fluid mb-3 shadow' alt='Car' />
        <h3 className="text-dark-blue card-title"><i className="fas fa-car"></i> { car.model }</h3>
        <table className='table table-hover'>
          <tbody>
            <tr>
              <th><i className="fas fa-dollar-sign"></i> Price</th>
              <td>${car.purchasePrice}</td>
            </tr>
            <tr>
              <th><i className="fas fa-id-card"></i> VIN</th>
              <td>{car.VIN}</td>
            </tr>
            <tr>
              <th><i className="fas fa-box-open"></i> Make</th>
              <td>{car.make}</td>
            </tr>
            <tr>
              <th><i className="fas fa-car-side"></i> Model</th>
              <td>{car.model}</td>
            </tr>
            <tr>
              <th><i className="fas fa-palette"></i> Color</th>
              <td>{car.color}</td>
            </tr>
            <tr>
              <th><i className="fas fa-tachometer-alt"></i> Mileage</th>
              <td>{car.mileage}</td>
            </tr>
            <tr>
              <th><i className="fas fa-user"></i> Owner</th>
              <td>{car.owner}</td>
            </tr>
            <tr>
              <th><i className="fas fa-users"></i> Previous Owners</th>
              <td>{ car.previousOwners
                  ? car.previousOwners + ' '
                  : '' }</td>
            </tr>
            <tr>
              <th><i className="fas fa-wrench"></i> Maintenance History</th>
              <td>
                  { Object.entries(car.maintenanceHistory).map(([key, log]) => (
                      <li key={key} data-toggle='tooltip' title={`Work completed by ${log.vendor}`}>{log.type} -- {log.date}</li>
                  )) }
              </td>
            </tr>
            <tr>
              <th><i className="fas fa-edit"></i> Actions</th>
              <td>
                <button className='btn btn-primary mr-3 mt-1' onClick={() => transferOwnership(car)}><i className="fas fa-exchange-alt"></i> Transfer</button>
                <button className='btn btn-warning ml-3 mt-1' onClick={() => addMaintenanceLog(car)}><i className="fas fa-sticky-note"></i> Add Maintenance Log</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    );
  }
}

export default Car;
