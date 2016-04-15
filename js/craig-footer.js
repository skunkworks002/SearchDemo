var gnames = gNames();
for(var i=0; i<gnames.length; i++){
	$(".result").append('<h3 class="'+gnames[i].gname+'">'+gnames[i].city+'</h3>');
	$(".result").append('<gcse:searchresults-only gname="'+gnames[i].gname+'"></gcse:searchresults-only>');
}
var QueryString = queryString();				
if(jQuery.isEmptyObject(QueryString) === false) {
	for(var t in QueryString) {
		if(t == "q") $("#search_string").val(QueryString[t]);
		if(t == "zipcode") {
			$("#location").val(QueryString[t]);
			if(jQuery.isEmptyObject(QueryString) === true) {
				$(".result").html('<p>No Result found</p>');
			} 
		}
		if(t == "max_dist") $("#max_dist").val(QueryString[t]);
		if(t == "min_price") $("#minAsk8").val(QueryString[t]);
		if(t == "max_price") $("#maxAsk8").val(QueryString[t]);
		if(t == "min_meter") $("#minYear8").val(QueryString[t]);
		if(t == "max_meter") $("#maxYear8").val(QueryString[t]);
	}
	
	window.__gcse = {
			callback: googleCSELoaded
	};

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
}
