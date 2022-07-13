const form = document.getElementById('form');
const fsong = document.getElementById('fsong');



form.addEventListener('submit', e => {
	e.preventDefault();
	
	checkInputs();
});

function checkInputs() {
	const SongName = fsong.value.trim();

	
	console.log(SongName)

}
