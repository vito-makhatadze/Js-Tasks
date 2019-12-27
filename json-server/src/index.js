//  Book Class: Represents a Book

 class User {
    constructor(name, username, email, id) {
       this.id = id
       this.name = name
       this.username = username
       this.email = email
    }
}

// UI Class: Handle UI Tasks
class UI {
    static displayUsers() {


        // let users = await Store.getUsers()
        // users.forEach((user) => UI.addUserToList(user))
        let users
        
        Store.getUsers().then(usersReponse => {
            users = usersReponse
            console.log(users)
            users.forEach((user) => UI.addUserToList(user))
        })

    }
    static updateUser(id) {
        let user 

        Store.getUsersById(id).then(usersResponse => {
            user = usersResponse
            document.querySelector('#update-name').value = user.name
            document.querySelector('#update-username').value = user.username
            document.querySelector('#update-email').value = user.email
            document.querySelector('#update-id').value = user.id
        })
    }
    static showAlert(message, className) {
        const div = document.createElement('div')
        div.className = `alert alert-${className}`
        div.appendChild(document.createTextNode(message))
        const container = document.querySelector('.container')
        const form = document.querySelector('#book-form')
        container.insertBefore(div, form)


        // Vanish in 3 seconds

        setTimeout(() => 
            document.querySelector('.alert').remove(), 3000)
    }

    static viewUserList(id) {

        let user

        Store.getUsersById(id).then(usersResponse => {
            user = usersResponse
            
            const list = document.querySelector('#view-list')
            list.innerHTML = ""

            const row = document.createElement('tbody')
            

            // row.innerHTML = `      <td>${user.name}</td>
            // <td>${user.username}</td>
            // <td>${user.email}</td>
            // <td>${user.id}</td>`
            
            row.innerHTML = `
                <tr>
                    <th>Name</th>
                    <td>${user.name}</td>
                </tr>
                <tr>
                    <th>Username</th>
                    <td>${user.username}</td>
                </tr>
                <tr>
                     <th>Email</th>
                    <td>${user.email}</td>
                </tr>
                <tr>
                    <th>ID</th>
                    <td>${user.id}</td>
                 </tr>
            
            `
            
            list.appendChild(row)
        })
    }
    static addUserToList(user) {
    
       const list = document.querySelector('#book-list')

       const row = document.createElement('tr')

       row.innerHTML = `
           <td>${user.name}</td>
           <td>${user.username}</td>
           <td>${user.email}</td>
           <td>${user.id}</td>
           <td><button class="btn btn-danger btn-sm delete" value="delete">Delete</button></td>
           <td><button type="button" class="btn btn-primary" data-toggle="modal" value="update" data-target="#exampleModal">
           update
         </button></td>
         <td><button type="button" class="btn btn-warning" data-toggle="modal" value="view" data-target="#viewModal">
         View
       </button></td>
       `
       list.appendChild(row)
    }
    static deleteUser(el) {
       if(el.classList.contains('delete')) {
           el.parentElement.parentElement.remove();
       }
    }
    static clearFields() {
        document.querySelector('#name').value = ''
        document.querySelector('#username').value = ''
        document.querySelector('#email').value = ''
    }
}


class Store {
    static getUsers() {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:3000/users').then(response => {
                resolve(response.json());
            }).catch(err => {
                // Do something for an error here
            });
        })
    }

    static getUsersById(id) {
        return new Promise((resolve, reject) => {
            fetch(`http://localhost:3000/users/${id}`).then(response => {
                resolve(response.json());
            }).catch(err => {
                // Do something for an error here
            });
        })
    }

    static addUser(user) {
        fetch('http://localhost:3000/users', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })
          .then(response => response.json())
          .then(json => console.log(json))
    }
    static updateUser(user, id) {

        fetch(`http://localhost:3000/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: {
            "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => response.json())
        .then(json => console.log(json))
    }
    static removeUser(id) {
         fetch(`http://localhost:3000/users/${id}`, {
            method: 'DELETE'
          })
    }
}


document.querySelector('#book-list').addEventListener('click', (e)=> {
    if (e.target.value === "delete") {
        UI.deleteUser(e.target)

        Store.removeUser(e.target.parentElement.previousElementSibling.textContent)
        UI.showAlert('User deleted', 'danger') 
    } else if (e.target.value === "update") {
        // console.log(e.target.parentElement.nextElementSibling.textContent)
        
        UI.updateUser(e.target.parentElement.previousElementSibling.previousElementSibling.textContent)
        
    } else if (e.target.value === "view") {
        UI.viewUserList(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent)
    }
})

document.querySelector('#update-user').addEventListener('click', (e) => {
    const name = document.querySelector('#update-name').value
    const username = document.querySelector('#update-username').value
    const email = document.querySelector('#update-email').value
    const id = document.querySelector('#update-id').value
    
    const user = new User(name,username, email,)

    Store.updateUser(user, id)

})

 // Event: Display Books
 document.addEventListener('DOMContentLoaded', UI.displayUsers)

 // Event: Add a Book

document.querySelector('#book-form').addEventListener('submit', (e) => {
    //Prevent actual submit
    e.preventDefault();

    // Get firt values
    const name = document.querySelector('#name').value
    const username = document.querySelector('#username').value
    const email = document.querySelector('#email').value

    // Validate
    if(name === '' || username === '' || email === '') {
        UI.showAlert('Please fill in all fields', 'danger')
    } else {
    // Instatiate book
     const user = new User(name, username, email)

    // Add book to UI
    UI.addUserToList(user);

    // Add book to store
    Store.addUser(user)

    UI.showAlert('User Added', 'success')

    // Clear fiels

    UI.clearFields()
    }
})