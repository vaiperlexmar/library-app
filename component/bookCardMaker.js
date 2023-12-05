"use strict";

import createButton from "./createButton";

function updateButtonAppearance(book, button) {
  if (book.isRead) {
    button.classList.remove("btn_red");
    button.classList.add("btn_purple");
    button.textContent = "Read";
  } else {
    button.classList.remove("btn_purple");
    button.classList.add("btn_red");
    button.textContent = "Not read";
  }
}

function bookCardMaker(book) {
  const cardBlock = document.createElement("div");
  cardBlock.classList.add("book");

  // Make card content
  const bookTitle = document.createElement("h2");
  const bookAuthor = document.createElement("h3");
  const bookPages = document.createElement("p");
  const bookIsReadBtn = createButton("book__is-read-btn", "", () => {
    book.isRead = !book.isRead;
    updateButtonAppearance(book, bookIsReadBtn);
    console.log(`Читал нет? ${book.isRead}`);
  });
  const bookRemoveBtn = createButton("book__remove-btn");

  // Add styling class
  bookTitle.classList.add("book__title");
  bookAuthor.classList.add("book__author");
  bookPages.classList.add("book__pages");

  bookTitle.textContent = book.title;
  bookAuthor.textContent = book.author;
  bookPages.textContent = `${book.pages} pages`;
  bookIsReadBtn.textContent = book.isRead
    ? (bookIsReadBtn.classList.add("btn_purple"), "Read")
    : (bookIsReadBtn.classList.add("btn_red"), "Not read");
  bookRemoveBtn.textContent = "Remove";

  // Add it in card
  cardBlock.appendChild(bookTitle);
  cardBlock.appendChild(bookAuthor);
  cardBlock.appendChild(bookPages);
  cardBlock.appendChild(bookIsReadBtn);
  cardBlock.appendChild(bookRemoveBtn);

  return cardBlock;
}

export default bookCardMaker;
