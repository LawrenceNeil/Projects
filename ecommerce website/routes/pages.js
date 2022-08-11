const express = require('express');

const { homeCtrlFunction } = require('../controllers/pagesCtrlFile');

const router = express.Router();

router.get('/', homeCtrlFunction);

module.exports = router;