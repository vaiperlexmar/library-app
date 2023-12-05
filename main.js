"use strict";

import cardMaker from "./component/CardMaker";

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

function addBookToTheLibrary() {
  // do stuff here
}

// Add content to page
const libraryEl = document.querySelector(".library");

myLibrary.forEach((element) => {
  libraryEl.appendChild(cardMaker(element));
});
