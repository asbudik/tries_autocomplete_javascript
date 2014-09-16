
Trie = function(value){
  this.characters = {};
  this.value = value || "";
};

Trie.prototype.learn = function(word, index){
  // This function should add the given word,
  // starting from the given index,
  // to this Trie.

  // It will be recursive.  It will tell
  // the correct child of this Trie to learn the word
  // starting from a later index.

  // Consider what the learn function should do
  // when it reaches the end of the word?
  // A word does not necessarily end at a leaf.
  // You must mark nodes which are the ends of words,
  // so that the words can be reconstructed later.

  if (!index) {
    index = 0;
  }
  if (word[index]) {
    if (!this.characters[word[index]]) {
      this.characters[word[index]] = new Trie(word[index]);
      this.characters[word[index]].learn(word, index + 1);
    } else {
      this.characters[word[index]].learn(word, index + 1)
    }
  } else {
    this.isWord = true;
  }
};

Trie.prototype.isEmpty = function() {
  return this.characters === {} && this.value === "";
}

Trie.prototype.getWords = function(prefix){
  // This function will return all the words which are
  // contained in this Trie.
  // it will use currentWord as a prefix,
  // since a Trie doesn't know about its parents.

  wordsToReturn = [];

  if (!prefix) {
    prefix = "";
  }

  if (this.isEmpty()) {
    return wordsToReturn;
  } else {
    if (this.isWord) {
      // change this.value for explicit autocomplete, and not
      // getWords() or else we must splice(0, 1)
      wordsToReturn.push(prefix + this.value);
    }

    for (key in this.characters) {
      wordsToReturn = wordsToReturn.concat(
        this.characters[key].getWords(prefix + this.value)
      )
    }
    return wordsToReturn;
  }

};

Trie.prototype.find = function(word, index){
  // This function will return the node in the trie
  // which corresponds to the end of the passed in word.
  // Be sure to consider what happens if the word is not in this Trie.

  if (!index) {
    index = 0;
  }

  if ((word.length - 1) === index){
    return this.characters[word[index]]
  } else if (!this.characters[word[index]]) {
    return false
  } else {
    return this.characters[word[index]].find(word, index + 1)
  }
};

Trie.prototype.autoComplete = function(prefix){
  // This function will return all completions 
  // for a given prefix.
  // It should use find and getWords.
  arrayOfWords = [];
  var findWords = this.find(prefix);

  if (!findWords) {
    return [];
  } else {
    return findWords.getWords(prefix.slice(0, -1));
  }
};

try{
  module.exports = Trie
} catch(e){

}