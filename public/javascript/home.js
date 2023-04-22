
const saveButton = document.getElementById('save-button');
const heartIcon = saveButton.querySelector('i.fa-heart');
const background = document.getElementById("background-modal");
const bookmark = document.getElementById("bookmark-saved");
const savedPhrases = document.getElementById("saved-phrases");

const scheme = localStorage.getItem('scheme');

if (!['dark', 'white'].includes(scheme)) {
  localStorage.setItem('scheme', 'white');
}

if (scheme === 'dark') {
  heartIcon.style.color = "#ffffff"
  document.querySelector('meta[name="theme-color"]').setAttribute('content', '#0f0f0f');
} else {
  document.getElementById("bookmark-saved").style.color = "rgb(213 213 213)"
  document.querySelector('meta[name="theme-color"]').setAttribute('content', '#ffffff');
}

const frases = [
  "Acompaña estas buenas frases con un buen café ☕",
  "Al buen tiempo, le vienen unas buenas frases también...",
  "Una frase cada día, gratis y simple.",
  "Unos buenos mates también acompañan a las frases 🧉",
  "Un café caliente y una frase inspiradora, ¿qué más necesitas?",
  "No hay nada como una buena frase para empezar el día con el pie derecho",
  "Comienza tu día con una sonrisa y una frase motivadora",
  "Las palabras tienen poder, elige las que te inspiren",
  "Una frase positiva puede cambiar tu perspectiva del día",
  "Las buenas frases son como la música para el alma",
];

document.getElementById("randomDesc").textContent = frases[Math.floor(Math.random()*frases.length)];

if (localStorage.getItem('scheme') === "dark") {
  document.body.style.backgroundColor = "#0F0F0F"
  document.body.style.color = "#ffffff"
  document.getElementsByTagName("i")[0].style.color = "#ffffff"
  document.getElementsByTagName("i")[1].style.color = "#ffffff"
  document.getElementsByTagName("i")[2].style.color = "#ffffff"
  document.getElementsByTagName("i")[3].style.color = "#ffffff"
}

document.getElementById("dark-mode-turn").addEventListener("click", () => {
  if (localStorage.getItem('scheme') == "white") {
    document.body.style.backgroundColor = "#0F0F0F"
    document.body.style.color = "#ffffff"
    document.getElementsByTagName("i")[0].style.color = "#ffffff"
    document.getElementsByTagName("i")[1].style.color = "#ffffff"
    document.getElementsByTagName("i")[2].style.color = "#ffffff"
    localStorage.setItem('scheme', 'dark');
    document.getElementsByTagName("i")[0].classList = "fa-solid fa-sun fa-xl"
    heartIcon.style.color = "#ffffff"
    document.getElementById("bookmark-saved").style.color = "#ffffff"
    document.querySelector('meta[name="theme-color"]').setAttribute('content', '#0F0F0F');
    document.getElementById("supportPage").style.color = "#cfcfcf"
    document.getElementById("supportPage").style.backgroundColor = "#424242"
    document.getElementsByTagName("i")[3].style.color = "#ffffff"
  } else {
    document.body.style.backgroundColor = "#ffffff"
    document.body.style.color = "#000000"
    document.getElementsByTagName("i")[0].style.color = "#000000"
    document.getElementsByTagName("i")[1].style.color = "#000000"
    document.getElementsByTagName("i")[2].style.color = "#000000"
    localStorage.setItem('scheme', 'white');
    document.getElementsByTagName("i")[0].classList = "fa-solid fa-moon fa-xl"
    heartIcon.style.color = "black"
    document.querySelector('meta[name="theme-color"]').setAttribute('content', '#ffffff');
    document.getElementById("supportPage").style.color = "#0f0f0f"
    document.getElementById("supportPage").style.backgroundColor = "#f3f3f3"
    document.getElementsByTagName("i")[3].style.color = "#000000"
  }
})

// Obtenemos el botón HTML
let likedQuotes = JSON.parse(localStorage.getItem('likedQuotes')) || [];

