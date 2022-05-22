console.log("hello world")

const login = document.getElementById("login")
const email = document.getElementById("email")
const password = document.getElementById("pass")
const confirmPassword = document.getElementById("cPass")
const button = document.getElementById("button-register")


let labelLogin = document.getElementById("label-login")
let labelEmail = document.getElementById("label-email")
let labelPass = document.getElementById("label-pass")
let labelCPass = document.getElementById("label-cPass")

let validEmail = false
let validPass = false 
let validLogin = false 
let validConfirmPass = false 

function createObjLogin() {
    const obj = {
        login: login.value,
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value
    }
    return obj
}

function getData() {
    const get = JSON.parse(localStorage.getItem("db_users")) ?? []
    return get
}

function setData(value) {
    const set = localStorage.setItem("db_users", JSON.stringify(value))
    return set
}

function registerUser(user) {
    const dbUsers = getData()
    dbUsers.push(user)
    setData(dbUsers)
}

function readUser() {
    const read = getData()
    return read
}

function verifyLogin() {
    if(login.value.length < 6){
        labelLogin.innerText = "Coloque um login válido!"
        login.setAttribute("style", "border-color: red; display: block")
        labelLogin.setAttribute("style", "color: red; font-weight: bold; text-transform: uppercase")
        validLogin =  false 
    } else {
        labelLogin.innerText = "Login"
        labelLogin.setAttribute("style", "color: green")
        login.setAttribute("style", "border-color: green")
        validLogin = true 
    }
}

function verifyEmail() {
    if(email.value.length < 10){
        labelEmail.innerText = "Coloque um email válido!"
        labelEmail.setAttribute("style", "color: red; text-transform: uppercase; font-weight: bold")
        email.setAttribute("style", "border-color: red")
        validEmail = false 
    } else {
        labelEmail.innerText = "E-mail"
        labelEmail.setAttribute("style", "color: green;")
        email.setAttribute("style", "border-color: green")
        validEmail = true 
    }
}

function verifyPass() {
    if(password.value.length < 6){
        labelPass.innerText = "Senha muito curta!"
        labelPass.setAttribute("style", "color: red; text-transform: uppercase; font-weight: bold")
        password.setAttribute("style", "border-color: red")
        validPass =  false 
    } else {
        labelPass.innerText = "Senha"
        labelPass.setAttribute("style", "color: green")
        password.setAttribute("style", "border-color: green")
        validPass = true 
    }
}

function verifyConfirmPass() {
    if(password.value.length !== confirmPassword.value.length){
        labelCPass.innerText = "Senhas não conferem!"
        labelCPass.setAttribute("style", "color: red; font-weight: bold; text-transform: uppercase")
        confirmPassword.setAttribute("style", "border-color: red")
        validConfirmPass = false 
    } else {
        labelCPass.innerText = "Confirmar Senha"
        labelCPass.setAttribute("style", "color: green")
        confirmPassword.setAttribute("style", "border-color: green")
        validConfirmPass = true 
    }
}   

function verifyFields(login, email, pass, confirmPass) {
    if(login === "" || email === "" || pass === "" || confirmPass === ""){
        alert("Verifique se você preencheu todos os campos!")
    } else if (!login || !email || !pass || !confirmPass) {
        alert("Campos incorretos! Verifique se preencheu todos os campos corretamente!")
    } else if (validLogin === true && validEmail === true && validPass === true && validConfirmPass === true){
        alert("Conta criada com sucesso!")
        registerUser(createObjLogin())
        window.location.href = "home.html"
    }
}

login.addEventListener("keyup", verifyLogin)

email.addEventListener("keyup", verifyEmail)

password.addEventListener("keyup", verifyPass)

confirmPassword.addEventListener("keyup", verifyConfirmPass)

button.addEventListener("click", (e) => {
    verifyFields(login.value, email.value, password.value, confirmPassword.value)
    e.preventDefault()
})
