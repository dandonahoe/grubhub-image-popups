
$(document).ready(function() {
	
	console.log("Did this fire?");
	
});




$('.sections > .section > .items > li.item').each(function(index) {
	

	$(this).hoverIntent(function(e) {
		var itemName = $(this).find('.name').text();
		console.log("Food item name(" + itemName + ")");

		var searchUrl = 'https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=' + encodeURIComponent(itemName);

		$.ajax({
		    type: "GET",
		    url:searchUrl,
		    dataType: "json",
		    success: function(json) {
		        //definitionData.Definition = $(xml).find("Description").text();
		        // /successfulLookup(definitionData);
alert(json);
		        console.log("Success?");
		    }
	    });
	});
});