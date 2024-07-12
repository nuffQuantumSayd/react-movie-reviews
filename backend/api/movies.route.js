import express from 'express'
import MoviesController from '../dao/movies.controller.js'

//get access to express router
const router = express.Router()

router.route('/').get(MoviesController.apiGetMovies)

export default router 