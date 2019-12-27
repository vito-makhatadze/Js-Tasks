//  Book Class: Represents a Book

 class User {
    constructor(id, name, username, email) {
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

    static addUserToList(user) {
    

       const list = document.querySelector('#book-list')

       const row = document.createElement('tr')

       row.innerHTML = `
           <td>${user.name}</td>
           <td>${user.username}</td>
           <td>${user.email}</td>
           <td>${user.id}</td>
           <td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>
           <td><a href="#" class="btn btn-primary btn-sm update">Update</a></td>
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
        document.querySelector('#id').value = ''
    }
}


class Store {
    static getUsers() {
        return new Promise((resolve, reject) => {
            fetch('https://jsonplaceholder.typicode.com/users').then(response => {
                resolve(response.json());
            }).catch(err => {
                // Do something for an error here
            });
        })
    }

    static addUser(user) {
        fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            body: JSON.stringify({
              name: user.name,
              username: user.username,
              email: user.email
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })
          .then(response => response.json())
          .then(json => console.log(json))
    }

    static removeUser(id) {
       const users = Store.getUsers();

       users.forEach((user, index) => {
           if (user.id === id) {
               users.splice(index, 1)
           }
       })

       localStorage.setItem('users', JSON.stringify(users))
    }
}


document.querySelector('#book-list').addEventListener('click', (e)=> {
    UI.deleteUser(e.target)

    Store.removeUser(e.target.parentElement.previousElementSibling.textContent)
    UI.showAlert('User deleted', 'danger')
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
    const id = document.querySelector('#id').value

    // Validate
    if(name === '' || username === '' || email === '' || id === '') {
        UI.showAlert('Please fill in all fields', 'danger')
    } else {
    // Instatiate book
     const user = new User(name, username, email, id)

    // Add book to UI
    UI.addUserToList(user);

    // Add book to store
    Store.addUser(user)

    UI.showAlert('User Added', 'success')

    // Clear fiels

    UI.clearFields()
    }
})