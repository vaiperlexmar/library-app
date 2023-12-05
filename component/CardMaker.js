"use strict";

function cardMaker(book) {
  const cardBlock = document.createElement("div");
  cardBlock.classList.add("book");

  // Make card content
  const bookTitle = document.createElement("h2");
  const bookAuthor = document.createElement("h3");
  const bookPages = document.createElement("p");
  const bookIsReadBtn = document.createElement("button");
  const bookRemoveBtn = document.createElement("button");

  // Add styling class
  bookTitle.classList.add("book__title");
  bookAuthor.classList.add("book__author");
  bookPages.classList.add("book__pages");
  bookIsReadBtn.classList.add("btn");
  bookRemoveBtn.classList.add("btn");
  bookIsReadBtn.classList.add("book__is-read-btn");
  bookRemoveBtn.classList.add("book__remove-btn");

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

export default cardMaker;
