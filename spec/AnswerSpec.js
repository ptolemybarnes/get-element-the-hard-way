var parser = new DOMParser();

describe('DomDescriptionParser', function() {
  
  describe('parses a DOM element description into a hash', function() {

    var domDescriptionParser = new DomDescriptionParser();

    it('with the tagName property', function() {
      var expectation = domDescriptionParser.parse("div");

      expect(expectation.tagName).toEqual('DIV');
    });

    it('with the class property', function() {
      var expectation = domDescriptionParser.parse("img.some_class");

      expect(expectation.className).toEqual('some_class');
    });

    it('with multiple class properties', function() {
      var expectation = domDescriptionParser.parse("img.some_class.some_other_class");

      expect(expectation.classNames).toEqual(['some_class','some_other_class']);
    });
    
    it('with an id property', function() {
      var expectation = domDescriptionParser.parse("div.some_class#some_id");

      expect(expectation.id).toEqual('some_id');
    });
  });
});

describe('DomElementToDescriptionMatcher', function() {
  
  var mockDomElement   = document.createElement('div'); 
  mockDomElement.id    = 'some_id';

  it('returns true if a DOM element matches the DIV description', function() { 
    var matchInfo = {tagName: 'DIV', id: 'some_id', classNames: ""} 
    var matcher   = new DomElementToDescriptionMatcher(matchInfo);

    expect(matcher.isMatch(mockDomElement)).toEqual(true);
  });
});

