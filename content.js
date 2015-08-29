var mouseX = 0;
var mouseY = 0;

$(document).ready(function() {

	if(window.Event)
        window.captureEvents(Event.MOUSEMOVE);

    document.onmousemove = function(e) {
        mouseX = (window.Event) ? e.pageX : event.clientX + document.body.scrollLeft;
        mouseY = (window.Event) ? e.pageY : event.clientY + document.body.scrollTop;

        console.log('x('+mouseX+') y('+mouseY+')');
	};

	var hiddenPopup = 
	    '    <div id="foodie-popup" style="background-color:#FFFDCF;padding:10px;box-shadow: 4px 2px 20px rgba(0, 0, 0, 0.22);width:200px;border-radius:10px;border:1px solid #000000;position:absolute;display:none;text-alignLleft;">'
	    + 'NOM NOM NOM'
	    + '    </div>';
	    
	$('body').append(hiddenPopup);
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
		        processImageSearchResults(response, itemName);
		    }
	    });
	}, function() {
		console.log("exiting?");
	});
});


function processImageSearchResults(response, itemName) {
	var responseData = response.responseData;

	var results = responseData.results;

	alert(results[0].tbUrl);//teakdoor.com/Gallery/albums/userpics/10004/Thai_stir_fried_beef_holy_basil_pad_ka_pow.jpg);


	$('#foodie-popup').css('left', (mouseX - 200 / 2) + 'px');
    $('#foodie-popup').css('top',  (mouseY + 24) + 'px');
    //$('#foodie-popup-title').html(popupHeader);
    //$('#foodie-popup-body').html(definitionData.Definition + debugFooter);
    $('#foodie-popup').fadeIn();
	

}