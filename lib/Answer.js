var $ = function (selector) {
  var elements = [];

  var matchingElements = (document.getElementsByTagName(selector));
  console.log(matchingElements);

  for (var i = 0; i < matchingElements.length; i++) {
    elements.push(matchingElements.item(i));
  }

  return elements;
}

var DomDescriptionParser = function() {};

DomDescriptionParser.prototype.parse = function(description) {
  output = { tagName: this._matchTag(description).toUpperCase(),
               class: this._matchClass(description),
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

