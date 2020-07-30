const weather = document.querySelector(".js-weather");

const COORDS = 'coords';
const API_KEY = "6cfb4b46bf8b99dd94575ffffe75288c";
function getWeather(lat,lng){
	fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
		).then(function(response){
			return response.json();
		}).then(function(json){
			const temperature = json.main.temp;
			const place = json.name;
			weather.innerText = `${temperature} @ ${place}`;
		});
}

function saveCoord(coordsObj){

	localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoError(position){
	console.log("Can't open");
}

function handleGeoSuccess(position){
	console.log(position);
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;
	const coordsObj = {
		latitude,
		longitude
	};
	saveCoord(coordsObj);
	getWeather(latitude,longitude);
}

function askForCoords(){
	navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError);
}

function loadCoords(){
	const loadedCoords = localStorage.getItem(COORDS);
	if(loadedCoords === null){
		askForCoords();
	}
	else{
		const parseCoords = JSON.parse(loadedCoords);
		getWeather(parseCoords.latitude,parseCoords.longitude);
	}
}

function init(){
	loadCoords();
}
init();

console.log('check');