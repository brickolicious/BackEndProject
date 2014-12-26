var request = require('superagent');
var expect = require('expect.js');

describe('Test homepage', function(){
    it (function(done){
        request.get('localhost:8080').end(function(res){
            expect(res).to.exist;
            expect(res.status).to.equal(200);
            done();
        });
    });
});

