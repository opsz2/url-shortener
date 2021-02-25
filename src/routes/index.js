const express = require('express');
const { validate } = require('../middlewares');
const { shortenUrl } = require('../validations');
const { generateShortUrlController, routeShortUrlController } = require('../controllers');

const router = express.Router();

router.route('/').post(validate(shortenUrl), generateShortUrlController);

router.route('/:urlCode').get(routeShortUrlController);

router.get('/', (req, res) => res.send('URL shortener API is healthy'));

module.exports = router;
