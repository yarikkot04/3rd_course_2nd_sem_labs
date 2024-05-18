import { Schema, model } from 'mongoose'

const detailSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  }
})

export default model('details', detailSchema)
