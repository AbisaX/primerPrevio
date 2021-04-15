const news_list = document.querySelector("#lista-noticias");
const sports_news_list = document.querySelector("#lista-noticias-deportes");
const technology_news_list = document.querySelector("#lista-noticias-tecnologia");
const button_noticias = document.querySelector("#boton-noticias");
const div = document.createElement("div");

async function leerJSON(url, error = null) {
  try {
    let response = await fetch(url);
    let user = await response.json();
    return user;
  } catch (err) {
    if(error != null){
      alert(error);
    }else{
      alert(err);
    }
  }
}

async function leerJSONObject(url) {
  console.log(url);
  fetch(url)
    .then((resp) => resp.json())
    .then(function (data) {
      console.log(data);
    });
}

function mostrarNoticias() {
  eliminarNoticias();
  let view = 3;
  var url = "http://demo6497253.mockable.io/noticias";
  leerJSON(url).then((usuarios) => {
    usuarios.forEach((e, i) => {
      if (i < view) {
        if (i == 0) {
          let image = document.getElementById("image-header-notice");
          image.setAttribute("src", `${e.img}`);
        }
        const article = document.createElement("article");
        article.innerHTML += `
          <a href="notice.html?id=${e.id}"><h5>${e.titulo} - ${e.categoria} - ${e.fecha}</h5></a>
          <p>${e.descripcion}. <a href="notice.html?id=${e.id}">Ver mas</a></p>
        `;
        news_list.appendChild(article);
      }
    });
  });
  mostrarBoton();
}

function mostrarBoton() {
  div.innerHTML = `
            <button class="btn btn-primary" type="button" onclick="mostrarNoticiasTodas()">Todas
            las Noticias</button>
        `;
  button_noticias.appendChild(div);
}

function mostrarNoticiasTodas() {
  var url = "http://demo6497253.mockable.io/noticias";
  leerJSON(url).then((usuarios) => {
    for (var i = 3; i < usuarios.length; i++) {
      const article = document.createElement("article");
      article.innerHTML += `
                    <h5>${usuarios[i].titulo} - ${usuarios[i].categoria} - ${usuarios[i].fecha}</h5>
                    <p>${usuarios[i].descripcion}. <a href="#">Ver mas</a></p>
                `;
      news_list.appendChild(article);
    }
  });
  ocultarBoton();
}

function ocultarBoton() {
  div.innerHTML = `
              <button class="btn btn-primary" type="button" onclick="mostrarNoticias()">Ocultar Noticias</button>
          `;
  button_noticias.appendChild(div);
}

function mostrarNoticiasDeporte() {
  let parent = document.getElementById("lista-noticias-deportes");
  let divDeport = document.createElement("DIV");
  if (parent != null) {
    var url = "http://demo6497253.mockable.io/categoria/deporte";
    leerJSON(url).then((dep) => {
      if (Array.isArray(dep)) {
        dep.forEach((e, i) => {
          let div = document.createElement("DIV");
          let a = document.createElement("A");
          div.appendChild(a);
          a.innerText = `${e.titulo}`;
          divDeport.appendChild(div);
        });
      }
    });
    parent.appendChild(divDeport);
  }
}

function mostrarNoticiasTecnologia() {
  let parent = document.getElementById("lista-noticias-tecnologia");
  let divDeport = document.createElement("DIV");
  if (parent != null) {
    var url = "http://demo6497253.mockable.io/categoria/tecnologia";
    leerJSON(url).then((dep) => {
      if (Array.isArray(dep)) {
        dep.forEach((e, i) => {
          let div = document.createElement("DIV");
          let a = document.createElement("A");
          div.appendChild(a);
          a.innerText = `${e.titulo}`;
          divDeport.appendChild(div);
        });
      }
    });
    parent.appendChild(divDeport);
  }
}

function eliminarNoticias() {
  news_list.innerHTML = ``;
}

////////////////////////// VIEW NOTICE 

const getParameter = (name) => {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  let regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

const noticeView = (url = "http://demo6497253.mockable.io/noticias/", id = "id") => {
  let parameter = getParameter(id);
  let parent = document.getElementById("lista-noticias");
  url = `${url}${parameter}`;
  leerJSON(url, "No se encontro ninguna noticia.").then((e) => {
    let image = document.getElementById("image-header-notice");
    image.setAttribute("src", `${e.img}`);
    const article = document.createElement("article");
    article.innerHTML += `
      <h5>${e.titulo} - ${e.categoria} - ${e.fecha}</h5>
      <p>${e.descripcion}.</p>
      <p>${e.detalle}.</p>
    `;
    parent.appendChild(article);
  });
}