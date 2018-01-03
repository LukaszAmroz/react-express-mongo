const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

router.route('/user')
  .get((req, res) => {
    res.json({firstName: 'John', lastName: 'Doe'})
  })
  .post(async (req, res) => {
    try {
      const user = await new mongoose.models.Users(req.body).save()
      res.json(user)
    } catch (e) {
      console.log(e)
      res.end()
    }
  })

module.exports = router
