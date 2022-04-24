const books = []
const RENDER_EVENT = 'render-book'
const STORAGE_KEY = 'bookshelf'
const SAVED_EVENT = 'saved'

const navReadNotCompleted = document.getElementById('btn-read-not-completed')
const navReadCompleted = document.getElementById('btn-read-completed')
const uncompletedReadBook = document.getElementById('read-not-completed')
const completedReadBook = document.getElementById('read-completed')

const searchBook = document.getElementById('search-book')

navReadNotCompleted.addEventListener('click', function () {
    uncompletedReadBook.style.display = 'block'
    completedReadBook.style.display = 'none'

    navReadNotCompleted.classList.add('active')
    navReadCompleted.classList.remove('active')
})

navReadCompleted.addEventListener('click', function () {
    uncompletedReadBook.style.display = 'none'
    completedReadBook.style.display = 'block'

    navReadNotCompleted.classList.remove('active')
    navReadCompleted.classList.add('active')
})

searchBook.addEventListener('keyup', function () {
    const searchText = searchBook.value.toLowerCase()
    const filteredBooks = books.filter(function (book) {
        return book.title.toLowerCase().includes(searchText)
    })
    renderBooks(filteredBooks)
})

document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('form')
    submitForm.addEventListener('submit', function (event) {
        event.preventDefault()
        addBook()
    })

    if (isStorageExist()) {
        loadDataFromStorage()
    }
})

document.addEventListener(RENDER_EVENT, function () {
    renderBooks(books)
})

document.addEventListener(SAVED_EVENT, function () {
    localStorage.getItem(STORAGE_KEY)
})

