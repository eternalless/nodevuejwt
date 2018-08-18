import express from 'express'
import indexMode from '../models'
let router = express.Router()
router
  .get('/', (req, res, next) => {
    indexMode.getData(function (data) {
      res.json(data)
    })
  })
  .put('/', (req, res, next) => {
    res.json({
      code:200,
      data: 'put'
    })
  })

export default router