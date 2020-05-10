const mongoose = require('mongoose')

const assetSchema = new mongoose.Schema(
  {
    stock: { type: mongoose.Schema.Types.ObjectId, ref: 'Stockmaster' },
    quantity: Number,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)
assetSchema.virtual('totalvalue').get(function() {
  return (this.stock.value * this.quantity).toFixed(2)
})
const Asset = mongoose.model('Asset', assetSchema)
module.exports = Asset
