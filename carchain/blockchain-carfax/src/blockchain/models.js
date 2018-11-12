import sha256 from 'js-sha256'

export class Transaction {
  constructor(from, to, asset, type, extraPayload) {
    this.from = from
    this.to = to
    this.asset = asset
    this.type = type
    this.extraPayload = extraPayload
  }
}

export class Block {
  constructor(index = 0, previousHash = '', hash = '', nonce = 0, transactions = []) {
    this.index = index
    this.previousHash = previousHash
    this.hash = hash
    this.nonce = nonce
    this.transactions = transactions
  }

  addTransaction(transaction) {
    this.transactions.push(transaction)

    switch (transaction.type) {
      case 'transferOwnership':
        transaction.asset.transferOwnership(transaction.to, transaction.from)
        break;
      case 'addMaintenanceLog':
        transaction.asset.addMaintenanceLog(transaction.extraPayload)
        break;
      default:
        return
    }
  }

  get key() {
    return JSON.stringify(this.transactions) + this.index + this.previousHash + this.nonce
  }
}

export class Blockchain {
  constructor(genesisBlock) {
    this.blocks = []
    this.addBlock(genesisBlock)
  }

  addBlock(block) {
    if (this.blocks.length === 0) {
      block.previousHash = "0000000000000000"
      block.hash = this.generateHash(block)
    }

    this.blocks.push(block)
  }

  getNextBlock(transactions) {
    let block = new Block()

    transactions.forEach(function(transaction) {
      block.addTransaction(transaction)
    })

    let previousBlock = this.getPreviousBlock()
    block.index = this.blocks.length
    block.previousHash = previousBlock.hash
    block.hash = this.generateHash(block)
    return block
  }

  generateHash(block) {
    let hash = sha256(block.key)

    while (!hash.startsWith('0')) {
      block.nonce += 1
      hash = sha256(block.key)
    }

    return hash
  }

  getPreviousBlock() {
    return this.blocks[this.blocks.length - 1]
  }
}

export class Car {
  constructor(VIN, make, model, color, purchaseDate, purchasePrice, originalPrice, mileage, maintenanceHistory, owner, previousOwners) {
    this.VIN = VIN
    this.make = make
    this.model = model
    this.color = color
    this.purchaseDate = purchaseDate
    this.purchasePrice = purchasePrice
    this.originalPrice = originalPrice
    this.mileage = mileage
    this.maintenanceHistory = maintenanceHistory
    this.owner = owner
    this.previousOwners = previousOwners
  }

  transferOwnership = (to, from) => {
    this.previousOwners.push(from)

    this.owner = to
  }

  addMaintenanceLog = (maintenanceLog) => {
    this.maintenanceHistory.push(maintenanceLog)
  }
}
