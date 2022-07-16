
function checkInputs() {
	const MovieName = fMovie.value;
	return MovieName.replaceAll(" ","-");
}

function GetTorrent(Id){
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '7dacbfbe26mshf90acba44fffd95p1ba356jsne52e36e39442',
			'X-RapidAPI-Host': 'movies-and-serials-torrent.p.rapidapi.com'
		}
	};
	return new Promise(function(resolve, reject) {
		fetch(`https://movies-and-serials-torrent.p.rapidapi.com/movies/search/${Id}`, options)
			.then(response => response.json())
			.then(r => {
				const out = r.data.movies[0];
				console.log(out);
				resolve(out);
			})
			.catch(err => console.error(err));
	})
	
}

function GetApi(MovieName){
	const items = document.getElementById("elements");
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '7dacbfbe26mshf90acba44fffd95p1ba356jsne52e36e39442',
			'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
		}
	};
	movieList = [];
	fetch(('https://online-movie-database.p.rapidapi.com/auto-complete?q='+MovieName), options)
		.then(response => response.json())
		.then(data => data.d)
		.then(item =>{
			for (i in item){
				if (item[i].i && item[i].i.imageUrl && item[i].y){
					const Title = item[i].l + " (" + item[i].y +")" 
					const Code  = item[i].id
					const Image = item[i].i.imageUrl
					movieList += 
					`
					<article class = "card">
						<img src="${Image}" alt="${Code}" class="img-fluid">						
						<p class="movie-title">${Title}</p>
					</article>
					`
				}
				elements.innerHTML = movieList;
			}	
					
		})
		.catch(err => console.error(err))	
}

function GenerateMagnet(hash, movie){
	torrent =
	`magnet:?xt=urn:btih:${hash}&dn=${movie}&tr=`+
	+"udp://tracker.cyberia.is:6969/announce&tr="
	+"udp://tracker.port443.xyz:6969/announce&tr="
	+"http://tracker3.itzmx.com:6961/announce&tr="
	+"udp://tracker.moeking.me:6969/announce&tr="
	+"http://vps02.net.orel.ru:80/announce&tr="
	+"http://tracker.openzim.org:80/announce&tr="
	+"udp://tracker.skynetcloud.tk:6969/announce&tr="
	+"https://1.tracker.eu.org:443/announce&tr="
	+"https://3.tracker.eu.org:443/announce&tr="
	+"http://re-tracker.uz:80/announce&tr="
	+"https://tracker.parrotsec.org:443/announce&tr="
	+"udp://explodie.org:6969/announce&tr="
	+"udp://tracker.filemail.com:6969/announce&tr="
	+"udp://tracker.nyaa.uk:6969/announce&tr="
	+"udp://retracker.netbynet.ru:2710/announce&tr="
	+"http://tracker.gbitt.info:80/announce&tr="
	+"http://tracker2.dler.org:80/announce"
    return torrent
}

function zoom(){

	const zoom = document.querySelector(".zoom");
	const original = document.querySelector(".full-image");
	const previews = document.querySelectorAll(".card img");
	
	previews.forEach(preview => {
		preview.addEventListener('click',() => {
			zoom.classList.add('open');
			original.src = preview.getAttribute("src");

			const Code = preview.alt;			
			fillZoom(Code);
		})
	})
	
	zoom.addEventListener("click",(e) => {
		if(e.target.classList.contains("zoom")){
			zoom.classList.remove("open");
		}
	})
}

function fillZoom(Code){
	console.log(Code);
	GetTorrent(Code).then(v =>{
		console.log(v);
		const movieTitle       	= document.querySelector("#movieTitle");
		const movieDescription 	= document.querySelector("#movieDescription");
		const movieRating 		= document.querySelector("#movieRating");
		const movieRuntime 		= document.querySelector("#movieRuntime");
		const movieTorrent 		= document.querySelector("#movieTorrent");

		const description = v.description_full;
		const title = v.title_long;
		const rating = v.rating;
		const runtime = v.runtime;
		const torrent1 = v.torrents[0];
		const torrent2 = v.torrents[1];
		const torrent3 = v.torrents[2];
		
		movieTitle.textContent			= title;
		movieDescription.textContent 	= description;
		movieRating.textContent 		= "Puntuacion: "+rating;
		movieRuntime.textContent 		= "Duracion: "+runtime+"min";
		movieTorrent.textContent 	= torrent1;
	})
}

//Al tocar enter (busca las peliculas)
form.addEventListener('submit', e => {
	e.preventDefault();
	MovieName = checkInputs();
	GetApi(MovieName);
});

//Al clikear en la pelicula (zoom)
elements.addEventListener("click", e => {
	zoom()
});


