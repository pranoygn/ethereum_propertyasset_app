// Import libraries
var Web3            = require('web3'),
    contract        = require("truffle-contract"),
    path            = require('path')
    filehash_artifact  = require(path.join(__dirname, 'build/contracts/PropertyAssetHash.json')),
    express = require('express'),
    fs = require('fs'),
    ejs = require('ejs'),
    app = express(),
    path    = require("path");

app.get('/blockchain', function (req, res) {
   // Prepare output in JSON format
   response = {
      asset_id: req.query.asset_id
   };

   console.log(response.asset_id);

    // Setup RPC connection   
    var provider = new Web3.providers.HttpProvider("http://localhost:8545");

    // Read JSON and attach RPC connection (Provider)
    var PropertyAssetHash = contract(filehash_artifact);
    PropertyAssetHash.setProvider(provider);

    // Use Truffle as usual
    PropertyAssetHash.deployed().then(function(instance) {
        return instance.getHash.call(response.asset_id)

    }).then(function(result) {
        console.log(result);
	
	//since we are in a request handler function
  	//we're using readFile instead of readFileSync
  	fs.readFile('PropertyAssetHash.html', 'utf-8', function(err, content) {
    	    if (err) {
      	        res.end('error occurred');
      	        return;
    	    }

    	    var renderedHtml = ejs.render(content, {hash: result, asset_id: response.asset_id});  //get redered HTML code
    	    res.end(renderedHtml);
        });
    }, function(error) {
        console.log(error);
    }); 

});

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
});
