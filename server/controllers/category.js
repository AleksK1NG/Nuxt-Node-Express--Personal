const Category = require('../models/category')

exports.getCategories = (req, res) => {
  Category.find({}).exec((errors, categories) => {
    if (errors) {
      return res.status(422).send(errors)
    }

    return res.json(categories)
  })
}
