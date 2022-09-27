// Carlos Colmenares
// Juan Botejara
// Wilson Rivas
// Marcos Castiglioni

let lista = []

function mostrar(){
    let elementos = ``;
    if(localStorage.getItem("info")){
        lista = JSON.parse(localStorage.getItem("info"))
        lista.forEach(element => {
        elementos += `<li class="">${element}</li>`
    });
    }else{
        localStorage.setItem("info", '');
    }
    document.getElementById("contenedor").innerHTML = elementos;
}


document.addEventListener("DOMContentLoaded", () =>{
    mostrar();

    document.getElementById("limpiar").addEventListener("click", (event)=>{
        event.preventDefault();
        localStorage.setItem("info", '');
        lista = [];
        mostrar();
    })
    
    document.getElementById("agregar").addEventListener("click", (event) =>{
        event.preventDefault();
        let item = document.getElementById("item");
        if(item.value){
            lista.push(item.value)
            localStorage.setItem("info",JSON.stringify(lista));
            mostrar();
            item.value = '';
        }
    })
})
