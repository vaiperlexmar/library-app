"use strict";

import cardMaker from "./component/bookCardMaker";
import createButton from "./component/createButton";

const myLibrary = [
  { author: "George Orwell", title: "1984", pages: 315, isRead: true },
  {
    author: "J.R.R. Tolkien",
    title: "The Lord of the Rings",
    pages: 676,
    isRead: true,
  },
  {
    author: "Khaled Hosseini",
    title: "The Kite Runner",
    pages: 294,
    isRead: false,
  },
  {
    author: "J.K. Rowling",
    title: "Harry Potter and the Philosopher's Stone",
    pages: 432,
    isRead: true,
  },
  {
    author: "Kurt Vonnegut",
    title: "Slaughterhouse-Five",
    pages: 762,
    isRead: false,
  },
];

function Book(author, title, pages, isRead) {
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
const submitNewBook = document.querySelector(".modal__submit");

function addBookToTheLibrary() {
  document.body.classList.add("modal-open");
  newBookModal.classList.remove("hidden");

  submitNewBook.addEventListener("click", (e) => {
    e.preventDefault();
    const author = modalForm[0].value;
    const title = modalForm[1].value;
    const pages = modalForm[2].value;
    const isRead = modalForm[3].checked;
    const newBook = new Book(author, title, pages, isRead);
    myLibrary.push(newBook);
    libraryEl.appendChild(cardMaker(newBook));
    document.body.classList.remove("modal-open");
    newBookModal.classList.add("hidden");
  });
}

// Add content to page
const libraryEl = document.querySelector(".library");
const addBookBtn = createButton(
  `${myLibrary.length === 0 ? "btn_centred" : "btn_add"}`,
  "Add new book",
  addBookToTheLibrary
);
addBookBtn.classList.add("btn_purple");

libraryEl.appendChild(addBookBtn);
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
