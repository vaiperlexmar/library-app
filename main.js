"use strict";

import cardMaker from "./component/bookCardMaker";
import createButton from "./component/createButton";

if (localStorage.getItem("library") === null) {
  localStorage.setItem("library", JSON.stringify([]));
}
const myLibrary = JSON.parse(localStorage.getItem("library"));

console.log(myLibrary);

class Book {
  constructor(title, author, pages, isRead) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.isRead = isRead;
    this.id = Math.random().toString(16).slice(2);
  }
}

const newBookModal = document.querySelector(".modal");
const closeNewBookModal = document.querySelector(".modal__close");
closeNewBookModal.addEventListener("click", () => {
  newBookModal.classList.add("hidden");
});
const modalForm = document.forms[0];

// Submit of new book logic
const submitNewBook = document.querySelector(".modal__submit");

function submitNewBookHandler(e) {
  e.preventDefault();
  const title = modalForm[0].value;
  const author = modalForm[1].value;
  const pages = modalForm[2].value;
  const isRead = modalForm[3].checked;
  const newBook = new Book(title, author, pages, isRead);

  if (myLibrary.length === 0) {
    const addBookEvent = new CustomEvent("bookadded", {
      detail: { bookTitle: title },
    });
    document.dispatchEvent(addBookEvent);
  }
  myLibrary.push(newBook);
  localStorage.setItem("library", JSON.stringify([...myLibrary]));
  libraryEl.appendChild(cardMaker(newBook));

  document.body.classList.remove("modal-open");
  newBookModal.classList.add("hidden");
}

submitNewBook.addEventListener("click", (e) => submitNewBookHandler(e));

function openModalForNewBook() {
  document.body.classList.add("modal-open");
  newBookModal.classList.remove("hidden");
}

// Add content to page
const libraryEl = document.querySelector(".library");

const addBookBtn = createButton(
  `${myLibrary.length === 0 ? "btn_centred" : "btn_add"}`,
  "Add new book"
);
addBookBtn.classList.add("btn_purple");

addBookBtn.addEventListener("click", openModalForNewBook);
document.addEventListener("bookadded", () => {
  addBookBtn.classList.remove("btn_centred");
  addBookBtn.classList.add("btn_add");
  addBookBtn.classList.add("scale-up-center");
  setTimeout(() => addBookBtn.classList.remove("scale-up-center"), 400);
});
libraryEl.appendChild(addBookBtn);

// Checking for books
myLibrary.forEach((element) => {
  libraryEl.appendChild(cardMaker(element));
});

// Remove book from array

document.addEventListener("bookremoved", (event) => {
  const removedBookId = event.detail.bookId;

  const index = JSON.parse(localStorage.getItem("library")).findIndex(
    (book) => book.id === removedBookId
  );
  if (index !== -1) {
    myLibrary.splice(index, 1);
  }

  localStorage.setItem("library", JSON.stringify(myLibrary));

  console.log(removedBookId);

  if (myLibrary.length === 0) {
    addBookBtn.classList.remove("btn_add");
    addBookBtn.classList.add("btn_centred");
    addBookBtn.classList.add("scale-up-center");
    setTimeout(() => addBookBtn.classList.remove("scale-up-center"), 400);
  }
});

// Change read status

document.addEventListener("readstatuschanged", (event) => {
  const changedStatusBook = event.detail.bookId;
  const newStatus = event.detail.bookIsRead;

  const index = JSON.parse(localStorage.getItem("library")).findIndex(
    (book) => book.id === changedStatusBook
  );
  myLibrary[index].isRead = newStatus;

  localStorage.setItem("library", JSON.stringify(myLibrary));
});
