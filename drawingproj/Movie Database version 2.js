async function getResultTemplate() {
    return fetch("result.html")
	    .then(response => response.text());
}

async function getMovies() {
    return fetch("movies.json")
	    .then(response => response.json());
}

function drawMovie(movies){
    return Math.floor(Math.random() * movies.length);
}

function formatTemplate(movies, choice, result_template) {
	movie = movies[choice];
	result = result_template.replace("{number}", choice+1)
				.replace("{name}", movie["movNam"])
	            .replace("{rating}", movie["rating"])
				.replace(/{imdb_id}/g, movie["imdbID"])
				.replace(/{youtube_id}/g, movie["movtra"])
				.replace("{image_link}", movie['image']);
	console.log(result);
	return result;	
}

async function draw (){
	movies = await getMovies();
	result_template = await getResultTemplate();
	let movarr=[]
	movarr.forEach(function(movarr){
		
		while (movarr.length < 3) {
			lotNum=drawMovie()
			if(!movarr.includes(lotNum,0)){
				movarr.push(lotNum)
			}
		}
	
	choice = drawMovie(movies);
	result = formatTemplate(movies, choice, result_template);
	document.querySelector("div.results").innerHTML += result;})
}

(async() => {draw()})();