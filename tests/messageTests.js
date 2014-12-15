
/*-- unit testing op basis van assert en should module ----*/

var assert = require("assert");
var http = require('http');
var should = require('should');

var opts = {
    host: '127.0.0.1',
    port: process.env.PORT || 8080,
    path: '/send', // zorgt voor verzenden
    method: 'GET'
    //headers: { 'content-type': 'application/x-www-form-urlencoded' }
}

// Set up the request op basis vd post opties 
var req = http.request(opts, function (res) {
    res.setEncoding('utf8');

    var result = "";
    res.on('data', function (d) {
        console.log(d);
        result += d;
    });

    res.on('end', function (err) {
        try {
            assert.strictEqual(JSON.stringify(JSON.parse(result)),
                '{"status":"ok","message":"Message test"}' ,
                "fout bij messageTests data type");
        }
        catch (err) {
            console.log("Assertion error " , err);
        }

        if (err) {
            throw err;
        }
        //na import van should.js:
        ////console.log(res.statusCode)
        this.statusCode.should.match(200);
        JSON.parse(result).should.have.property("status");
    });
});

req.write("message=Message test"); //post data
req.end();