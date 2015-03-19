var $ = function (selector) {
  var elements = [];

  var matchingElements = (document.getElementsByTagName(selector));

  for (var i = 0; i < matchingElements.length; i++) {
    elements.push(matchingElements.item(i));
  }

  return elements;
}

