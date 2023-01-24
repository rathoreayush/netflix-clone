//Definig constant, Api key, ApiEnd Point, Api Path
const apikey="6f526342750030370855e91170a08827";
const apiEndPoint= "https://api.themoviedb.org/3";
const imgPath= "https://image.tmdb.org/t/p/original"
const apiPaths={
    fetchAllCatogories : `${apiEndPoint}/genre/movie/list?api_key=${apikey}`,
    fetchMovieList:(id)=>`${apiEndPoint}/discover/movie?api_key=${apikey}`,
}
// Start Booting My app

function init(){
    fetchAndBuildAllMovieSection();
}
// function for fetch for all movies
function fetchAndBuildAllMovieSection(){
    fetch(apiPaths.fetchAllCatogories)
    .then(res=>res.json())
    .then(res=>{
        const categories=res.genres
        if(Array.isArray(categories)&& categories.length){
            categories.forEach(categories=>{
                fetchAndBuildMovieSection(apiPaths.fetchMovieList(categories.id),
                categories); // calling function for fetching Movie categories wise
            });
        }
        console.table(categories);
    })
    .catch(err=>console.log(err));   
}

//calling function for fetching Movie categories wise
function fetchAndBuildMovieSection(fetchUrl,categories){
    console.log(fetchUrl,categories);
    fetch(fetchUrl)
    .then(res=>res.json())
    .then(res=>{
        console.table(res.results);
        const movies=res.results;
        if(Array.isArray(categories)&& categories.length){
            buildMoviesSection(movies,categories.name);
        }
    })
    .catch(err=>console.log(err))
} 
// calling another function to print html list
function buildMoviesSection(list,categoryName){
   const movieCont=document.getElementById("movies-cont");
   const movieListHtml=list.map(item=>{
    return    ` <img class="movie-item" src="${imgPath}${item.backdrop_path}" alt="${item.title}">`
   }).join('');

   const movieSectionHtml= `
   
<h2 class="movie-section-heading">${categoryName} <span class="explore-nudge">Explore All</span></h2>
<div class="movie-row">
${movieListHtml}

</div>
   `
   console.log(movieSectionHtml);
   const div=document.createElement('div');
   div.className="movies-section"
   div.className=movieSectionHtml;


   // Append html into container
   movieCont.append(div);
}

window.addEventListener('load',function(){
    init();
})

