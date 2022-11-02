const form = document.getElementById("form");

function check_password(password2) {
  const password1 = document.getElementById("password1");
  if (password2.value === password1.value && password1.checkValidity()) {
    password2.setCustomValidity("");
  } else {
    password2.setCustomValidity('Debe ser igual a "contraseña"');
  }
}

let enable_tos_validation = false;

function check_tos(terminos) {
  if (!enable_tos_validation) return;
  const btn_terminos_servicio = document.getElementById(
    "btn_terminos_servicio",
  );
  const invalid_terminos = document.getElementById("invalid_terminos_servicio");
  if (!terminos.checked) {
    btn_terminos_servicio.classList.add("text-danger");
    invalid_terminos.style.display = "block";
  } else {
    btn_terminos_servicio.classList.remove("text-danger");
    invalid_terminos.style.display = "none";
  }
}

form.addEventListener(
  "submit",
  function (event) {
    console.log("Envio");
    form.classList.add("was-validated");
    enable_tos_validation = true;
    check_tos(document.getElementById("terminos"));
    if (!form.checkValidity()) {
      event.stopPropagation();
      event.preventDefault();
    }
  },
  false,
);
