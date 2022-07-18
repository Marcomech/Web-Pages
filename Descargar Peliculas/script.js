function checkInputs() {
	const MovieName = fMovie.value;
	return MovieName.replaceAll(" ","-");
}

function GetApi(MovieName){
	const options = {
		method: 'GET',

	};
	return new Promise(function(resolve, reject) {
		movieList = [];
		fetch(('https://yts.mx/api/v2/list_movies.json?sort_by=download_count&query_term='+MovieName), options)
			.then(response => response.json())
			.then(data => data.data.movies)
			.then(item =>{
				resolve(item)
			})
			.catch(err => console.error(err))	
	}) 
}

function fillDisplay(item){
	const elements = document.getElementById("elements");
	movieList = [];
	item.forEach(x => {
		if (x.medium_cover_image && x.large_cover_image){
			
				const Title 	= x.title_long
				const BigImage  = x.large_cover_image
				const Image 	= x.medium_cover_image
				const rating	= x.rating
				const runtime	= x.runtime
				const summary	= x.summary
				const torrent   = x.torrents

				movieList += 
				`
				<article class = "card">
					<img src="${Image}" alt="${BigImage}" class="img-fluid">						
					<p Id="MovieTitle">${Title}</p>
					<p hidden Id="rating">${rating}</p>
					<p hidden Id="runtime">${runtime}</p>
					<p hidden Id="summary">${summary}</p>`
					
				torrent.forEach(t=>{
					movieList += 
					`<p hidden href="${t.hash}" alt="${t.size}" Id="torrent">${t.quality}</p>`
				})	
				movieList += 
				`
				</article>
				`
		}
	})
	elements.innerHTML = movieList;
}

function zoom(){

	const zoom = document.querySelector(".zoom"); 
	const previews = document.querySelectorAll(".card");
	
	previews.forEach(preview => {
		preview.addEventListener('click',() => {
			fillZoom(preview);
			zoom.classList.add('open');
		})
	})
	
	zoom.addEventListener("click",(e) => {
		if(e.target.classList.contains("zoom")){
			zoom.classList.remove("open");
		}
	})
}

function fillZoom(Card){
	const torrents = document.getElementById("torrents");
	const Title 	= Card.querySelector("#MovieTitle");
	const Summary 	= Card.querySelector("#summary");
	const Rating    = Card.querySelector("#rating");
	const Runtime 	= Card.querySelector("#runtime");
	const Image 	= Card.querySelector("img");
	const Torrent 	= Card.querySelectorAll("#torrent");
	
	const movieTitle		 = document.querySelector("#movieTitle"); 
	const movieDescription	 = document.querySelector("#movieDescription"); 
	const movieRating		 = document.querySelector("#movieRating"); 
	const movieRuntime		 = document.querySelector("#movieRuntime"); 
	const movieImage 		 = document.querySelector(".full-image");

	movieTitle.textContent			= Title.textContent;
	movieDescription.textContent 	= Summary.textContent;
	movieRating.textContent 		= "Puntuacion: "+Rating.textContent;
	movieRuntime.textContent 		= "Duracion: "+Runtime.textContent+"min";
	movieImage.src 					= Image.alt;
	
	torrentList =[];
	qualityes = []
	Torrent.forEach(t=>{
		if(qualityes.indexOf(t.textContent) === -1 && t.textContent!= "3D"){
			const magnet = GenerateMagnet(t.getAttribute('href'), Title.textContent);
			torrentList +=
				`<a href="${magnet}" Id="torrent">${t.textContent}</a>`;
			qualityes += [t.textContent]
		}
	})
	torrents.innerHTML = torrentList;
	
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
//funcionamiento con la aplicacion

//inicio
GetApi("").then(item =>{
	fillDisplay(item);
})

//Busqueda

form.addEventListener('submit', e => {
	e.preventDefault();
	MovieName = checkInputs();
	GetApi(MovieName).then(item =>{
		fillDisplay(item);
	})
});

//Zoom
elements.addEventListener("click", e => {
	zoom()
})