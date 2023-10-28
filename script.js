const loc = document.querySelector(".location");
const searchBtn = document.querySelector(".searchBtn");
const apiKey = "feec9c8ff3dd920b17ff3d67c65a3910";
const apiUrl =
	"https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const weatherIcon = document.querySelector(".weatherIcon");
const weatherTemp = document.querySelector(".weatherTemperature");
const humSpeed = document.querySelector(".humSpeed");
const botDiv = document.querySelector(".bottomDiv");
botDiv.style.display = "block";
botDiv.style.height = "0";

// Fonksiyonu buraya ekleyin
function changeBackgroundVideo(weatherCondition) {
    const backgroundVideo = document.getElementById('backgroundVideo');

    switch(weatherCondition) {
        case 'Clouds':
            backgroundVideo.src = './assets/bck-videos/clouds.mp4';
            break;
        case 'Rain':
        case 'Drizzle':
            backgroundVideo.src = './assets/bck-videos/rainy.mp4';
            break;
        case 'Clear':
            backgroundVideo.src = './assets/bck-videos/sunny.mp4';
            break;
        case 'Snow':
            backgroundVideo.src = './assets/bck-videos/snowy.mp4';
            break;
        default:
            backgroundVideo.src = './assets/bck-videos/current.mp4';
    }

    backgroundVideo.load();
    backgroundVideo.play();
}


searchBtn.addEventListener("click", async function weather() {
	const city = loc.value.trim(); // trim() ile gereksiz boşlukları kaldırdık

	if (!city) {
		Swal.fire("Error!", "Please enter a city name!", "error");
		botDiv.style.display = "none";
		return;
	}

	try {
		const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

		if (response.ok) {
			botDiv.style.height = "500px";
			botDiv.style.display = "block";
			const data = await response.json();
			// Burada fonksiyonu çağırıyoruz
            changeBackgroundVideo(data.weather[0].main);
			weatherIcon.innerHTML = "";
			weatherTemp.innerHTML = "";
			humSpeed.innerHTML = "";
			let icon = document.createElement("img");
			icon.className = "weat-icon";
			if (data.weather[0].main === "Clouds") {
				icon.src = "./assets/img/clouds.gif"; //gif eklenecek
			} else if (
				data.weather[0].main === "Rain" ||
				data.weather[0].main === "Drizzle"
			) {
				icon.src = "./assets/img/rain.gif"; //gif eklenecek
			} else if (data.weather[0].main === "Clear") {
				icon.src = "./assets/img/sun.gif";
			} else if (data.weather[0].main === "Snow") {
				icon.src = "./assets/img/snow.gif";
			}
			weatherIcon.appendChild(icon);
			weatherIcon.style.margin = "10px auto";
			// Temperature
			let temp = document.createElement("span");
			temp.className = "temperature";
			temp.innerHTML = `${Math.round(data.main.temp)}&#8451`;
			weatherTemp.appendChild(temp);
			// location
			let location = document.createElement("span");
			location.className = "location";
			location.innerHTML = `${data.weather[0].description}`;
			weatherTemp.appendChild(location);

			// HUMIDITY
			let humidity = document.createElement("div");
			humidity.className = "humidity";
			humSpeed.appendChild(humidity);
		
			// add humimg and humcontent
			//hum img div
			let humImgDiv = document.createElement("div");
			humidity.appendChild(humImgDiv);

			let humImg = document.createElement("img");
			humImg.className = "humimg";
			humImg.src = "./assets/img/humidity.png";
			humImgDiv.appendChild(humImg);

			// humContent
			let humCont = document.createElement("div");
			humCont.className = "humCont";
			humCont.innerHTML = `<p>${data.main.humidity}%</p>
			<p>Humidity</p>`;
			humidity.appendChild(humCont);

			//WIND
			let wind = document.createElement("div");
			wind.className = "wind";
			humSpeed.appendChild(wind);

			// add windImg and windCont
			//windImgDiv and windImg
			let windImgDiv = document.createElement("div");
			wind.appendChild(windImgDiv);

			// let windImg = document.createElement("img")
			let windImg = document.createElement("i");
			// windImg.src = "./assets/img/windspeed.png"
			// windImg.className = "windImg"
			windImg.className = "fa-solid fa-wind";
			windImgDiv.appendChild(windImg);

			//windCont
			let windCont = document.createElement("div");
			windCont.className = "windcont";
			windCont.innerHTML = `<p>${data.wind.speed}Km/h</p>
			<p>Wind Speed</p>`;
			wind.appendChild(windCont);
			console.log(data);
		} else {
			throw new Error(response.statusText);
		}
	} catch (err) {
		Swal.fire(
			"There is no city or country like this!",
			err.message,
			"error"
		);
		botDiv.style.display = "none";
		loc.value = "";
	}
});

// main.humidity
// data.wind.speed
