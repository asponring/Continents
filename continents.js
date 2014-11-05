(function () {
    'use strict';
   
    function getAjaxData(continent) {
        // create an XMLHttpRequest object
        var request = new XMLHttpRequest();
        
        // Get the requested filename 
        var filename = continent + ".json";
        
        // Specify a GET request for the JSON file
        request.open("GET", filename);
        request.send();
        
        // define the function to be called when the response is received.
        request.onreadystatechange = function () {
           // check that the response is complete and the request was successful
           if (request.readyState === 4 && request.status === 200){
               // Display the response - responseText is the JSON encoded string
               displayInfo(request.responseText);
               // save the information in local storage 
               saveInfo(continent, request.responseText);
           }
        };
    };
       
    function getData(event) {
        // Get the continent name requested
        var continent = event.target.id;
        
        // If the info is available in local storage, use it
        if (continent in localStorage) {
            displayInfo(localStorage.getItem(continent))
        }
        else {
            // otherwise get the info with an Ajax call
            getAjaxData(continent);
        }
    };
            
    
    function saveInfo(myContinent, info) {
            // save the information regarding myContinent in local storage
            localStorage.setItem(myContinent, info)
    }
    
    function displayInfo(jsonString) {
        // convert the JSON encoded string to object
        var jsonObj = JSON.parse(jsonString);
        // build a string from the properties and their values. 
        var info = '';
        for (var prop in jsonObj) {
            info += '<p>' + prop + ': ' + jsonObj[prop] + '</p>';
        }
        // display the additional info in the description html element
        document.getElementById("description").innerHTML = info;
 
    }
   
    // Register event handlers to get the additional info if requested
    document.getElementById("continents").addEventListener("click", getData, false);
}());