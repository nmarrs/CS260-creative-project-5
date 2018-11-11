import React, { Component } from 'react'
import PropTypes from 'prop-types'

import '../styles/Block.css'

class Block extends Component {
  static propTypes = {
    block: PropTypes.object.isRequired
  }

  render() {
    const {
      block
    } = this.props

    let shortHash = block.hash.substring(0, 8)
    let shortPrevHash = block.previousHash.substring(0, 8)

    let transaction = block.transactions
    let transactionType = ''
    if (transaction.length > 0) {
      if (transaction[0].type === 'transferOwnership') {
        transactionType = 'Transfer Ownership'
        var transferOwnershipJSX = (
          <tbody>
          <tr>
            <th>Type</th>
            <td>{transactionType}</td>
          </tr>
          <tr>
            <th>To</th>
            <td>{transaction[0].to}</td>
          </tr>
          <tr>
            <th>From</th>
            <td>{transaction[0].from}</td>
          </tr>
        </tbody>
        )
      } else {
        transactionType = 'Add Maintenance Log'
        var addMaintenanceLogJSX = (
          <tbody>
          <tr>
            <th>Type</th>
            <td>{transactionType}</td>
          </tr>
          <tr>
            <th>Service Type</th>
            <td>{transaction[0].extraPayload.type}</td>
          </tr>
          <tr>
            <th>Service Date</th>
            <td>{transaction[0].extraPayload.date}</td>
          </tr>
          <tr>
            <th>Service Vendor</th>
            <td>{transaction[0].extraPayload.vendor}</td>
          </tr>
        </tbody>
        )
      }
    } else {
      transactionType = 'Add Genesis Block'
      var addGenesisBlockJSX = (
        <tbody>
        <tr>
          <th>Type</th>
          <td>{transactionType}</td>
        </tr>
      </tbody>
      )
    }

    return (
      <div className="card shadow font-title mb-3 block-card">
        <div className="card-body">
          <h3 className="card-title"><i className="fas fa-file-contract"></i> Block {block.index + 1}</h3>
            <table className='table table-hover'>
              <tbody>
                <tr>
                  <th><i className="fas fa-hashtag"></i> Hash</th>
                  <td>{shortHash}...</td>
                </tr>
                <tr>
                  <th><i className="fab fa-slack-hash"></i> Previous Hash</th>
                  <td>{shortPrevHash}...</td>
                </tr>
                <tr>
                  <th><i className="fab fa-draft2digital"></i> Nonce</th>
                  <td>{block.nonce}</td>
                </tr>
                <tr>
                  <th><i className="far fa-file-alt"></i> Transaction</th>
                  <td>
                    <table>
                      { transactionType !== 'Add Genesis Block'
                      ? transactionType === 'Transfer Ownership'
                      ? transferOwnershipJSX
                      : addMaintenanceLogJSX
                      : addGenesisBlockJSX
                    }

                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
        </div>
      </div>
    )
  }
}

export default Block;
