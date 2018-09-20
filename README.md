# Data Mining
Alogrithms relate to Data Mining.

Algorthms: TF.IDF, K-Mean, HAC...

# Install
Run command line to install in NodeJS.
```PowerShell
npm install data-harness --save
```
# TF-IDF
Term freqency & Iverse Document Frequency.
```node
var TfIdf = require('data-harness').TfIdf;
var tfidf = new TfIdf();

// add documents
tfidf.addDoc("I am Java developer");
tfidf.addDoc("I need time for a developer a project about data-mining");

// show results
var rs_idf = tfidf.tf("developer");
var rs_tfidf = tfidf.tfidf("developer");

console.log(rs_idf);
console.log(rs_tfidf);
```
