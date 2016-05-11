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
 * returns near by cities by Distinct counties
 * @param zipcode
 * @param distance in km
 * @return urls Array
 */
 /**
 * returns near by cities by Distinct urls
 * @param zipcode
 * @param distance in km
 * @return urls Array
 */
 self.getNearByCitiesByDistinctCounties = function(zipcode, distance){
 	var urlWithCities = new Array();
 	if(data[zipcode] != undefined){
 		for(city in data){
 			citiesDistance = self.calculateDistance(data[zipcode][1], data[zipcode][2], data[city][1], data[city][2]);
 			if(citiesDistance <= distance && citiesDistance > 0){
 				if(typeof urlWithCities[data[city][5]] == 'undefined'){

 					cityArray = new Array();

 					cityArray.push({'name' : data[city][3],'url':data[city][4],'distance':citiesDistance});
 					urlWithCities[data[city][5]] = {'cities':cityArray, 'distance':  citiesDistance,'state':data[city][5]};
 				}else{

 					if(citiesDistance < urlWithCities[data[city][5]].distance){
 						urlWithCities[data[city][5]].distance = citiesDistance;
 					}
 					cityArray = urlWithCities[data[city][5]].cities;
 					var cityDistance;
          for(cityIndex in cityArray){
               if(cityArray[cityIndex]['distance'] < citiesDistance){
                  cityDistance = citiesDistance;
               }else{
                cityDistance = cityArray[cityIndex]['distance'];
               }
          }
				cityArray.push({'name' : data[city][3],'url':data[city][4],'distance':cityDistance});

 					urlWithCities[data[city][5]].cities=cityArray;

 				}


 			}
 		}

 		urlWithCities = self.sortData(urlWithCities);
 		urlWithCities = self.DistinctUrls(urlWithCities);
 	}
	console.log(urlWithCities);
 	return urlWithCities;
 }
 /**
  *This method use to distinct the urls
  *@param : urls of the states with array of city and their urls
  */ 
self.DistinctUrls = function(states){

   for(state in states){
    distinctByUrl = new Array();
    cities = states[state].cities;
    for(city in cities){
     if(distinctByUrl[cities[city].url] == undefined){
      distinctByUrl[cities[city].url] = {};
     }
     if(distinctByUrl[cities[city].url][cities[city].name] == undefined){
      distinctByUrl[cities[city].url][cities[city].name]  = new Array();

     }
        var citiesDistances = new Array();

        citiesDistances = distinctByUrl[cities[city].url][cities[city].name];
        citiesDistances.push(cities[city].distance);
        distinctByUrl[cities[city].url][cities[city].name] =citiesDistances; 

      }
      var citiesInformation = new Array();
      for(url in distinctByUrl){
        for(cityname in distinctByUrl[url]){
          var sum = distinctByUrl[url][cityname].reduce(function(a, b) { return a + b; });
          distinctByUrl[url][cityname].sort(function (a, b)
          {
            return a - b;
          });
          var avg =  distinctByUrl[url][cityname][Math.round((distinctByUrl[url][cityname].length - 1) / 2)];
          citiesInformation.push({'name':cityname,'distance': avg,'url':url});


        }

      }
      states[state].cities = citiesInformation;     
    }
    return states;


  }

 /**
  *use to  sort object of objects ascending
  *@param unsortedData
  **/ 
  self.sortData = function(unsortedData){
  	var sortable = [];
  	for (unsortedObject in unsortedData){
  		sortable.push(unsortedData[unsortedObject]);

  	}
  	sortable.sort(function(a, b) {return a.distance - b.distance; })

  	return sortable;      
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

