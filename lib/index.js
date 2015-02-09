(function(){
  "use strict";

  //var f = require("./markov_file")("examples/us_last_names.txt", 3);
  var f = require("./markov_file")("examples/us_male_first_names.txt",3);

  f.read(function(err, markov){
    if (err) {
      console.log("ERROR! ", err);
    } else {
      console.log(markov.generate(3,10,25));
    }
  });

})();