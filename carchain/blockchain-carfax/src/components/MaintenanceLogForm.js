import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import 'react-datepicker/dist/react-datepicker.css'

class MaintenanceLogForm extends Component {
  static propTypes = {
    performAddMaintenanceLog: PropTypes.func.isRequired,
    closeModal: PropTypes.func
  }

  state = {
    type: '',
    date: moment(),
    vendor: ''
  }

  handleTypeInputChange = (event) => {
    this.setState({type: event.target.value})
  }

  handleDateInputChange = (date) => {
    this.setState({date: date})
  }

  handleVendorInputChange = (event) => {
    this.setState({vendor: event.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const {
      type,
      date,
      vendor
    } = this.state

    if (type === '' || vendor === '' || date === '') {
      window.alert('Error, must enter maintenance log data.')
      return
    }

    let cleanedDate = moment(date).format('MM/DD/YYYY')

    this.props.performAddMaintenanceLog(type, cleanedDate, vendor)
    this.props.closeModal()
  }

  render() {
    const { date } = this.state

    return (
      <div>
        <h3 className='m-3'><i className="fas fa-sticky-note"></i> Add new maintenance log</h3>
        <form>
          <div className='form-group'>
            <label htmlFor='typeMaintenance'><i className="fas fa-charging-station"></i> Type of Maintenance</label>
            <input className='form-control' id='typeMaintenanceInput' onChange={this.handleTypeInputChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='datePicker'><i className="fas fa-calendar-alt"></i> Select Date</label>
            <DatePicker
              selected={date}
              onChange={this.handleDateInputChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='vendor'><i className="fas fa-warehouse"></i> Vendor</label>
            <input className='form-control' id='vendorInput' onChange={this.handleVendorInputChange} />
          </div>
          <button type='submit' className='btn btn-primary' onClick={this.handleSubmit}><i className="fas fa-check"></i> Submit</button>
        </form>
      </div>
    )
  }
}

export default MaintenanceLogForm
