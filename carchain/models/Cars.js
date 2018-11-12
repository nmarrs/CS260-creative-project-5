var mongoose = require('mongoose');
var CarSchema = new mongoose.Schema({
    VIN: String,
    make: String,
    model: String,
    color: String,
    purchaseDate: String,
    purchasePrice: { type: Number, default: 0 },
    originalPrice: { type: Number, default: 0 },
    owner: String,
    previousOwners: [String],
    mileage: { type: Number, default: 0 },
    maintenanceHistory: []
});
mongoose.model('Car', CarSchema);
