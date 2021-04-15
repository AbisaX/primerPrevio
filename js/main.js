const news_list = document.querySelector("#lista-noticias");
const sports_news_list = document.querySelector("#lista-noticias-deportes");
const technology_news_list = document.querySelector("#lista-noticias-tecnologia");
const button_noticias = document.querySelector("#boton-noticias");
const div = document.createElement("div");

async function leer(url) {
  try {
    let response = await fetch(url);
    let user = await response.json();
    return user;
  } catch (err) {
    alert(err);
  }
}

function mostrarNoticias() {
  eliminarNoticias();
  img.src = data[0].imagen;
  var url = "http://demo6497253.mockable.io/noticias";
  leer(url).then((usuarios) => {
    for (var i = 0; i < 3; i++) {
      const article = document.createElement("article");
      article.innerHTML += `
                  <h5>${usuarios[i].titulo} - ${usuarios[i].categoria} - ${usuarios[i].fecha}</h5>
                  <p>${usuarios[i].descripcion}. <a href="#">Ver mas</a></p>
            `;
      news_list.appendChild(article);
    }
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
  leer(url).then((usuarios) => {
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
}

function mostrarNoticiasTecnologia() {
}

function eliminarNoticias() {
  news_list.innerHTML = ``;
}

mostrarNoticias();
mostrarNoticiasDeporte();
mostrarNoticiasTecnologia();