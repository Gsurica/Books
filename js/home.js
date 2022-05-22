console.log("hellow world")
const session = sessionStorage.getItem("logged")
const title = document.getElementById("title")
const theme = document.getElementById("tema")
const author = document.getElementById("autor")
const postButton = document.getElementById("post-button")
const deleteAndEdit = document.querySelector("#table-principal > tbody")
const exitButton = document.getElementById("exitButton")


isLogged()

function isLogged() {
    if(!session){
        window.location.href = "login.html"
    }
}

function exit() {
    sessionStorage.removeItem("logged")
}

function clearInputs() {
    const inputs = document.querySelectorAll("input[name='input']")
    return inputs.forEach(element => element.value = "")
}

function createObj(titulo, tema, autor) {
    const obj = {
        tituloObj: titulo,
        temaObj: tema,
        autorObj: autor
    }   
    return obj 
}

function getData() {
    return JSON.parse(localStorage.getItem("db_books")) ?? []
}

function setData(value) {
    return localStorage.setItem("db_books", JSON.stringify(value))
}

function saveOnDb(book) {
    const dbBooks = getData()
    dbBooks.push(book)
    setData(dbBooks)
}

function readData() {
    return getData()
}

function createOnScreen(book, index) {
    const newBook = document.createElement("tr")
    newBook.innerHTML = 
    `
    <tr>
        <td>${book.tituloObj}</td>
        <td>${book.temaObj}</td>
        <td>${book.autorObj}</td>
        <td><button id="${index}" name="delete">Excluir</button></td>
        <td><button id="${index}" name="edit">Editar</button></td>
    </tr>
    `
    document.querySelector("#table-principal > tbody").appendChild(newBook)
}

function loadOnScreen() {
    const dbBooks = getData()
    dbBooks.forEach(createOnScreen)
}

function refresh(){
    window.location.reload()
}

function deleteBook(index){
    const dbBooks = getData()
    dbBooks.splice(index, 1)
    setData(dbBooks)
}

function updateBooks(index) {
    const dbBooks = getData()[index]
    const array = new Array
    array.push(dbBooks)
    array.forEach(element => {
        const titleObj = element.tituloObj
        const themeObj = element.temaObj 
        const authorObj = element.autorObj

        document.getElementById("title").value = titleObj
        document.getElementById("tema").value = themeObj
        document.getElementById("autor").value = authorObj

    })

    deleteBook(index)
}

loadOnScreen()


postButton.addEventListener("click", (e) => {
    e.preventDefault();
    saveOnDb(createObj(title.value, theme.value, author.value))
    clearInputs()
    refresh()
})

deleteAndEdit.addEventListener("click", (e) => {
    if(e.target.type === "submit"){
        if(e.target.name === "delete"){
            const index = e.target.id 
            deleteBook(index)
            refresh()
        }
        if(e.target.name === "edit"){
            const index = e.target.id
            updateBooks(index)
        }
    }
})

exitButton.addEventListener("click", () => {
    exit()
    refresh()
})