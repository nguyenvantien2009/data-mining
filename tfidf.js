const cTable = require('console.table');
const _ = require('underscore');

/**
 * Term Frequency / Inverse Document Frequency. 
 * TF.IDF can add documents and get result TF.IDF.
 * 
 * @author Tien Nguyen
 */
var TfIdf = function() {
    this.docs = [];
    this.wordCount = {};
}

/**
 * Split words in text/paragraph text.
 * @param {String} txt 
 * @returns {Array}
 */
TfIdf.prototype.tokenization = function(txt) {
    return txt.split(/\s/g);
}

/**
 * Clean special character 
 * @param {String} txt 
 */
TfIdf.prototype.clean = function(txt) {
    return str.replace(/\.\,/, "");
}

/**
 * Add document for document list and split words.
 * @param {String} txt 
 */
TfIdf.prototype.addDoc = function(txt) {
    // clean symbol special charator.
    str = this.clean(txt);

    // words
    var words = {};
    var tokenization = this.tokenization(txt);

    tokenization.forEach(it => {
        words[it] = words[it] || { count: 0, tf: 0 };
        words[it].count++;
        words[it].tf = words[it].count / tokenization.length;
        words[it].tf_text = words[it].count + "/" + tokenization.length;

        // only increase for first words
        if (words[it].count === 1) {
            this.wordCount[it] = this.wordCount[it] || 0;
            this.wordCount[it]++;
        }
    })

    // push to documents.
    this.docs.push({ text: str, words: words });
}

/**
 * Inverse Document Frequency of words.
 * @param {String} word 
 */
TfIdf.prototype.idf = function(word) {
    var count = this.wordCount[word] || 0;
    return {
        text: "1 + log(" + this.docs.length + "/(" + count + " + 1))",
        value: 1 + Math.log10(this.docs.length / (count + 1))
    }
}

TfIdf.prototype.tfidf = function(txt) {
    var str = this.clean(txt);
    var tokenization = str.split(" ");

    var result = {};

    tokenization.forEach(it => {
        result[it] = {};
        this.docs.forEach((d, i) => {
            var tf = d.words[it] === undefined ? 0 : d.words[it].tf;
            var tf_text = d.words[it] === undefined ? "-" : d.words[it].tf_text;
            var idf = this.idf(it);
            var tfidf = tf * idf.value;
            result[it]['doc-' + i] = {
                tf: tf,
                tf_text: tf_text,
                idf: idf.value,
                tfidf_text: idf.text,
                tfidf: tfidf
            };
        })
    })

    return result;
}

/**
 * Exports TF.IDF
 */
module.exports = TfIdf;

// var a = new TfIdf();
// a.addDoc("nhà cấp 4 cần bán nhanh, di chuyển quận 1 trong 5 phút.");
// a.addDoc("bán nhà ở hồ chí minh giá 500 triệu.");
// a.addDoc("cần mua nhà ở quận 1 diện tích 80m2 giấy tờ hợp lệ.");
// a.addDoc("bán đất nông nghiệp ở hóc môn.");
// a.addDoc("nhà ở hóc môn nên bán nhà ở quận 1 vì không người trong coi.");
// a.addDoc("cho thuê đất giá rẻ ở quận 12, diện tích 12m2.");
// // console.log(JSON.stringify(a.tfidf("cần bán nhà ở quận 1"), null, 4));
// var rs = a.tfidf("cần bán nhà ở quận 1");

// var table = [];
// var totals = {};
// _.keys(rs).forEach(k => {
//     var cs = { key: k };
//     _.keys(rs[k]).forEach(ks => {
//         cs[[ks]] = Math.round(rs[k][ks].tfidf * 100000) / 100000;
//         totals[[ks]] = totals[[ks]] || 0;
//         totals[[ks]] = Math.round((totals[[ks]] + cs[[ks]]) * 100000) / 100000;
//     })
//     table.push(cs);
// })
// table.push(_.extend({ key: 'TOTAL' }, totals));


// console.table(table);