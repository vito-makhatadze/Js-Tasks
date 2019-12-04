export default class Library {

  constructor() {
    this.authors = [];
    this.books = [];
    this.listGroup = document.querySelector('#authors');
    this.authorSelect = document.querySelector('#addBookForm select[name=author]');
    this.booksTbody = document.querySelector('#books > tbody');
    this.rowBook = new Map()
    this.rowAuthor = new Map()
  }

  addAuthor(authorName) {
    if (this.authors.indexOf(authorName) === -1){
      this.authors.push(authorName);
      const row = document.createElement('tr')
      row.innerHTML = `
      <tr>
      <td>${authorName}</td>
      <td><button class="btn btn-danger author-delete">Delete</button></td>
      </tr>
      `
      this.listGroup.appendChild(row)
      this.rowAuthor.set(row, authorName)

      const button = row.querySelector('.author-delete')

      button.addEventListener('click', (e) => {
        this.deleteAuthor(button.parentElement.parentElement)
      })

      this.makeSelect();
    }
  }
  deleteAuthor (tr) {
    const authorName = this.rowAuthor.get(tr)
    this.books.splice(this.books.indexOf(authorName, 1))
    tr.remove()
  }

  makeSelect(){
    this.authorSelect.innerHTML = this.authors.map(author => `<option>${author}</option>`).join('');
  }

  addBook(bookObject) {
    this.books.push(bookObject);
    const row = document.createElement('tr')
    row.innerHTML = `
      <td>${bookObject.author}</td>
      <td>${bookObject.title}</td>
      <td>${bookObject.price}</td>
      <td>${bookObject.numberOfPages}</td>
      <td><button class="btn btn-danger btn-delete">Delete</button></td>
    `

  this.booksTbody.appendChild(row)

  this.rowBook.set(row, bookObject)

  const button = row.querySelector('.btn-delete')

  button.addEventListener('click', (e) => {
    this.deleteBook(button.parentElement.parentElement)
  })
  }
  deleteBook(tr) {
    const bookObject = this.rowBook.get(tr)
    this.books.splice(this.books.indexOf(bookObject, 1))
    tr.remove()
  }

  searchBook(text) {
    const filteredBooks = this.books.filter(book => book.title.indexOf(text) > -1);
  }
}