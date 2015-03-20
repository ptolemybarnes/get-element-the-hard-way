Getting a DOM Element
=======================

## Synopsis

This was written as part of the application process for a tech company in London.
The instruction was to write a function that returns DOM elements with the attribute(s) matching those given. To make things more interesting, js libraries as well as the querySelector functions were prohibited.  

I broke the problem down into 2 parts:
1) Understanding what I came to call the 'element description string'. For example, 'div.some_class#some_id'. The solution I came to was to create an object able to parse description strings into separate attributes.
2) Knowing whether any given element matches the description.  
  
I took an OOP approach, solving part 1 with a 'DomDescriptionParser', and part 2 with a 'DomElementToDescriptionMatcher'.

## Technologies Used

- JavaScript 
- Jasmine 

## Favourite Code Snippet

<img src='http://s9.postimg.org/9mt0jdrpb/codesnippet.jpg' alt='code snippet'>

## Still to complete/refactor

- DRY out the domDescriptionParser prototype. 

## Takeaway

At the outset I thought about how I might write a function to 'walk the dom' from parent to child elements, checking each. I realised though, looking at the example HTML document given, that there were no nested elements. This simplified things, though in the future it would be interesting to try to achieve this original notion.  

