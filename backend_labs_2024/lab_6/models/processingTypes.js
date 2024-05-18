import { Schema, model } from 'mongoose'

const procTypesSchema = new Schema({
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

export default model('procTypes', procTypesSchema)
