import { model, Schema } from 'mongoose'

const technologicalCardSchema = new Schema({
  detailName: {
    type: String,
    required: true
  },
  processTypeName: {
    type: String,
    required: true
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

export default model('technologicalCard', technologicalCardSchema)
