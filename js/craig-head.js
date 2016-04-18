//Extract Domain part from url
		function extractDomain(url) {
			var domain;
			//find & remove protocol (http, ftp, etc.) and get domain
			if (url.indexOf("://") > -1) {
				domain = url.split('/')[2];
			}
			else {
				domain = url.split('/')[0];
			}
			//find & remove port number
			domain = domain.split(':')[0];
    	return domain;
		}
		
		//Return an object of arguments with key and values
		function queryString() {
		// This function is anonymous, is executed immediately and 
		// the return value is assigned to QueryString!
		var query_string = {};
		var query = window.location.search.substring(1);
		var vars = query.split("&");
		for (var i=0;i<vars.length;i++) {
			var pair = vars[i].split("=");
					// If first entry with this name
			if (typeof query_string[pair[0]] === "undefined") {
				if(pair[0].length != 0) {
					query_string[pair[0]] = decodeURIComponent(pair[1]);
				}
					// If second entry with this name
			} else if (typeof query_string[pair[0]] === "string") {
				var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
				query_string[pair[0]] = arr;
					// If third or later entry with this name
			} else {
				query_string[pair[0]].push(decodeURIComponent(pair[1]));
			}
		} 
			return query_string;
		}
		
		//Generate gnames and sitename for nearest cities
		function gNames() {
			var cf = new CityFinder("craiglist.txt");
			var QueryString = queryString();
			var gnames_arr = [];
			var gnames_obj = {};
			var gname = "";
			var i = 0;
			var where_zip = "";
			var where_site = "";
			var max_dist = 25;
			
			for(var t in QueryString) {
				if(t == "zipcode") where_zip = QueryString[t];
				if(t == "max_dist") max_dist = QueryString[t];
			}
			result = cf.getNearByCitiesByUrl(where_zip, max_dist);
			//$( ".result" ).empty();
			for(var data in result){
				gname = "searchOnlyCSE_"+i;
				where_site = extractDomain(data);
				//gnames_obj["gname"] = gname;
				//gnames_obj["city"] = result[data].city;
				//gnames_obj["where_site"] = where_site;
				gnames_arr[i] = {'gname':gname, 'city':result[data].city, 'site': where_site};
				i++;
			}
			return gnames_arr;
		}
		
		function googleCSELoaded() {
			// The hook in question.
			var where = ""; //t['zipcode'];
			var what = ""; //t['q'];
			var min_price = ""; //t['min_price'];
			var max_price = ""; //t['max_price'];
			var min_meter = ""; //t['min_meter'];
			var max_meter = ""; //t['max_meter'];
			var QueryString = queryString();
			var gnames = gNames();
			for(var t in QueryString) {
				if(t == "q") what = QueryString[t];
				if(t == "min_price") min_price = QueryString[t];
				if(t == "max_price") max_price = QueryString[t];
				if(t == "min_meter") min_meter = QueryString[t];
				if(t == "max_meter") max_meter = QueryString[t];
			}
		
			var i = 0;
			for(var i=0; i<gnames.length; i++){
				var searchText = "site:"+gnames[i].site+" "+what+" "+"$"+min_price+".."+max_price+" "+"odometer:"+min_meter+".."+max_meter+" "+"filetype:html";
				var element = google.search.cse.element.getElement(gnames[i].gname);
				element.execute(searchText);
			}
		}
		
		$( document ).ready(function() {
			$("#fullsearch-btn").click(function() {
				//console.log("Marking.....");
				var where = $("#location").val();
				var what = $("#search_string").val();
				var min_price = $("#minAsk8").val();
				var max_price = $("#maxAsk8").val();
				var min_meter = $("#minYear8").val();
				var max_meter = $("#maxYear8").val();
				var max_dist = $("#max_dist").val();
				var args = "?q="+what+"&zipcode="+where+"&max_dist="+max_dist+"&min_price="+min_price+"&max_price="+max_price+"&min_meter="+min_meter+"&max_meter="+max_meter;
				pathArray = location.href.split( '/' );
				protocol = pathArray[0];
				host = pathArray[2];
				window.location.href = protocol + '//'+"skunkworks002.github.io/SearchDemo/"+args;	
			})
		});
