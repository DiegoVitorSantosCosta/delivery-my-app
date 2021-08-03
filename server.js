const http = require('http')
const app = require('./app')
const port = process.env.PORT || 8000;
const server = http.createServer(app)
server.listen(port, () => {
    console.log("App is running on port " + port);
});

app.use(function(req, res, next) {
    var reqType = req.headers["x-forwarded-proto"];
    reqType == 'https' ? next() : res.redirect("https://" + req.headers.host + req.url);
});
// server.listen(port)