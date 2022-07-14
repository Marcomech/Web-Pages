function checkInputs() {
	const MovieName = fMovie.value;
	return MovieName.replaceAll(" ","20%");
}

function GetApi(MovieName){
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '7dacbfbe26mshf90acba44fffd95p1ba356jsne52e36e39442',
			'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
		}
	};
	fetch(`https://online-movie-database.p.rapidapi.com/auto-complete?q=${MovieName}`, options)
		.then(response => response.json())
		.then(data => {
			const list = data.d;
			list.map((item)=>{
				console.log(item)
			})
		})
		.catch(err => console.error(err))
	//document.getElementById('resultado').innerHTML = response;
}

form.addEventListener('submit', e => {
	e.preventDefault();
	MovieName = checkInputs();
	GetApi(MovieName);
});
