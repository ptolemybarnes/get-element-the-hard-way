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
var DomDescriptionParser = function() {
  this.output = {};
};

DomDescriptionParser.prototype.parse = function(description) {
  this.description = description;
  this._matchTag()._matchClass()._matchId();
  
  return this.output;
}

DomDescriptionParser.prototype._matchTag = function() {
  var results = this.description.match(/^([A-z]+)/);

  if(results) {
    this.output.tagName = results[1];
  }
  return this;
}

DomDescriptionParser.prototype._matchClass= function() {
  var results = this.description.match(/[.]([A-z]+)/);
  
  if(results) {
    this.output.className = results[1];
  }
  return this;
}

DomDescriptionParser.prototype._matchId = function() {
  var output = this.description.match(/[#]([A-z]+)/);
  if (output) {
    this.output.id = output[1];
  }
  return this;
}

// DomElementToDescriptionMatcher has the responsibility of knowing whether a
// given DOM element matches a description returned by a DomDescriptionParser.
var DomElementToDescriptionMatcher = function(matchData) {
  this.matchData = matchData;
};

DomElementToDescriptionMatcher.prototype.isMatch = function(domElement) {
  for(attrName in this.matchData) {
    if (!domElement[attrName].match(new RegExp(this.matchData[attrName], 'i'))) {
      return false;
    }
  }
  return true; 
}

