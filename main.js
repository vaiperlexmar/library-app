"use strict";

import cardMaker from "./component/bookCardMaker";
import createButton from "./component/createButton";

const myLibrary = [];

function Book(title, author, pages, isRead) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.isRead = isRead;
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
  const newBook = new Book(author, title, pages, isRead);
  myLibrary.push(newBook);
  console.log(myLibrary);
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

// {TO DO} сделать так, чтобы кнопка убиралась вверх

const addBookBtn = createButton(
  `${myLibrary.length === 0 ? "btn_centred" : "btn_add"}`,
  "Add new book"
);
addBookBtn.classList.add("btn_purple");
addBookBtn.addEventListener("click", openModalForNewBook);
libraryEl.appendChild(addBookBtn);

// Checking for books
myLibrary.forEach((element) => {
  libraryEl.appendChild(cardMaker(element));
});

// Remove book from array

document.addEventListener("bookremoved", (event) => {
  const removedBookTitle = event.detail.bookTitle;

  const index = myLibrary.findIndex((book) => book.title === removedBookTitle);
  if (index !== -1) {
    myLibrary.splice(index, 1);
    console.log(myLibrary[index]);
    console.log(myLibrary);
  }
});
