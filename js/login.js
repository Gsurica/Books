console.log("hello world")

const buttonLogin = document.getElementById("button-login")
const login = document.getElementById("login")
const passWord = document.getElementById("pass")

function getData() {
    const get = JSON.parse(localStorage.getItem("db_users")) ?? []
    return get
}

function readObj(login, password) {
    const dbUsers = getData()
    dbUsers.forEach(element => {
        const loginObj = element.login
        const passObj = element.password
        if(login === loginObj && passObj === password){
            alert("Logado com sucesso!")
            sessionStorage.setItem("logged", loginObj)
            window.location.href = "home.html"
        } else if(login !== loginObj || password !== passObj) {
            alert("login ou senha incorretos!!")
        } else if(login !== loginObj && password !== passObj) {
            alert("Não encontramos contas nesse login! Para entrar, crie uma!")
        }
    })
}

buttonLogin.addEventListener("click", (e) => {
    readObj(login.value, pass.value)
    e.preventDefault()
})
