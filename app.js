// Require modules
var m = {};
[
  "express",
  "path",
  "serve-favicon",
  "cookie-parser",
  "body-parser",
  "express-session",
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
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true }
}));


// Initialize our own REST api - mongresto
var customRoutes = [
  {
    path: 'login',
    method: 'all',
    controller: require('./mongresto-custom-routes/login.js')
  }
];

// register custom route
var options = {
  customRoutes: customRoutes
};

m.mongresto.init(app, options);

app.get('/apidoc/', function (req, res) {
  res.sendFile('templates/apidocumentation.html', {root: './www'});
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