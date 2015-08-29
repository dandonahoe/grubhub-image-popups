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

						var imageHtml = '';

						for(var a = 0; a < results.length; a++) {
							var result = results[a];

							imageHtml += "<img src=" + result.unescapedUrl  + " style='max-width:280px;max-height:280px;' />";
							break;
						}

						// var thumbnailUrl = results[0].tbUrl;
						// var fullsizeUrl  = result[0].unescapedUrl;
						var moreInformationSecton = "";

						if(wikiDefinition !== "") {
				    		moreInformationSecton =
					    		+ '<div>' 
					    		+ '		<h3>More information<h3>'
							    + '		<div style="max-width:320px;">' + wikiDefinition + '<div>'
							    + '</div>';
					    }

						var popupHtml = ''
						    + '<div id="foodie-popup-body" style="">'
						    + '    <div style="text-align:center;padding-bottom:20px;">'
						    +          imageHtml
						    + '    </div>'
						    + moreInformationSecton
							+ '</div>';

					    api.set('content.title', itemName);
		            	api.set('content.text', popupHtml);
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