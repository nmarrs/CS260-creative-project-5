import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TransferCarForm extends Component {
  static propTypes = {
    currentOwner: PropTypes.string,
    performTransfer: PropTypes.func.isRequired,
    closeModal: PropTypes.func
  }

  state = {
    newOwner: ''
  }

  handleNewOwnerInputChange = (event) => {
    this.setState({newOwner: event.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()

    if (this.state.newOwner === '') {
      window.alert('Error, must enter new owner.')
      return
    }

    this.props.performTransfer(this.props.currentOwner, this.state.newOwner)

    this.props.closeModal()
  }

  render() {
    const {
      currentOwner
    } = this.props

    return (
      <div>
        <h3 className='m-3'><i className="fas fa-exchange-alt"></i> Transfer car to a new owner</h3>
        <form>
          <div className='form-group'>
            <label htmlFor='currentOwner'><i className="fas fa-user"></i> Current Owner</label>
            <input className='form-control' id='currentOwnerInput' value={currentOwner ? currentOwner : 'Error occurred'} disabled />
          </div>
          <div className='form-group'>
            <label htmlFor='newOwner'><i className="far fa-user"></i> New Owner</label>
            <input className='form-control' id='newOwnerInput' onChange={this.handleNewOwnerInputChange} />
          </div>
          <button type='submit' className='btn btn-primary' onClick={this.handleSubmit}><i className="fas fa-check"></i> Submit</button>
        </form>
      </div>
    )
  }
}

export default TransferCarForm
