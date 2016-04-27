module.exports = function(mongoose) {

  return [function (req, res) {
    // check if logged in
    if (req.method == 'GET') {
      res.json(req.session);
      return req.session;
    }

  }];
};
