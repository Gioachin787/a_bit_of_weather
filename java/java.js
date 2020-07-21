var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
var key = 'aa07ece7327bb9e109f7d81e0b48e467';
var unit = 'metric';

function success(pos) {
  var crd = pos.coords;

  var lat=crd.latitude;
  var lon=crd.longitude;
  var apiCall = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&units='+unit+'&appid=' + key + '&lang=it';
  $.getJSON(apiCall, weatherCallback);
  weatherCallback(weatherData);
}

function auto() {
  var apiCall = 'http://api.openweathermap.org/data/2.5/weather?q=Padova&units='+unit+'&appid=' + key + '&lang=it';
  $.getJSON(apiCall, weatherCallback);
  weatherCallback(weatherData);
}

navigator.geolocation.getCurrentPosition(success,auto,options);

/* fine codice per la posizione corrente*/

function getWeather(){

  var cityName = $('#cityName').val();
  var apiCall = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName +
  '&units='+unit+'&appid=' + key + '&lang=it';
  $.ajax({
        dataType: 'json',
        url: apiCall,
        data: '',
        statusCode: {
                       400: function(){
                             alert('Devi inserire una città');
                              },

                        404: function(){
                              alert('Non esiste questa città');
                               }
                     }
        });
  $.getJSON(apiCall, weatherCallback);
  weatherCallback(weatherData);
}

function weatherCallback(weatherData){
  var cityName = weatherData.name;
  var country = weatherData.sys.country;
  var description = weatherData.weather[0].description;
  var minTemp = weatherData.main.temp_min;
  var maxTemp = weatherData.main.temp_max;
  var hum = weatherData.main.humidity;
  var temp = weatherData.main.temp;
  $("body").attr( "style", "background-image: url("+"images/" + weatherData.weather[0].icon + ".jpg)" );
  $('#city-name').html(cityName + ', ' + country);
  $('#tempGlobal').html(temp + ' C°' );
  $('#tempMin').html(minTemp+ ' C°');
	$('#tempMax').html(maxTemp+ ' C°');
  $('#hum').html(hum + ' %');
  $('#desc').html(description);
  /*document.getElementById('city').innerHTML = cityName + ', ' + country + ', ' + temp + 'C°' ;*/
}
