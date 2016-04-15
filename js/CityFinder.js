var CityFinder = function(fileLocation){

	var self = this,
	filePath = fileLocation, 
	data = new Array();
	self.init = function(){
		
		self.readTextFile();
	}
	self.readTextFile = function()
	{
		var rawFile = new XMLHttpRequest();
		rawFile.open("GET", filePath, false);

		var postalCodes = new Array();
		rawFile.onreadystatechange = function ()
		{
			if(rawFile.readyState === 4)
			{
				if(rawFile.status === 200 || rawFile.status == 0)
				{
					allText = rawFile.responseText;
				// By lines
				lines = allText.split('\n');
				
				for(var line = 0; line < lines.length; line++){
					//row =  lines[line];
					locationAttributes = lines[line].trim().split(',');
					data[locationAttributes[0]] = locationAttributes;
				}


			}
		}
	}
	rawFile.send(null);
}

/**
 * returns near by cities
 * @param zipcode
 * @param distance in km
 * @return cities Array
 */
 self.getNearByCities = function(zipcode, distance){
 	var cities = new Array();
 	for(city in data){
 		citiesDistance = self.calculateDistance(data[zipcode][1], data[zipcode][2], data[city][1], data[city][2]);
 		if(citiesDistance <= distance && citiesDistance > 0){
 			cities[data[city][3]] = {'url':data[city][4]  };
 			//cities.push({'city' : data[city][3], 'url': data[city][4]})
 		}
 	}
 	
 	return cities;
 }
 /**
 * returns near by cities by Distinct urls
 * @param zipcode
 * @param distance in km
 * @return urls Array
 */
 self.getNearByCitiesByUrl = function(zipcode, distance){
 	var urls = new Array();
 	if(data[zipcode] != undefined){
	 	for(city in data){
	 		citiesDistance = self.calculateDistance(data[zipcode][1], data[zipcode][2], data[city][1], data[city][2]);
	 		if(citiesDistance <= distance && citiesDistance > 0){
	 			urls[data[city][4]] = {'city':data[city][3]  };
	 			//cities.push({'city' : data[city][3], 'url': data[city][4]})
	 		}
	 	}
 	}
 	return urls;
 }
 /**
 * returns near by cities by Distinct urls
 * @param zipcode
 * @param distance in km
 * @return urls Array
 */
 self.getNearByCitiesByUrlWithCities = function(zipcode, distance){
 	var urlWithCities = new Array();
 	for(city in data){
 		citiesDistance = self.calculateDistance(data[zipcode][1], data[zipcode][2], data[city][1], data[city][2]);
 		if(citiesDistance <= distance && citiesDistance > 0){
 			if(typeof urlWithCities[data[city][4]] == 'undefined'){
 				urlWithCities[data[city][4]] = {'city':data[city][3]  };
 			}else{
 				// console.log( urlWithCities[data[city][4]].city);
 				if( urlWithCities[data[city][4]].city.indexOf(data[city][3]) == -1){
 					urlWithCities[data[city][4]].city+=","+data[city][3];
 				}
 			}
 			
 			//cities.push({'city' : data[city][3], 'url': data[city][4]})
 		}
 	}
 	
 	return urlWithCities;
 }
/**
 * returns distance in km 
 * @param lat1
 * @param lon1
 * @param lat2
 * @param lon2
 * return distance d in km
 */
 self.calculateDistance = function(lat1,lon1,lat2,lon2){
	  var R = 6371; // Radius of the earth in km
	  var dLat = deg2rad(lat2-lat1);  // deg2rad below
	  var dLon = deg2rad(lon2-lon1); 
	  var a = 
	  Math.sin(dLat/2) * Math.sin(dLat/2) +
	  Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
	  Math.sin(dLon/2) * Math.sin(dLon/2)
	  ; 
	  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	  var d = R * c; // Distance in km
	  return d;
	}
	function deg2rad(deg) {
		return deg * (Math.PI/180)
	}
	self.init();
	

}

