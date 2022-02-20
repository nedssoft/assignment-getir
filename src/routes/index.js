const Router = require('express').Router;
const RecordController = require('../controllers/RecordController');

const router = new Router();

const { getRecords } = new RecordController();
router.get('/', (req, res) => {
  res.send({ status: 'success', message: 'Welcome to the API' });
});

router.post('/records', getRecords);
module.exports = router;
