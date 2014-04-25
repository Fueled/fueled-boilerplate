/**
 * Demo JS Partial
 *
 * Each partial bit of JavaScript code will live in it's own partial
 * and will become a method (function) associated with the global g
 * object.
 */

// We name our function
g.demo = function() {
	// We create a reference to the function, so we can easily extend
	var self = g.demo;

	// An example of an extended object
	self.demoObject = {
		a: 'string 1',
		b: 'string 2',
		c: 'string 3'
	};

	// An example of an extended variable
	self.demoVar = 'variable';

	// An example of an extended method (function)
	self.demoFunction = function demoFunction() {
		return self.demoVar;
	};

	// An example of a local function
	function localFunction() {
		return 'this is a local function';
	}

	// An IIFE (Immediately-Involked Function Expression) which echoes
	// echoes out the desires effects of this method.
	//
	// We use an IIFE because we're just echoing it out once on page
	// load and don't need to reference it again.
	// For more complex sites, an init() function would need to be
	// created which we could reference.
	(function() {
		console.log(self.demoFunction(), g, self);
	})();
};