/**
 * Checks is date conforms to format YYYY-MM-DD
 * @param {string} dateString
 * @returns boolean
 */
 const isValidDateFormat = (dateString) => {
  const regex = new RegExp(/^\d{4}-\d{2}-\d{2}$/);
  return regex.test(dateString);
};

const validateRequest = (req, res, next) => {
  const { startDate, endDate, minCount, maxCount } = req.body;
  if (!startDate || !endDate || !minCount || !maxCount) {
    return next({
      code: 422,
      msg: 'Request payload missing required field',
    });
  }
  if (!isValidDateFormat(startDate) || !isValidDateFormat(endDate)) {
    return next({
      code: 422,
      msg: 'startDate and endDate must be of the format YYYY-MM-DD',
    });
  }
  if (new Date(endDate) < new Date(startDate)) {
    return next({
      code: 422,
      msg: 'endDate cannot be less than startDate',
    });
  }
  if (!Number(minCount) || !Number(maxCount)) {
    return next({
      code: 422,
      msg: 'minCount and maxCount must be a number',
    });
  }
  if (Number(maxCount) < Number(minCount)) {
    return next({
      code: 422,
      msg: 'maxCount must be greater than minCount',
    });
  }
  return next();
};

module.exports = {
  validateRequest,
};
