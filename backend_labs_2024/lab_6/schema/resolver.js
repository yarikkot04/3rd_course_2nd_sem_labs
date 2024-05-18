import techCards from '../models/techCards.js'
import processingTypes from '../models/processingTypes.js'
import details from '../models/details.js'

const resolvers = {
  Query: {
    getTechCardById: async (_, { id }) => {
      return await techCards.findById(id)
    },
    getProcTypeById: async (_, { id }) => {
      return await processingTypes.findById(id)
    },
    getDetailById: async (_, { id }) => {
      return await details.findById(id)
    },
    getAllTechCards: async () => {
      return await techCards.find()
    },
    getAllProcTypes: async () => {
      return await processingTypes.find()
    },
    getAllDetails: async () => {
      return await details.find()
    }
  },
  Mutation: {
    addTechCard: async (_, { techCard: { detail_ID, procType_ID, duration, creationDate, description } }) => {
      const date = creationDate || new Date(Date.now())
      try {
        const newTechCard = new techCards({
          detail_ID,
          procType_ID,
          duration,
          creationDate: date,
          description
        })
        await newTechCard.save()
        return await techCards.find()
      } catch (err) {
        throw new Error(err)
      }
    },
    addDetail: async (_, { detail: { name, description } }) => {
      try {
        const newDetail = new details({
          name,
          description
        })
        await newDetail.save()
        return await details.find()
      } catch (err) {
        throw new Error(err)
      }
    },
    addProcType: async (_, { procType: { name, description } }) => {
      try {
        const newProcType = new processingTypes({
          name,
          description
        })
        await newProcType.save()
        return await processingTypes.find()
      } catch (err) {
        throw new Error(err)
      }
    },
    updateTechCard: async (_, { id, body }) => {
      try {
        await techCards.findByIdAndUpdate(id, body)
        return techCards.findById(id)
      } catch (err) {
        throw new Error(err)
      }
    },
    updateProcType: async (_, { id, body }) => {
      try {
        await processingTypes.findByIdAndUpdate(id, body)
        return processingTypes.findById(id)
      } catch (err) {
        throw new Error(err)
      }
    },
    updateDetail: async (_, { id, body }) => {
      try {
        await details.findByIdAndUpdate(id, body)
        return details.findById(id)
      } catch (err) {
        throw new Error(err)
      }
    },
    deleteTechCard: async (_, { id }) => {
      await techCards.findByIdAndDelete(id)
      return await techCards.find()
    },
    deleteProcType: async (_, { id }) => {
      await processingTypes.findByIdAndDelete(id)
      return await processingTypes.find()
    },
    deleteDetail: async (_, { id }) => {
      await details.findByIdAndDelete(id)
      return await details.find()
    }
  },
  TechCard: {
    detail_ID: async (parent) => await details.findById(parent.detail_ID),
    procType_ID: async (parent) => await processingTypes.findById(parent.procType_ID)
  }
}

export default resolvers
