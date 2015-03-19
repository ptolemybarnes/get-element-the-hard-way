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
  output = { tagName: this.matchTag(description).toUpperCase(),
               class: this.matchClass(description),
                  id: this.matchId(description)};
  return output;
}

DomDescriptionParser.prototype.matchTag = function(description) {
  return (description.match(/^([A-z]+)/) || [,])[1];
}

DomDescriptionParser.prototype.matchClass  = function(description) {
  return (description.match(/[.]([A-z]+)/) || [,])[1];
}

DomDescriptionParser.prototype.matchId = function(description) {
  return (description.match(/[#]([A-z]+)/) || [,])[1];
}

