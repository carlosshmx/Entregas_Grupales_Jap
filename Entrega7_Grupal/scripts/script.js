const url_global = "https://6361a838af66cc87dc2fd80f.mockapi.io/users/"



let getJSONData = function (url = "",
    method = "GET", 
    body) {
    let result = {};
    // showSpinner();
    return fetch(url_global + url,
        {
            method, headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(function (response) {
            result.status = 'ok';
            result.data = response;
            //   hideSpinner();
            return result;

        })
        .catch(function (error) {
            result.status = 'error';
            result.data = error;
            // hideSpinner();
            return result;
        });
}

function createHtml(lista) {
    let content = "";
    lista.forEach(e => {
        content += `
        <li>
            <div>
                ID: ${e.id}
                <br>
                NAME: ${e.name}
                <br>
                LASTNAME: ${e.lastname}
            </div>
            <br>
        </li>
        `
    });
    document.getElementById("results").innerHTML = content

}

async function listar() {
    let resultado = await getJSONData();
    console.log(resultado);
    createHtml(resultado.data)
}

async function obtener(user_id) {
    let resultado = await getJSONData(user_id);
    console.log(resultado);
    createHtml([resultado.data])
}

async function agregar({name, lastname}) {
    let resultado = await getJSONData("", "POST", {name, lastname});
    listar();
}

async function modificar(id, {name, lastname}) {
    let resultado = await getJSONData(id, "PUT", {name, lastname});
    listar();
}


async function borrar(id) {
    let resultado = await getJSONData(id, "DELETE");
    listar();

}

document.getElementById("btnGet1").addEventListener("click", () =>{
    let input = document.getElementById("inputGet1Id").value;
    input? obtener(input) : listar();

})

let nameIn = document.getElementById("inputPostNombre")
let lastname = document.getElementById("inputPostApellido")
nameIn.addEventListener("input", ()=>{
    if(nameIn.value && lastname.value){
        document.getElementById("btnPost").removeAttribute('disabled');
    }else{
        document.getElementById("btnPost").setAttribute('disabled', '');
    }
})  
lastname.addEventListener("input", ()=>{
    if(nameIn.value && lastname.value){
        document.getElementById("btnPost").removeAttribute('disabled');
    }else{
        document.getElementById("btnPost").setAttribute('disabled', '');
    }
})  

document.getElementById("btnPost").addEventListener("click", ()=>{
    agregar({name:nameIn.value, lastname:lastname.value});

})

let modificarIn = document.getElementById("inputPutId")

modificarIn.addEventListener("input", (event)=>{
    // event.target.value
    if(event.target.value){
        document.getElementById("btnPut").removeAttribute('disabled');
    }else{
        document.getElementById("btnPut").setAttribute('disabled', '')
    }
})

