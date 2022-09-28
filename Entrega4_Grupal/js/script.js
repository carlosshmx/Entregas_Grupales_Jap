let info;
let serchResult = [];

let showSpinner = function(){
    try{
      document.getElementById("spinner-wrapper").style.display = "block";
    }catch{
  
    }
    
  }
  
  let hideSpinner = function(){
    try{
      document.getElementById("spinner-wrapper").style.display = "none";
    }catch{
  
    }
  }
  
  let getJSONData = function(url){
      let result = {};
      showSpinner();
      return fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }else{
          throw Error(response.statusText);
        }
      })
      .then(function(response) {
            result.status = 'ok';
            result.data = response;
            hideSpinner();
            return result;
             
      })
      .catch(function(error) {
          result.status = 'error';
          result.data = error;
          hideSpinner();
          return result;
      });
  }

  function buildStarScore(score) {
    let stars = ``;
    for (let i = 0; i < Math.round(score/2); i++) {
      stars += `<span class="fa fa-star checked"></span>`;
    }
    for (let i = 0; i < 5 - Math.round(score/2); i++) {
      stars += `<span class="fa fa-star"></span>`;
    }
    return stars;
  }

  function showGenres(genres){
    let htmlToAdd = "";
    for(genre of genres){
        htmlToAdd += `<li class="list-inline-item">${genre.name}</li>`
    }
    document.getElementById("item-genres").innerHTML = htmlToAdd;
  }

  function alerta(index){
    document.getElementById("offcanvasTopLabel").innerText = serchResult[index].title;
    document.getElementById("item-overview").innerText = serchResult[index].overview;
    showGenres(serchResult[index].genres);
  }

  function showResult(){
    let htmlToAdd = ""
    let i = 0;
    for(let item of serchResult){
        htmlToAdd +=`
            <div class="list-group-item" role="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop" onClick=alerta(${i})>
            <div class="d-flex justify-content-between flex-column flex-md-row ">
            <div class="d-flex">
                <p><b>${item.title}</b></p>
            </div>
            <div>
                ${buildStarScore(item.vote_average)}
            </div>
            </div>
            <div class="">
            <p class="">${item.tagline}</p>
            </div>
        </div> 
        `
        i++;
    }
    document.getElementById("lista").innerHTML = htmlToAdd;

}

function insertData(){



}
  

  document.addEventListener("DOMContentLoaded", async ()=>{
        info = await getJSONData("https://japceibal.github.io/japflix_api/movies-data.json")

        document.getElementById("btnBuscar").addEventListener("click", ()=>{
            serchResult = [];
            let inputText = document.getElementById("inputBuscar").value.toLowerCase();

            if(inputText){
                for(let item of info.data){
                    if((item.title.toLowerCase()).includes(inputText) || (item.tagline.toLowerCase()).includes(inputText) || (item.overview.toLowerCase()).includes(inputText) || item.genres.some(genre =>{(genre.name.toLowerCase()).includes(inputText)})){

                        serchResult.push(item)
                    }else{
                        for(let genre of item.genres){
                            if((genre.name.toLowerCase()).includes(inputText)){
                                serchResult.push(item)
                            }
                        }
                    }
                }
                showResult();
            }

        })

  })