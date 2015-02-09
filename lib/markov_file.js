(function() {
  "use strict";

  var fs = require('fs');
  var readline = require('readline');


  function MarkovFile(inputFile, order) {
    this.inputFile = inputFile;
    this.order = order;
    var Markov = require("./markov");
    this.markov = new Markov(order);
  }

  MarkovFile.prototype.read = function(done) {
    var self = this;
    var rd = readline.createInterface({
      input: fs.createReadStream(self.inputFile),
      output: process.stdout,
      terminal: false
    });

    rd.on('line', function(line) {
      console.log(line);
      self.markov.addWord(line);
    });

    rd.on('close', function() {
      done(undefined, self.markov);
    });
  };

  module.exports = function(inputFile, resultFile, order) {
    return new MarkovFile(inputFile, resultFile, order);
  };
})();