function renderBooks (bookList) {
    uncompletedReadBook.innerHTML = ''

    completedReadBook.innerHTML = ''
    
    for (bookItem of bookList) {
        if (bookItem.isComplete)
            completedReadBook.innerHTML += `
            <li id="${bookItem.id}">
            <div>
                <h2>${bookItem.title}</h2>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" id="Outline" viewBox="0 0 24 24" width="15" height="15"><path d="M12,12A6,6,0,1,0,6,6,6.006,6.006,0,0,0,12,12ZM12,2A4,4,0,1,1,8,6,4,4,0,0,1,12,2Z"/><path d="M12,14a9.01,9.01,0,0,0-9,9,1,1,0,0,0,2,0,7,7,0,0,1,14,0,1,1,0,0,0,2,0A9.01,9.01,0,0,0,12,14Z"/></svg><span class="book-info">${bookItem.author}</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon date-svg" viewBox="0 0 24 24" width="15" height="15"><path d="M19,2H18V1a1,1,0,0,0-2,0V2H8V1A1,1,0,0,0,6,1V2H5A5.006,5.006,0,0,0,0,7V19a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V7A5.006,5.006,0,0,0,19,2ZM2,7A3,3,0,0,1,5,4H19a3,3,0,0,1,3,3V8H2ZM19,22H5a3,3,0,0,1-3-3V10H22v9A3,3,0,0,1,19,22Z"/><circle cx="12" cy="15" r="1.5"/><circle cx="7" cy="15" r="1.5"/><circle cx="17" cy="15" r="1.5"/></svg><span class="book-info">${bookItem.year}</span>
            </div>
            <div class="button-book-list">
                <svg xmlns="http://www.w3.org/2000/svg" class="button-icon button-not-completed" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="40" height="40" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve"><g>
                <g xmlns="http://www.w3.org/2000/svg">
                    <path d="M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.615,256-256C511.847,114.678,397.322,0.153,256,0z    M341.333,311.189c8.669,7.979,9.229,21.475,1.25,30.144c-7.979,8.669-21.475,9.229-30.144,1.25c-0.434-0.399-0.85-0.816-1.25-1.25   L256,286.165l-55.168,55.168c-8.475,8.185-21.98,7.95-30.165-0.525c-7.984-8.267-7.984-21.373,0-29.64L225.835,256l-55.168-55.168   c-8.185-8.475-7.95-21.98,0.525-30.165c8.267-7.984,21.373-7.984,29.64,0L256,225.835l55.189-55.168   c7.979-8.669,21.475-9.229,30.144-1.25c8.669,7.979,9.229,21.475,1.25,30.144c-0.399,0.434-0.816,0.85-1.25,1.25L286.165,256   L341.333,311.189z" fill="#ff492f" data-original="#000000"/>
                </g></g>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" class="button-icon button-delete" id="Outline" viewBox="0 0 24 24" width="40" height="40"><path d="M21,4H17.9A5.009,5.009,0,0,0,13,0H11A5.009,5.009,0,0,0,6.1,4H3A1,1,0,0,0,3,6H4V19a5.006,5.006,0,0,0,5,5h6a5.006,5.006,0,0,0,5-5V6h1a1,1,0,0,0,0-2ZM11,2h2a3.006,3.006,0,0,1,2.829,2H8.171A3.006,3.006,0,0,1,11,2Zm7,17a3,3,0,0,1-3,3H9a3,3,0,0,1-3-3V6H18Z"/><path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18Z"/><path d="M14,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z"/></svg>
            </div>
            </li>`
        else
            uncompletedReadBook.innerHTML += `
            <li id="${bookItem.id}">
            <div>
                <h2>${bookItem.title}</h2>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" id="Outline" viewBox="0 0 24 24" width="15" height="15"><path d="M12,12A6,6,0,1,0,6,6,6.006,6.006,0,0,0,12,12ZM12,2A4,4,0,1,1,8,6,4,4,0,0,1,12,2Z"/><path d="M12,14a9.01,9.01,0,0,0-9,9,1,1,0,0,0,2,0,7,7,0,0,1,14,0,1,1,0,0,0,2,0A9.01,9.01,0,0,0,12,14Z"/></svg><span class="book-info">${bookItem.author}</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon date-svg" viewBox="0 0 24 24" width="15" height="15"><path d="M19,2H18V1a1,1,0,0,0-2,0V2H8V1A1,1,0,0,0,6,1V2H5A5.006,5.006,0,0,0,0,7V19a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V7A5.006,5.006,0,0,0,19,2ZM2,7A3,3,0,0,1,5,4H19a3,3,0,0,1,3,3V8H2ZM19,22H5a3,3,0,0,1-3-3V10H22v9A3,3,0,0,1,19,22Z"/><circle cx="12" cy="15" r="1.5"/><circle cx="7" cy="15" r="1.5"/><circle cx="17" cy="15" r="1.5"/></svg><span class="book-info">${bookItem.year}</span>
            </div>
            <div class="button-book-list">
                <svg xmlns="http://www.w3.org/2000/svg" class="button-icon button-completed" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="40" height="40" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve"><g>
                    <g xmlns="http://www.w3.org/2000/svg">
                        <path d="M405.333,0H106.667C47.786,0.071,0.071,47.786,0,106.667v298.667C0.071,464.214,47.786,511.93,106.667,512h298.667   C464.214,511.93,511.93,464.214,512,405.333V106.667C511.93,47.786,464.214,0.071,405.333,0z M426.667,172.352L229.248,369.771   c-16.659,16.666-43.674,16.671-60.34,0.012c-0.004-0.004-0.008-0.008-0.012-0.012l-83.563-83.541   c-8.348-8.348-8.348-21.882,0-30.229s21.882-8.348,30.229,0l83.541,83.541l197.44-197.419c8.348-8.318,21.858-8.294,30.176,0.053   C435.038,150.524,435.014,164.034,426.667,172.352z" fill="#0e96ff" data-original="#000000"/>
                    </g></g>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" class="button-icon button-delete" id="Outline" viewBox="0 0 24 24" width="40" height="40"><path d="M21,4H17.9A5.009,5.009,0,0,0,13,0H11A5.009,5.009,0,0,0,6.1,4H3A1,1,0,0,0,3,6H4V19a5.006,5.006,0,0,0,5,5h6a5.006,5.006,0,0,0,5-5V6h1a1,1,0,0,0,0-2ZM11,2h2a3.006,3.006,0,0,1,2.829,2H8.171A3.006,3.006,0,0,1,11,2Zm7,17a3,3,0,0,1-3,3H9a3,3,0,0,1-3-3V6H18Z"/><path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18Z"/><path d="M14,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z"/></svg>
            </div>
            </li>`
    }

    const btnCompleted = document.querySelectorAll('.button-completed')
    const btnNotCompleted = document.querySelectorAll('.button-not-completed')
    const btnDelete = document.querySelectorAll('.button-delete')

    if (btnCompleted.length !== 0) {
        for (let i=0; i<btnCompleted.length; i++) {
            btnCompleted[i].addEventListener('click', function () {
                const bookId = btnCompleted[i].parentNode.parentNode.id
                const book = books.find(book => book.id == bookId)
                book.isComplete = true
                document.dispatchEvent(new Event(RENDER_EVENT))
                saveData()
            })
        }
    }

    if (btnNotCompleted.length !== 0) {
        for (let i=0; i<btnNotCompleted.length; i++) {
            btnNotCompleted[i].addEventListener('click', function () {
                const bookId = btnNotCompleted[i].parentNode.parentNode.id
                const book = books.find(book => book.id == bookId)
                book.isComplete = false
                document.dispatchEvent(new Event(RENDER_EVENT))
                saveData()
            })
        }
    }

    if (btnDelete.length !== 0) {
        for (let i=0; i<btnDelete.length; i++) {
            btnDelete[i].addEventListener('click', function () {
                if (confirm('Yakin akan dihapus?')) {
                    const bookId = btnDelete[i].parentNode.parentNode.id
                    const book = books.find(book => book.id == bookId)
                    const bookIndex = books.indexOf(book)
                    books.splice(bookIndex, 1)
                    document.dispatchEvent(new Event(RENDER_EVENT))
                    saveData()
                }
            })
        }
    }
}

function isStorageExist() {
    if (typeof (Storage) === undefined) {
        alert('Browser kamu tidak mendukung local storage')
        return false
    }

    return true
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY)
    let data = JSON.parse(serializedData)
   
    if (data !== null) {
        for (book of data) {
            books.push(book)
        }
    }
   
    document.dispatchEvent(new Event(RENDER_EVENT))
}

function addBook() {
    const titleBook = document.getElementById('title').value
    const authorBook = document.getElementById('penulis').value
    const yearBook= document.getElementById('tahun').value
    let isCompleted = document.getElementById('selesai').value

    if (isCompleted === 'true') {
        isCompleted = true
    } else {
        isCompleted = false
    }
   
    const generatedID = +new Date()
    const bookObject = {
        id: generatedID, 
        title: titleBook, 
        author: authorBook, 
        year: yearBook, 
        isComplete: isCompleted
    }
    books.push(bookObject)
   
    document.dispatchEvent(new Event(RENDER_EVENT))
    saveData()
}

function saveData() {
    if (isStorageExist()) {
        const parsed = JSON.stringify(books)
        localStorage.setItem(STORAGE_KEY, parsed)
        document.dispatchEvent(new Event(SAVED_EVENT))
    }
}