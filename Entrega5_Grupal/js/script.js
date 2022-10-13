const option = document.getElementById("opcion");
option.addEventListener("click", function (e) {
  e.preventDefault();
  const el = document.getElementById("lista_opciones");
  if (el.classList.contains("d-none")) {
    el.classList.remove("d-none");
  } else {
    el.classList.add("d-none");
  }
});
