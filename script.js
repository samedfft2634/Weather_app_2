const loc = document.querySelector(".location");
			const searchBtn = document.querySelector(".searchBtn");
			const apiKey = "feec9c8ff3dd920b17ff3d67c65a3910";
			const apiUrl =
				"https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

			searchBtn.addEventListener("click", async function () {
				const city = loc.value.trim(); // trim() ile gereksiz boşlukları kaldırdık

				if (!city) {
					Swal.fire("Error!", "Please enter a city name!", "error");
					return;
				}

				try {
					const response = await fetch(
						apiUrl + city + `&appid=${apiKey}`
					);

					if (response.ok) {
						const data = await response.json();
						console.log(data);
					} else {
						throw new Error(response.statusText);
					}
				} catch (err) {
					Swal.fire("Hata!", err.message, "error");
				}
			});
searchBtn.addEventListener("click", weather);
// $("#kt_sweetalert_demo_3_1").click(function(e) {
//     Swal.fire("Good job!", "You clicked the button!", "warning");
// });

// $("#kt_sweetalert_demo_3_2").click(function(e) {
//     Swal.fire("Good job!", "You clicked the button!", "error");
// });

// $("#kt_sweetalert_demo_3_3").click(function(e) {
//     Swal.fire("Good job!", "You clicked the button!", "success");
// });

// $("#kt_sweetalert_demo_3_4").click(function(e) {
//     Swal.fire("Good job!", "You clicked the button!", "info");
// });

// $("#kt_sweetalert_demo_3_5").click(function(e) {
//     Swal.fire("Good job!", "You clicked the button!", "question");
// });