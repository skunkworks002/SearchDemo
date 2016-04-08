var gnames = gNames();
for(var data in gnames){
	$(".result").append('<gcse:searchresults-only gname="'+gnames[data]+'"></gcse:searchresults-only>');
}
var QueryString = queryString();				
if(jQuery.isEmptyObject(QueryString) === false) {
	for(var t in QueryString) {
		if(t == "q") $("#what").val(QueryString[t]);
		if(t == "zipcode") $("#where").val(QueryString[t]);
		if(t == "max_dist") $("#max_dist").val(QueryString[t]);
		if(t == "min_price") $("#min_price").val(QueryString[t]);
		if(t == "max_price") $("#max_price").val(QueryString[t]);
		if(t == "min_meter") $("#min_meter").val(QueryString[t]);
		if(t == "max_meter") $("#max_meter").val(QueryString[t]);
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