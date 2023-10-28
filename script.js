const loc = document.querySelector(".location");
const searchBtn = document.querySelector(".searchBtn");
const apiKey = "feec9c8ff3dd920b17ff3d67c65a3910";
const apiUrl =
	"https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const weatherIcon = document.querySelector(".weatherIcon")
const weatherTemp = document.querySelector(".weatherTemperature")
const humSpeed = document.querySelector(".humSpeed")
const botDiv = document.querySelector(".bottomDiv")
botDiv.style.display = "block"
botDiv.style.height = "0"

searchBtn.addEventListener("click", async function weather() {
	const city = loc.value.trim(); // trim() ile gereksiz boşlukları kaldırdık

	if (!city) {
		Swal.fire("Error!", "Please enter a city name!", "error");
		botDiv.style.display = "none"
		return;
	}

	try {
		const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

		if (response.ok) {
	botDiv.style.height = "500px"
			botDiv.style.display = "block"
			const data = await response.json();
			weatherIcon.innerHTML = ""
			weatherTemp.innerHTML = ""
			humSpeed.innerHTML = ""
			let icon = document.createElement("img")
			icon.className = "weat-icon"
			if(data.weather[0].main === "Clouds"){
				icon.src = "./assets/img/cloudly.png"  //gif eklenecek
			} else if (data.weather[0].main === "Rain" || data.weather[0].main === "Drizzle"){
				icon.src = "./assets/img/rainy.png"  //gif eklenecek
			} else if(data.weather[0].main === "Clear"){
				icon.src = "./assets/img/sunny.png"
			} else if (data.weather[0].main === "Snow"){
				icon.src = "./assets/img/sunny.png"
			}
			weatherIcon.appendChild(icon)
			weatherIcon.style.margin = "60px auto"
			// Temperature
			let temp = document.createElement("span")
			temp.className = "temperature"
			temp.innerHTML = `${Math.round(data.main.temp)}&#8451`
			weatherTemp.appendChild(temp)
			// location
			let location = document.createElement("span")	
			location.className = "location"
			location.innerHTML = `${data.name}`
			weatherTemp.appendChild(location)

			// HUMIDITY
			let humidity = document.createElement("div")
			humidity.className = "humidity"
			humSpeed.appendChild(humidity)

				// add humimg and humcontent
						//hum img div
			let humImgDiv = document.createElement("div")
			humidity.appendChild(humImgDiv)

			let humImg = document.createElement("img")
			humImg.className = "humimg"
			humImg.src = "./assets/img/humidity.png"
			humImgDiv.appendChild(humImg)


						// humContent
			let humCont = document.createElement("div")
			humCont.className = "humCont"
			humCont.innerHTML = `<p>${data.main.humidity}%</p>
			<p>Humidity</p>`
			humidity.appendChild(humCont)
			
			//WIND
			let wind = document.createElement("div")
			wind.className = "wind"
			humSpeed.appendChild(wind)

				// add windImg and windCont
					//windImgDiv and windImg
			let windImgDiv = document.createElement("div")
			wind.appendChild(windImgDiv)

			// let windImg = document.createElement("img")
			let windImg = document.createElement("i")
			// windImg.src = "./assets/img/windspeed.png"
			// windImg.className = "windImg"
			windImg.className = "fa-solid fa-wind"
			windImgDiv.appendChild(windImg)

					//windCont
			let windCont = document.createElement("div")
			windCont.className = "windcont"
			windCont.innerHTML = `<p>${data.wind.speed}Km/h</p>
			<p>Wind Speed</p>`
			wind.appendChild(windCont)
			console.log(data)


		} else {
			throw new Error(response.statusText);
		}
	} catch (err) {
		$("#kt_sweetalert_demo_3_2").click(function(err) {
			// Swal.fire("Hata!", err.message, "error");
		Swal.fire("There is no city or country like this name.!", err.message, "error");

		});
	}
});



// main.humidity 
// data.wind.speed


















// $("#kt_sweetalert_demo_3_1").click(function(e) {
//     Swal.fire("Good job!", "You clicked the button!", "warning");
// });

$("#kt_sweetalert_demo_3_2").click(function(err) {
    Swal.fire("Good job!", "You clicked the button!", "error");
});

// $("#kt_sweetalert_demo_3_3").click(function(e) {
//     Swal.fire("Good job!", "You clicked the button!", "success");
// });

// $("#kt_sweetalert_demo_3_4").click(function(e) {
//     Swal.fire("Good job!", "You clicked the button!", "info");
// });

// $("#kt_sweetalert_demo_3_5").click(function(e) {
//     Swal.fire("Good job!", "You clicked the button!", "question");
// });
