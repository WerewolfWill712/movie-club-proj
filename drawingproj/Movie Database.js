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
	result = result_template.replace("{number}", choice)
				.replace("{name}", movie["movNam"])
	            .replace("{rating}", movie["rating"])
				.replace("{imbd_id}", movie["imbdID"])
				.replace("{youtube_id}", movie["movtra"])
				.replace("{image_link}", movie['image']);
	console.log(result);
	return result;	
}

async function draw (){
	movies = await getMovies();
	result_template = await getResultTemplate();

	for(let i = 0; i < 3; i++) {
		choice = drawMovie(movies);
		result = formatTemplate(movies, choice, result_template);
		document.querySelector("div.results").innerHTML += result;
	}
}

(async() => {draw()})();
