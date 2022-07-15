const items = document.getElementById("elements");
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

	fetch(`https://movies-and-serials-torrent.p.rapidapi.com/movies/search/${Id}`, options)
		.then(response => response.json())
		.then(data => {
			hashValue = data.data.movies[0].torrents[0].hash;
			return(hashValue)
		})
		.catch(err => console.error(err));
}

function GetApi(MovieName){
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
				const Title = item[i].l + "(" + item[i].y +")" 
				const Code  = item[i].id
				const Image = item[i].i.imageUrl
				//console.log(Title)
				//console.log(Code)
				//console.log(Image)
				if (Image){
					movieList += 
					`
					<article class = "card">
						<img src="${Image}" alt="" class="img-fluid">						
						<p class="movie-title">${Title}</p>
					</article>
					`
				}
				
			}	
			elements.innerHTML = movieList;			
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

form.addEventListener('submit', e => {
	e.preventDefault();
	MovieName = checkInputs();
	GetApi(MovieName); 
});
