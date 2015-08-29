
$(document).ready(function() {
	
	console.log("Did this fire?");
	
});




$('.sections > .section > .items > li.item').each(function(index) {
	

	$(this).hoverIntent(function(e) {
		var itemName = $(this).find('.name').text();
		console.log("Food item name(" + itemName + ")");
	});
});