var mouseX = 0;
var mouseY = 0;

$(document).ready(function() {

	if(window.Event)
        window.captureEvents(Event.MOUSEMOVE);

    document.onmousemove = function(e) {
        mouseX = (window.Event) ? e.pageX : event.clientX + document.body.scrollLeft;
        mouseY = (window.Event) ? e.pageY : event.clientY + document.body.scrollTop;
	};
});


$('.sections > .section > .items > li.item').each(function() {

	var itemName = $(this).find('.name').text();

	$(this).qtip({
	    content: {
	        text: 'Loading...',
	        title: itemName,
	        ajax: {
	            url: 'https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=' + encodeURIComponent(itemName),
	            type: 'GET', // POST or GET
	            dataType: "json",
	            success: function(response, status) {
	            	var responseData = response.responseData;

					var results = responseData.results;

					
					var popupHtml = ''
					    + '<div id="foodie-popup-body" style="">'
					    + '<img src="' + results[0].tbUrl + '" alt="' + itemName + '" />'
					    + '</div>';
					
	            	this.set('content.text', popupHtml);//$("#foodie-pupup").html());


	            }
	        }
	    },
	    position: {
	        viewport: $(window)
	    }
	});
});



// $('.sections > .section > .items > li.item').each(function(index) {
	
	
// 	$(this).hoverIntent(function(e) {
// 		var itemName = $(this).find('.name').text();
// 		console.log("Food item name(" + itemName + ")");

// 		var searchUrl = 'https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=' + encodeURIComponent(itemName);

// 		$.ajax({
// 		    type: "GET",
// 		    url:searchUrl,
// 		    dataType: "json",
// 		    success: function(response) {
// 		        processImageSearchResults(response, itemName);
// 		    }
// 	    });
// 	}, function() {
// 		$('#foodie-popup').fadeOut();
// 	});


// });


function processImageSearchResults(response, itemName) {
	var responseData = response.responseData;

	var results = responseData.results;

	results[0].tbUrl


	$('#foodie-popup').css('left', (mouseX - 200 / 2) + 'px');
    $('#foodie-popup').css('top',  (mouseY + 24) + 'px');
    $('#foodie-popup-title').html(itemName);
    $('#foodie-popup-body').html('<img src="' + results[0].tbUrl + '" />');
    $('#foodie-popup').fadeIn();
	

}