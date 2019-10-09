const ProductHero = require('../models/product-hero')

exports.createHero = (req, res, next) => {
  const productData = req.body

  const productHero = new ProductHero(productData)
  productHero.product = productData.product

  productHero.save((errors, createdHero) => {
    if (errors) {
      return res.status(422).send(errors)
    }

    return res.json(createdHero)
  })
}

exports.getProductHeroes = (req, res, next) => {
  ProductHero.find({})
    .populate('product')
    .sort({ createdAt: -1 })
    .exec((errors, heroes) => {
      if (errors) {
        return res.status(422).send(errors)
      }

      return res.json(heroes)
    })
}

exports.updateProductHeroes = (req, res, next) => {
  const id = req.params.id

  ProductHero.findById(id)
    .populate('product')
    .exec((errors, hero) => {
      if (errors) {
        return res.status(422).send(errors)
      }

      hero.set({ createdAt: new Date() })
      hero.save((errors, updatedHero) => {
        if (errors) {
          return res.status(422).send(errors)
        }

        return res.json(updatedHero)
      })
    })
}
