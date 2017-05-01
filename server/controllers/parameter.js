"use strict"

const _ = require("lodash")
const mongoose = require("mongoose")

const Parameters = mongoose.model("Parameter")

/**
 * Get all parameters
 */
exports.getAllParameters = (req, res) => {
  Parameters.find()
    .then((parameters, err) => {
      if (err) {
        res.status(400).json(err)
      } else {
        res.jsonp(parameters)
      }
    })
}

/**
 * Create parameters
 */
exports.create = (parameter) => {
  return new Parameters(parameter).save()
}

/**
 * Update parameters
 */
exports.update = (req, res) => {
  let parameters = new Parameters(req.parameters)
  parameters = _.extend(parameters, req.body)
  Parameters.update({_id: parameters._id}, {
    $set: {
      articleCategories: parameters.articleCategories,
    },
  }, (err) => {
    if (err) {
      console.warn("err: " + err)
    } else {
      res.jsonp({
        message: "Parameter update",
      })
    }
  })
}
