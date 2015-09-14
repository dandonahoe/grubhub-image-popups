
function scanPage() {
	console.log("Page scanned");

	$('.sections > .section > .items > li.item').each(function() {
		console.log("Running on page 1");
		setupItemPopup(this);
	});


	$('.trendingItemsSection > .trending-items > li.item').each(function() {
		console.log("Running on page 2");
		setupItemPopup(this);
	});	
}


var lastLocation = "";

$(function(){

	setInterval(function() {

		console.log(lastLocation + " vs " + window.location.href);
		if(lastLocation !== window.location.href) {
			scanPage();		
			lastLocation = window.location.href;
		}
		else {
			console.log("not scanning page");
		}

	}, 1000);
  
  	scanPage();

  	lastLocation = window.location.href;
});

function setupItemPopup(element) {

	var itemName = $(element).find('.name').text();

	$(element).qtip({
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
						var bigImage = "";
						var thumbnailImages = "";

						for(var a = 0; a < results.length; a++) {
							var result = results[a];

							thumbnailImages += 
								"<div style='height:150px;float:left;padding:4px;border:radius:6px;margin-right:10px;margin-bottom:10px;'><img src='" + result.tbUrl + "' style='box-shadow: 0px 0px 7px 0px rgba(0,0,0,0.57);' alt='" + result.titleNoFormatting + "' /> </div>";
						}

						var moreInformationSecton = "";

						if(wikiDefinition !== "") {
				    		moreInformationSecton = ''
					    		+ '<div style="clear:both;margin-top:20px;">' 
					    		+ '		<h3>More information<h3>'
							    + '		<div style="font-weight:normal;">' + wikiDefinition + '</div>'
							    + '</div>';
					    }

						var popupHtml = ''
						    + '<div id="foodie-popup-body" style="">'
						    + '    <div style="text-align:center;">'
						    +          thumbnailImages
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
	    style: {
	    	 classes: 'qtip-bootstrap'
	    	 
	    },
	    position: {
	        viewport: $(window),
	        adjust: {
	            method: 'none shift'
	        }
	    }
	});
}



