import { Schema, model } from 'mongoose'

const techCardsSchema = new Schema({
  detail_ID: {
    type: Schema.Types.ObjectId,
    ref: 'details',
    required: true
  },
  procType_ID: {
    type: Schema.Types.ObjectId,
    ref: 'procTypes'
  },
  duration: {
    type: Number,
    required: true
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    required: true
  }
})

export default model('techCards', techCardsSchema)
