// Carlos Colmenares
// Diego Sosa
// Juan Pereira
// Manuel Martinez
// Roxana Tejedor
function showAlertSuccess() {
    document.getElementById("alert-success").classList.add("show");
}
 
function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}
 
function validate(){

    let inputs = document.querySelectorAll(".form-control"); 
    let contrasena1 = document.getElementById("password1").value;
    let contrasena2 = document.getElementById("password2").value;
    let check = document.getElementById("terminos").checked;

    //1ra validación: verificamos si algun campo esta vacio con un bucle recorriendo el arreglo de inputs de clase .form-control, en ese caso lanzamos la alerta de error.
    inputs.forEach(input => {   
        if(input.value == ""){
            showAlertError();
        }
    });
    
    //2da validación: verificamos si la contraseña tiene mas de 6 caracteres, si ambas contraseñas son iguales y si está seleccionado el check de terminos, si es asi, se lanza la alerta de exito y en caso contrario se lanza el de error.
    if(contrasena1.length >= 6 && contrasena1 == contrasena2 && check){
        showAlertSuccess();
    }else{
        showAlertError();
    }

}

function restore(){  //Esta funcion restaura los carteles de alerta que son eliminados del index.html al cerrarlos
    document.getElementById("alert-success").remove();
    document.getElementById("alert-danger").remove();
   
    let replace = 
    `<div class="alert alert-success alert-dismissible fade" role="alert" id="alert-success">
        <p>Datos guardados correctamente</p>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onclick="restore()" ></button>
    </div>

    <div class="alert alert-danger alert-dismissible fade" role="alert" id="alert-danger">
        <p>Los datos ingresados no cumplen con los requisitos solicitados</p>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onclick="restore()"></button>
    </div>`
    
    document.querySelector('main').innerHTML += replace;
}