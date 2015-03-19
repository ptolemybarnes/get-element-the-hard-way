// $ traverses the DOM, returning an array of elements matching the selector
// passed to it.
var $ = function (selector) {
  var elements = [];

  var matchingElements = (document.getElementsByTagName(selector));
  console.log(matchingElements);

  for (var i = 0; i < matchingElements.length; i++) {
    elements.push(matchingElements.item(i));
  }

  return elements;
}

// DomDescriptionParser has the responsibility of parsing the description of the
// desired DOM elements into the separate tagName, class, and id properties.
var DomDescriptionParser = function() {};

DomDescriptionParser.prototype.parse = function(description) {
  output = { tagName: this._matchTag(description).toUpperCase(),
           className: this._matchClass(description),
                  id: this._matchId(description)};
  return output;
}

DomDescriptionParser.prototype._matchTag = function(description) {
  return (description.match(/^([A-z]+)/)   || [,])[1];
}

DomDescriptionParser.prototype._matchClass  = function(description) {
  return (description.match(/[.]([A-z]+)/) || [,])[1];
}

DomDescriptionParser.prototype._matchId = function(description) {
  return (description.match(/[#]([A-z]+)/) || [,])[1];
}

// DomElementToDescriptionMatcher has the responsibility of knowing whether a
// given DOM element matches a description returned by a DomDescriptionParser.

var DomElementToDescriptionMatcher = function(matchData) {
  this.matchData = matchData;
};

 DomElementToDescriptionMatcher.prototype.isMatch = function(domElement) {
  for (attrName in this.matchData) {
    if (domElement[attrName] != this.matchData[attrName]) {
      return false;
    }
  }
  return true; 
}


