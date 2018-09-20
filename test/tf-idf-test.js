var expect = require("chai").expect;
var TfIdf = require('../lib/tf-idf').TfIdf;

describe('TF-IDF', function() {
    describe('#IDF', function() {
        var tfidf = new TfIdf();
        tfidf.addDoc("I need test tf-idf");
        it('tf(`need`) should is 0.6989700043360187', function() {
            var param = tfidf.idf('need');
            console.log(JSON.stringify(param, null, 4))
            expect(0.6989700043360187).to.equal(param.value);
        });
    });
});