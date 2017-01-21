var express = require('express'),
 router = express.Router(),
 request = require("request"),
 app = express();
app.use(express.static(__dirname + "/www"));
app.set('port', process.env.PORT || 5000);

  router.get('/api/events/', function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    var query = require('url').parse(req.url,true).query;

    request('http://api.eventfinda.com.au/v2/events.json?rows=' + query.rows + '&point=' + query.point + '&radius=' + query.radius, {
     headers: {Authorization:'Basic ZXZlbnRhdXM6dGtieDNmZzV6ZjNu'}
    }, function (error, response, body){
      if (!error && response.statusCode == 200){
        res.send(body);
      }
    })
  });

app.use('/',router);
app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});


