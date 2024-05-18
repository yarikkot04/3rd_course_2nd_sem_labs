/* eslint-disable new-cap */
import technologicalCard from '../../models/technologicalCard.js'

export default class Controller {
  static getMainPage(req, res) {
    res.render('index', {
      title: 'Home page',
      isMain: true
    })
  }

  static getAddCardPage(req, res) {
    res.render('addCard', {
      title: 'Add new card',
      cardAddedMessage: req.query.cardAdded,
      isAdd: true
    })
  }

  static async getCardsPage(req, res) {
    const technologicalCards = await technologicalCard.find()
    res.render('cards', {
      title: 'Technological cards',
      technologicalCards,
      isCards: true
    })
  }

  static async createNewCard(req, res) {
    try {
      const { detailName, processTypeName, duration, creationDate, description } = req.body
      const newTechCard = new technologicalCard({
        detailName, processTypeName, duration, creationDate, description
      })
      await newTechCard.save()
      res.redirect('/add?cardAdded=true')
    } catch (e) {
      console.log(e)
    }
  }

  static async getCardById(req, res) {
    const selectedTechCard = await technologicalCard.findById(req.params.id)
    res.render('techCard', {
      title: 'Tech card',
      selectedTechCard,
      isTechCard: true
    })
  }

  static async getEditCardPage(req, res) {
    const selectedTechCard = await technologicalCard.findById(req.params.id)
    const dateToStr = formatDate(selectedTechCard.creationDate)
    res.render('editCard', {
      title: 'Edit card',
      selectedTechCard,
      dateToStr,
      isEdit: true
    })

    function formatDate(date) {
      const d = new Date(date)
      const year = d.getFullYear()
      let month = '' + (d.getMonth() + 1)
      let day = '' + d.getDate()
      if (month.length < 2) {
        month = '0' + month
      }
      if (day.length < 2) {
        day = '0' + day
      }
      return [year, month, day].join('-')
    }
  }

  static async editCard(req, res) {
    try {
      const cardId = req.params.id
      delete req.body.cardId
      await technologicalCard.findByIdAndUpdate(cardId, req.body)
      res.json({ status: 0, cardId })
    } catch (e) {
      res.status(500).json({ status: 1, error: e })
    }
  }

  static async getDeleteCardPage(req, res) {
    res.render('deleteCard', {
      title: 'Delete card',
      layout: 'deleteConfirm',
      cardId: req.params.id,
      isDelete: true
    })
  }

  static async deleteCard(req, res) {
    try {
      const cardId = req.params.id
      await technologicalCard.findByIdAndDelete(cardId)
      res.json({ status: 0 })
    } catch (e) {
      res.status(500).json({ status: 1, error: e })
    }
  }

  static async getCardInfoJSON(req, res) {
    const cardId = req.params.id
    const selectedCard = await technologicalCard.findById(cardId)
    res.json(selectedCard)
  }

  static async getAllInfoJSON(req, res) {
    const cards = await technologicalCard.find()
    res.json(cards)
  }
}
