describe('DomDescriptionParser', function() {
  
  describe('parses a DOM element description into a hash', function() {

    var domDescriptionParser = new DomDescriptionParser();

    it('with the tagName property', function() {
      var expectation = domDescriptionParser.parse("div");

      expect(expectation.tagName).toEqual('DIV');
    });

    it('with the class property', function() {
      var expectation = domDescriptionParser.parse("img.some_class");

      expect(expectation.class).toEqual('some_class');
    });
    
    it('with an id property', function() {
      var expectation = domDescriptionParser.parse("div.some_class#some_id");

      expect(expectation.id).toEqual('some_id');
    });
  });
});

