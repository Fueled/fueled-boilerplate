$(function() {

	/* -----------------------
	-- Section of Code -- */

	// For all event listeners, write them in this format
	// Using jQuery's on() function, it means it will apply to all elements,
	// even ones created dynamically. It's also the jQuery standard now,
	// replacing .click(), .submit(), etc.
	$(document).on('click', '.btn', function(e) {
		// If canFire is set to true.
		if(canFire) {
			// Run the doStuff function
			doStuff();
		}
		// Prevent the default browser event from firing
		e.preventDefault();
	});

});