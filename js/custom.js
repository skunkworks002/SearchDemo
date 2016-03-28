//Hook a callback into the rendered Google Search. From my understanding, this is possible because the outermost rendered div has id of "___gcse_0".
window.__gcse = {
  callback: googleCSELoaded
}; 
function googleCSELoaded() {
  // The hook in question.
  $("#fullsearch-btn").click(function() {
	$("#advance-search-container").slideUp();
	var cities = {
			30301:"atlanta",
			73301:"austin",
			02108:"boston",
			60290:"chicago",
			75201:"dallas",
			80123:"denver",
			48201:"detroit",
			77001:"houston",
			89101:"lasvegas",
			90001:"losangeles",
			33101:"miami",
			55401:"minneapolis",
			10001:"newyork",
			92799:"orangecounty",
			19019:"philadelphia",
			85001:"phoenix",
			97201:"portland",
			27601:"raleigh",
			94203:"sacramento",
			92093:"sandiego",
			98101:"seattle",
			94101:"sfbay",
			20001:"washingtondc"
	}

    var location = $("#location").val();
		for (var key in cities) {
			if(key == location){
				location = cities[key];
			}
        }
		var search_string = $("#search_string").val();
		var min_price = $("#minAsk8").val();
		var max_price = $("#maxAsk8").val();
		var min_year = $("#minYear8").val();
		var max_year = $("#maxYear8").val();
		var searchText = "site:"+location+".craigslist.org"+" "+search_string+" "+"$"+min_price+".."+max_price+" "+"odometer:"+min_year+".."+max_year+" "+"filetype:html";
    console.log(searchText);
    var element = google.search.cse.element.getElement('searchOnlyCSE');
    element.execute(searchText);
  })
}

// CSE Code. This is a free version, so please don't make too many requests.
(function() {
  //var cx = '001386805071419863133:cb1vfab8b4y';
	var cx = '014940883816157527715:_1dsxowig5w';
  var gcse = document.createElement('script');
  gcse.type = 'text/javascript';
  gcse.async = true;
  gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(gcse, s);
})();
$(document).ready(function(){
	$(".advance-btn").click(function(){
	  console.log("Marking..");
      $("#advance-search-container").slideToggle();
    });
	var cities = {
			30301:"atlanta",
			73301:"austin",
			02108:"boston",
			60290:"chicago",
			75201:"dallas",
			80123:"denver",
			48201:"detroit",
			77001:"houston",
			89101:"lasvegas",
			90001:"losangeles",
			33101:"miami",
			55401:"minneapolis",
			10001:"newyork",
			92799:"orangecounty",
			19019:"philadelphia",
			85001:"phoenix",
			97201:"portland",
			27601:"raleigh",
			94203:"sacramento",
			92093:"sandiego",
			98101:"seattle",
			94101:"sfbay",
			20001:"washingtondc"
	}

	// Processing form
	$('#search_form').submit(function() {
		var location = $("#location").val();
		for (var key in cities) {
			if(key == location){
				location = cities[key];
			}
        }
		var search_string = $("#search_string").val();
		var min_price = $("#minAsk8").val();
		var max_price = $("#maxAsk8").val();
		var min_year = $("#minYear8").val();
		var max_year = $("#maxYear8").val();
		console.log("Location:"+location+"\n Search:"+search_string+"\n Min price:"+min_price+"\n Max price"+max_price
		+"\n Min year:"+min_year+"\n Max year:"+max_year+"\n"
		);
		return false;
	});
	
	
});
