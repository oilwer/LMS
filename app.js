// Require modules
var m = {};
[
  "express",
  "path",
  "serve-favicon",
  "cookie-parser",
  "body-parser",
  "express-session",
  "nodemailer",
  "./mongresto"
].forEach(function(x){
  // store required modules in m
  m[x.replace(/\W/g,'')] = require(x);
});

// Standard Express boiler plate code
var app = m.express();
//app.use(favicon(__dirname + '/www/favicon.ico'));
app.use(m.bodyparser.json());
app.use(m.bodyparser.urlencoded({ extended: false }));
app.use(m.cookieparser());
app.use(m.express.static(m.path.join(__dirname, 'www')));

//https://github.com/expressjs/session
app.use(m.expresssession({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));


// Initialize our own REST api - mongresto
var customRoutes = [
  {
    path: 'login',
    method: 'all',
    controller: require('./mongresto-custom-routes/login.js')
    },
    {
    path: 'resetpassword',
    method: 'all',
    controller: require('./mongresto-custom-routes/resetPassword.js')
  },
  {
    path: 'session',
    method: 'get',
    controller: require('./mongresto-custom-routes/session.js')
  }
];

// register custom route
var options = {
	 // A function written by you - it gets access to the current question
  // and can deny Mongresto permission to run it
  permissionToAsk:
    require('./permissions/toAsk'),

  // A function written by you - it gets access to the current result
  // (and question) and can deny Mongresto permission to return it
  permissionToAnswer:
    require('./permissions/toAnswer'),
    
  customRoutes: customRoutes
};

m.mongresto.init(app, options);

app.get('/apidoc/', function (req, res) {
  res.sendFile('templates/apidocumentation.html', {root: './www'});
});

app.get('/login/', function (req, res) {
  res.sendFile('templates/login.html', {root: './www'});
});
app.get('/forgotPassword/', function (req, res) {
  res.sendFile('templates/forgotPassword.html', {root: './www'});
});

// Route everything "else" (not "/api/**/*") to angular (in html5mode)
app.get('*', function (req, res) {
  res.sendFile('index.html', {root: './www'});
});

// Start up
var port = 3000;
app.listen(port, function(){
  console.log("Express server listening on port " + port);
});
