class UserApi{
    getAll() {
        return fetch('https://jsonplaceholder.typicode.com/todos/1')
    }
    getById(id){
       return fetch(`http://www.omdbapi.com/?i=${id}&apikey=${this.apiKey}`);
       
        
    }   
    searchName(Avengers){
       return fetch(`http://www.omdbapi.com/?s=${Avengers}&apikey=${this.apiKey}`);
        
    }

}