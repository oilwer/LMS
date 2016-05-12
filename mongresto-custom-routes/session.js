module.exports = function(mongoose) {
  var sha1 = require('sha1');

  return [function (req, res) {
    // check if logged in
    if (req.method == 'GET') {
      res.json(req.session);
      return req.session;
    }
    // Update session
    else if (req.method == 'PUT') {

      var User = mongoose.model('User');

      // if missing params
      if (!req.body.email) {
        res.json(false);
        return;
      }

      if(req.session.user.email != req.body.email)
      {
        res.json(false);
        return;
      }

      // if we are logging in
      // ALWAYS (ALWAYS!!!) encrypt passwords
      var password = req.session.user.password;



      console.log(req.session.user.password);

      User
        .findOne({email: req.body.email, password: password}, function(err, found) {
        if (err || !found) {
          // we failed to find or run query
          res.json(false);
          return;
        }

        // we found a user!
        // create session?
        req.session.user = found;
        res.json(req.session.user);
        return req.session.user;

      });
    }

  }];
};
