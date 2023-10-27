const loc = document.querySelector(".location");
const searchBtn = document.querySelector(".searchBtn");
const api = "SXER5KSpqQJlwqwWt6RRetDDIBCCDa7V";
async function weather() {
	const response = await fetch(
		`https://api.tomorrow.io/v4/weather/forecast?location=${location.value}&apikey=${api}`
	);
	const data = await response.json();
	console.log(data);
}
weather();
searchBtn.addEventListener("click", weather);
