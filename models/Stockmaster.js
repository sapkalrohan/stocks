const mongoose = require('mongoose')

const stockmasterSchema = new mongoose.Schema(
  {
    symbol: String,
    value: Number
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)
const Stockmaster = mongoose.model('Stockmaster', stockmasterSchema)
module.exports = Stockmaster
