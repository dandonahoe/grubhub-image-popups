
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
		    success: function(response) {
		        processImageSearchResults(response);
		    }
	    });
	}, function() {
		console.log("exiting?");
	});
});


function processImageSearchResults(response) {
	var responseData = response.responseData;

	var results = responseData.results;

	alert(results[0].tbUrl);//teakdoor.com/Gallery/albums/userpics/10004/Thai_stir_fried_beef_holy_basil_pad_ka_pow.jpg);
}