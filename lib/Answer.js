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
  this._matchTag(description)._matchClasses(description)._matchId(description);
  
  return this.output;
}

DomDescriptionParser.prototype._matchTag = function(description) {
  var results = description.match(/^([A-z]+)/);

  if(results) {
    this.output.tagName = results[0].toUpperCase();
  }
  return this;
}

DomDescriptionParser.prototype._matchClasses= function(description) {
  var results = description.match(/[.]([A-z]+)/g);
  
  if(results) {
    for(var i = 0; i < results.length; i ++) {
      results[i] = results[i].replace('.', '');
    }
    this.output.className = results.join(' ');
  }
  return this;
}

DomDescriptionParser.prototype._matchId = function(description) {
  var output = description.match(/[#]([A-z]+)/);
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
    if (!domElement[attrName].match(new RegExp(this.matchData[attrName]))) {
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