// Agregamos un controlador de eventos de clic al botón
saveButton.addEventListener('click', function () {
  // Obtenemos el icono del corazón dentro del botón
  const phrase = {
    phrase: document.getElementById("phrase").textContent,
    author: document.getElementById("author").textContent,
    liked: false,
    date: Date.now()
  }
  if (!(phrase.phrase == '' && phrase.author == '')) {
    // Buscar la cita correspondiente en el array de citas favoritas
    const index = likedQuotes.findIndex(q => q.phrase === phrase.phrase && q.author === phrase.author);

    // Si la cita ya existe en el array de citas favoritas y está marcada como "liked", cambiarla a "unliked"
    if (index !== -1 && likedQuotes[index].liked) {
      likedQuotes[index].liked = false;
      saveButton.classList.remove('liked');
      heartIcon.classList.replace('fa-solid', 'fa-regular');
      // Eliminar la cita del array de citas favoritas
      likedQuotes.splice(index, 1);
    } else { // Si la cita no existe en el array de citas favoritas o está marcada como "unliked", marcarla como "liked"
      if (index === -1) {
        likedQuotes.push(phrase);
      } else {
        likedQuotes[index].liked = true;
      }
      saveButton.classList.add('liked');
      heartIcon.classList.replace('fa-regular', 'fa-solid');
      if (localStorage.getItem('scheme') == "dark") {
        heartIcon.style.color = "white";
      }
    }
    // Guardar el array de citas favoritas en el localStorage
    localStorage.setItem('likedQuotes', JSON.stringify(likedQuotes));
  }
});

// Verificar si la cita ya está en el array de citas favoritas y actualizar el botón y el ícono en consecuencia.
const currentPhrase = {
  phrase: document.getElementById("phrase").textContent,
  author: document.getElementById("author").textContent,
}

const currentFavorited = likedQuotes.find(q => q.phrase === currentPhrase.phrase && q.author === currentPhrase.author);
if (currentFavorited) {
  saveButton.classList.add('liked');
  saveButton.querySelector('i.fa-heart').classList.replace('fa-regular', 'fa-solid');
  if (localStorage.getItem('scheme') == 'dark') {
    saveButton.querySelector('i.fa-heart').style.color = "white";
  } else {
    saveButton.querySelector('i.fa-heart').style.color = "black";
  }
}

function getDateDiff(date) {
  const now = new Date();
  const diffInMs = now - date;

  if (diffInMs < 60000) { // Menos de 1 minuto
    return "UNOS SEGUNDOS";
  } else if (diffInMs < 3600000) { // Menos de 1 hora
    const diffInMins = Math.floor(diffInMs / 60000);
    return `${diffInMins} ${diffInMins > 1 ? "MINUTOS" : "MINUTO"}`;
  } else if (diffInMs < 86400000) { // Menos de 1 día
    const diffInHours = Math.floor(diffInMs / 3600000);
    return `${diffInHours} ${diffInHours > 1 ? "HORAS" : "HORA"}`;
  } else { // 1 día o más
    const diffInDays = Math.floor(diffInMs / 86400000);
    return `${diffInDays} ${diffInDays > 1 ? "DÍAS" : "DÍA"}`;
  }
}

function renderBookmark(data) {
  bookmark.innerHTML = "";
  if (!data || data.length === 0) {
    bookmark.innerHTML = "<p>No hay frases guardadas, por ahora...</p>";
    return;
  }
  let pages = "";
  for (let i = 0; i < data.length; i += 4) {
    const page = data
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(i, i + 4)
      .map((item, index) => {
        return `
          <div class="phrase" id="phrase-fav">
            <div id="phraseDetailsBook">
              <i class="fa-solid fa-clock"></i>
              <label class="date-add-phrase" id="date-phrase-added">AGREGADA HACE ${getDateDiff(item.date)}</label>
            </div>
            <p class="phrase-text" id="phrase-text-fav">${item.phrase}</p>
            <div class="config-phrase">
              <p class="phrase-author" id="phrase-author-fav">${item.author}</p>
              <button class="delete-button" id="delete-phrase" data-index="${
                i + index
              }"><i class="fa-solid fa-trash"></i></button>
            </div> 
          </div>
        `;
      })
      .join("");
    pages += `<div class="page">${page}</div>`;
  }
  bookmark.innerHTML = pages;
  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const index = parseInt(event.target.getAttribute("data-index"));
      data.splice(index, 1);
      localStorage.setItem("likedQuotes", JSON.stringify(data));
      renderBookmark(data);
    });
  });
}

