const KEY = 'fc23c8db';
const MoviesDb = new MovieDb(KEY);

// tt0848228
//console.log( fetch(`http://www.omdbapi.com/?i=tt0848228&apikey=fc23c8db`));


//const k = MoviesDb.getById('tt0848228').then(response => response.json());
//console.log(k);
 

 MoviesDb.searchName('Avengers')
 .then((success ) =>{
         success.json().then(({Response, Search: movies, totalResults: total}) =>{
                console.log(movies,total);
                const allmovies = [];
                movies.forEach(movie => {

                       const data = MoviesDb.getById(movie.imdbID).then(response => response.json());
                       allmovies.push(data);
                   
                });
                let sum = 0;   

                 Promise.all(allmovies)
                 .then(allData =>{
                         allData.forEach(data =>{
                                                                  
                                 if(data.BoxOffice!=undefined && data.BoxOffice!='N/A' ){
                                         sum+=parseInt(data.BoxOffice.replace('$','').replace(/,/g,''));
                                         
                                 }

                         });
                         
                         console.log("Movies number",allData.length ,"Full BoxOffice ",sum)
                         console.log("BoxOffice average",sum/allData.length);

                                                 
                 }); 
                 
                 
         });              
 });
 
