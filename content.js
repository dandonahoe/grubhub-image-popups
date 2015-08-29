$('.sections > .section > .items > li.item').each(function() {

	var itemName = $(this).find('.name').text();

	$(this).qtip({
	    content: {
	        text: function(event, api) {
	        	$.ajax({
	                type: "GET",
	                url: "https://en.wikipedia.org/w/api.php?action=opensearch&limit=1&format=json&search=" + itemName,
	                dataType: "json"

	            }).then(function(content) {
	                var itemLookupName = $.trim(content[1]);
	                var wikiDefinition = "";
	                var wikiPageUrl = "";

	                if(itemLookupName !== "") {
	                	wikiDefinition = content[2][0];
	                	wikiPageUrl = content[3];
	                }

	            	$.ajax({
		                type: "GET",
		                url: "https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=" + encodeURIComponent(itemName),
		                dataType: "json"

		            }).success(function(response, status) {

		            	var responseData = response.responseData;
						var results = responseData.results;
						var imageUrl = results[0].tbUrl;

						var popupHtml = ''
					    + '<div id="foodie-popup-body" style="">'
					    + '		<img src="' + imageUrl + '" alt="' + itemName + '" />'
					    + '		<div>' + wikiDefinition + '<div>'
					    + '</div>';

		            	api.set('content.text', popupHtml);//$("#foodie-pupup").html());
		            });

	            }, function(xhr, status, error) {
	                console.log("Wikipedia lookup failed");
	            });

	            return "Loading....";
	        }
	    },
	    position: {
	        viewport: $(window)
	    }
	});
});