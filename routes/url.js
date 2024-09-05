const express = require('express')
const {generateShortid} = require('../controllers/url')

const router = express.Router()

router.post('/', generateShortid)


module.exports = router;