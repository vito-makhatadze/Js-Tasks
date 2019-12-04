import Library from './Library';

const lib = new Library();

const addAuthorBtn = document.querySelector('#btn-add-author');
const addBookForm = document.querySelector('#addBookForm');
const authoInput = document.querySelector('#new-author-input');
const asd = document.querySelector('#delete-author');

authoInput.onkeyup = function(e){
  if (e.keyCode === 13){
    addAuthor();
  }
}
addAuthorBtn.onclick = function(){
  addAuthor();
};
addBookForm.onsubmit = function(e){
  e.preventDefault();
  const inputs = addBookForm.querySelectorAll('[name]');
  const bookObject = {};
  inputs.forEach(input => {
    bookObject[input.name] = input.value;
  });

  lib.addBook(bookObject);

};

function addAuthor(){
  if (authoInput.value){
    lib.addAuthor(authoInput.value);
    authoInput.value = '';
  }
}