const express = require('express');
const { handleGenerateNewShortURl, handleGetAnalytics } = require('../controller/url');

const router = express.Router();

router.post('/', handleGenerateNewShortURl);

router.get('/analytics/:shortId', handleGetAnalytics);
module.exports = router;