savedPhrases.addEventListener("click", () => {
  const data = JSON.parse(localStorage.getItem("likedQuotes"));
  bookmark.style.display = "initial";
  background.style.display = "initial";
  bookmark.style.width = "715px";
  bookmark.style.height = "400px";
  bookmark.style.overflowY = "overlay"
  renderBookmark(data);
});

background.addEventListener("click", () => {
  bookmark.style.display = "none";
  background.style.display = "none";
  bookmark.innerHTML = "";
});

// Compartir

let imagen = "";

const generateInstagramStory = (text, subtext) => {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1920;
  const context = canvas.getContext('2d');

  // Dibujar un fondo gris
  context.fillStyle = '#0F0F0F';
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Ajustar el tamaño de fuente al ancho del canvas
  let fontSize = 60;

  // Agregar texto en el centro del canvas con saltos de línea y espaciado a los lados
const textWidth = canvas.width * 0.8; // Ancho del texto al 80% del canvas
context.fillStyle = '#FFFFFF';
context.font = `bold ${fontSize}px PT Serif`;
context.textAlign = 'center';
const lineHeight = fontSize * 1.2; // Altura de línea
const maxLines = Math.floor(canvas.height / lineHeight) - 2; // Máximo de líneas en el canvas, dejando espacio para el texto adicional
let words = text.split(' ');
let line = '';
let lines = [];
while (words.length > 0 && lines.length < maxLines) {
  while (context.measureText(`${line} ${words[0]}`).width < textWidth) {
    line += `${words.shift()} `;
    if (words.length === 0) {
      break;
    }
  }
  lines.push(line.trim());
  line = '';
}
const startY = (canvas.height - ((lines.length + 1) * lineHeight)) / 2; // Agregar espacio para el texto adicional
lines.forEach((line, index) => {
  context.fillText(line, canvas.width / 2, startY + (index * lineHeight));
});



  // Agregar texto de subtitulo debajo del texto principal
  fontSize = 40;
  context.font = `${fontSize}px PT Serif`;
  context.fillText(subtext, canvas.width / 2, startY + ((lines.length + 0.5) * lineHeight));
  context.fillStyle = '#CCCCCC';

  // Agregar texto del pie de página debajo del subtitulo
  const footerText = "La frase del día";
  fontSize = 42.5;
  context.font = `${fontSize}px PT Serif`;
  const footerY = startY + ((lines.length + 10.5) * lineHeight); // Posición del pie de página
  context.fillText(footerText, canvas.width / 2, footerY);
  context.fillStyle = '#CCCCCC';

  // Crear una imagen a partir del canvas
  const image = new Image();
  image.src = canvas.toDataURL();

  imagen = image;

  // Devolver la imagen generada
  return image;
};

document.getElementById("share-button").addEventListener("click", () => {
  const text = document.getElementById("phrase").textContent;
  const autor = document.getElementById("author").textContent;
  bookmark.style.display = "initial";
  background.style.display = "initial";
  bookmark.style.height = "600px";
  bookmark.style.width = "350px";
  bookmark.style.overflowY = "hidden"
  const image = generateInstagramStory(text, autor);
  imagen = image.src;
  bookmark.innerHTML = `
    <div id="phraseQuoteImage">
      <img src="${imagen}" width="275" />
    </div>
    <div id="info-img-download">
      <p id="info-img-p">Descargar la imagen y subir a historias, o tambien publicaciones ☕</p>
      <div id="download-img-div">
        <a href="${imagen}" id="a-download" download="instagram-story.png" target="_blank">
          <div id="button-download-img">
            <i class="fa-solid fa-circle-down fa-xl"></i>
            <p>Descargar imagen</p>
          </div>
        </a>
      </div>
    </div>
  `;
});