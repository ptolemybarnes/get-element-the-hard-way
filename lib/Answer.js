// $ traverses the DOM, returning an array of elements matching the selector
// passed to it.
var $ = function (selector) {
  var elements = [];
  var matchData= new DomDescriptionParser().parse(selector);
  var matcher  = new DomElementToDescriptionMatcher(matchData);

  var bodyChildren = document.body.children;

  for(var i = 0; i < bodyChildren.length; i ++) {
    if (matcher.isMatch(bodyChildren[i])) {
      elements.push(bodyChildren[i]);
    }
  }

  return elements;
}

// DomDescriptionParser has the responsibility of parsing the description of the
// desired DOM elements into the separate tagName, class, and id properties.
var DomDescriptionParser = function() {};

DomDescriptionParser.prototype.parse = function(description) {
  output = { tagName: this._matchTag(description).toUpperCase(),
           className: this._matchClasses(description),
                  id: this._matchId(description)               };
  return output;
}

DomDescriptionParser.prototype._matchTag = function(description) {
  return (description.match(/^([A-z]+)/)   || [,""])[1];
}

DomDescriptionParser.prototype._matchClasses= function(description) {
  var results = description.match(/[.]([A-z]+)/g) || [""];
  
  for(var i = 0; i < results.length; i ++) {
    results[i] = results[i].replace('.', '');
  }
  return results.join(' ');
}

DomDescriptionParser.prototype._matchId = function(description) {
  return (description.match(/[#]([A-z]+)/) || [,""])[1];
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

DomElementToDescriptionMatcher.prototype._isClassNameAMatch = function(className) {
  classNames = className.split(' '); 
  for(var i = 0; i < classNames.length; i++) {
    if (classNames[i] === this.matchData.className) {
      return true;
    }
  }
  return false;
}


