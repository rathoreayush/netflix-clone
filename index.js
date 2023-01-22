//Definig constant, Api key, ApiEnd Point, Api Path
const apikey="6f526342750030370855e91170a08827";
const apiEndPoint= "https://api.themoviedb.org/3";
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
    })
    .catch(err=>console.log(err))
}

window.addEventListener('load',function(){
    init();
})