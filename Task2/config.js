 class MovieDb{
     constructor(apiKey){
         this.apiKey = apiKey;
     }
     getById(id){
        return fetch(`http://www.omdbapi.com/?i=${id}&apikey=${this.apiKey}`);
        
         
     }
       
     searchName(Avengers){
        return fetch(`http://www.omdbapi.com/?s=${Avengers}&apikey=${this.apiKey}`);
         

     }

 }

