const Router = require('express').Router;
const RecordController = require('../controllers/RecordController');
const { validateRequest } = require('../middleware');
const router = new Router();

const { getRecords } = new RecordController();
router.get('/', (req, res) => {
  res.send({ status: 'success', message: 'Welcome to the API' });
});

router.post('/records', validateRequest, getRecords);
module.exports = router;
