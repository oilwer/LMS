module.exports = function(mongoose) {
  var sha1 = require('sha1');

  return [function (req, res) {
    var User = mongoose.model('user');
    
    // check if logged in
    if (req.method == 'GET') {
      res.json(!!req.session.user);
      return;
    }

    if (req.method == 'POST') {
      // if missing params
      if (!req.body.email || !req.body.password) {
        res.json(false);
        return;
      }

      // if we are logging in
      // ALWAYS (ALWAYS!!!) encrypt passwords
      var passCrypt = sha1(req.body.password);

      // http://mongoosejs.com/docs/queries.html
      User
        .findOne({email: req.body.email, password: passCrypt}, function(err, found) {
        if (err || !found) {
          // we failed to find or run query
          res.json(false);
          return;
        }

        // we found a user!
        // create session?
        req.session.user = found;
        res.json(true);
      });
    }

    // logout
    if (req.method == 'DELETE') {
      req.session.destroy();
      res.json(true);
    }
  }];
};