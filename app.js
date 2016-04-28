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
var multer = require('multer');
var url = require('url');

//https://github.com/expressjs/session
app.use(m.expresssession({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

//FILE UPLOAD REQUIREMENTS
app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://localhost");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

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
  },
  {
    path: 'chat',
    method: 'all',
    controller: require('./mongresto-custom-routes/chat.js')
  }
];

// register custom route
var options = {
	 // A function written by you - it gets access to the current question
  // and can deny Mongresto permission to run it
  // permissionToAsk:
    // require('./permissions/toAsk'),

  // A function written by you - it gets access to the current result
  // (and question) and can deny Mongresto permission to return it
  // permissionToAnswer:
    // require('./permissions/toAnswer'),

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

/** Serving from the same express Server
    No cors required */


    var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './uploads/')
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now
            console.log("req", req.session.user._id);
            var strippedFileName = file.originalname.replace(/[\n\t\r\x20]/g, "_");
            //console.log("Uploaded successfully", strippedFileName);
            // cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
            cb(null, strippedFileName);
        }
    });

    var upload = multer({ //multer settings
                      storage: storage
                }).single('file');

    /** API path that will upload the files */
    app.post('/upload', function(req, res) {
        upload(req,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
             res.json({error_code:0,err_desc:null});
        })
    });
    // Handles download file request
    app.get('/uploads/:filename(*)', function( req, res){
      // Get URL path
        var url_parts = url.parse(req.url, true);
        // send back file from server matching inputed name
        res.sendFile(url_parts.path, {root: './'});
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
