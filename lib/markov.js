(function() {
  "use strict";

  function State(c, index) {
    this.c = c;
    this.index = index;
    this.next = [];
  }

  function Markov(order) {
    this.order = order;
    this.initialState = new State('', 0);
    this.keys = {};
    this.indexKey = 0;
  }

  Markov.prototype.addWord = function(word) {
    // we use only lower case words
    var previousState = this.initialState;
    var key = ""; // used to accumulate up to order previous characters

    word.toLowerCase().split('').forEach(function(c) {
      // we update the key... but we keep its
      // length under the order of the markov chain
      key += c;
      if (key.length > this.order) {
        key = key.substr(1);
      }

      var state = this.keys[key];
      if (!state) {
        this.indexKey += 1;
        state = new State(c, this.indexKey);
        this.keys[key] = state;
      }

      previousState.next.push(state);
      previousState = state;

    }, this);
  };

  function getRandomNextState(state) {
    var index = Math.floor(Math.random() * state.next.length);
    return state.next[index];
  }

  function generateWord(initialState, minLength, maxLength) {
      var currentState = getRandomNextState(initialState);
      var currentWord = "";

      // we check that we have not reached the end of the markov state list and that the
      // word is not getting too long
      while (currentState && (currentWord.length < maxLength)) {
        currentWord += currentState.c;
        currentState = getRandomNextState(currentState);
      }

      // we check that the word is long enough
      if (currentWord.length < minLength) {
        return false;
      }
      return currentWord;
  }

  Markov.prototype.generate = function(minLength, maxLength, nbWords) {
    var result = [];
    for (var i = 0; i < nbWords; i++) {
      // has the generation may not end, we guard with a counter
      for(var repeat = 0; repeat < 10 ; repeat ++) {
        var word = generateWord(this.initialState, minLength, maxLength);
        if (word) {
          result.push(word);
          break;
        }
      }
    }
    return result;
  };


  module.exports = Markov;
})();