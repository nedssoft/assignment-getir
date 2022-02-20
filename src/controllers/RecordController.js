const getCollection = require('../db');

class RecordController {
  /**
   * Get records filtered with request payload
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  async getRecords(req, res, next) {
    try {
      const { startDate, endDate, minCount, maxCount } = req.body;
      const collection = await getCollection('records');
      const records = await collection
        .aggregate([
          {
            $project: {
              _id: 0,
              key: 1,
              createdAt: 1,
              totalCount: { $sum: '$counts' },
            },
          },
          {
            $match: {
              totalCount: {
                $gte: Number(minCount),
                $lte: Number(maxCount),
              },
              createdAt: {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
              },
            },
          },
        ])
        .toArray();
      res.send({
        code: 0,
        msg: 'Success',
        records,
      });
    } catch (err) {
      next({ code: 500, msg: err.message });
    }
  }
}

module.exports = RecordController;
