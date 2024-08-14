const addForm = document.querySelector(".add-form");
const books = document.querySelector(".books > .container");
const add = document.querySelector(".book.add");
const title = document.querySelector("#title");
const pages = document.querySelector("#pages");
const author = document.querySelector("#author");
const myLibrary = []



document.addEventListener('click', e => {
    if(e.target.id==="add") {
        addForm.style.visibility = "visible";
    } else if (e.target.id==="read") {
        myLibrary[e.target.value].toggleReadStatus(e.target);
    } else if(e.target.id==="delete") {
        delete myLibrary[e.target.value];
        books.removeChild(document.querySelector(`.book[value='${e.target.value}']`));
    }
})


document.addEventListener('submit', e => {
    addBookToLibrary(title.value, author.value, pages.value);
    e.preventDefault();
    addForm.style.visibility ="hidden";
});

function addBookToLibrary(title, author, pages) {
    const book = new Book(title, author, pages);
    myLibrary.push(book);
    const bookElement = document.createElement("div");
    for(e in book) {
        if(typeof book[e] !== "string") continue;
        const n = document.createElement("div");
        n.classList.add("info");
        n.textContent = book[e];
        bookElement.appendChild(n);
    }
    bookElement.classList.add("book");
    books.insertBefore(bookElement, add);
    bookElement.setAttribute("value", `${myLibrary.length-1}`);
    addButtons(bookElement, myLibrary.length-1);
}

function addButtons(bookElement, index) {
    const buttons = document.createElement("div");
    buttons.classList.add("buttons");
    const read = document.createElement("button");
    read.setAttribute("value", `${index}`);
    read.id = "read";
    read.textContent = "Haven't Read";
    const del = document.createElement("button");
    del.setAttribute("value", `${index}`);
    del.id="delete";
    del.textContent = "Delete";
    buttons.appendChild(read);
    buttons.appendChild(del);
    bookElement.appendChild(buttons);
}

function Book(title, author, pages) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = false;
}

function toggleReadStatus(button) {
    if(this.read) {
        this.read=false;
        button.textContent = "Haven't Read";
    } else {
        this.read=true;
        button.textContent ="Have Read";
    }
}


Book.prototype.toggleReadStatus = toggleReadStatus;

