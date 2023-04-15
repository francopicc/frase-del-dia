
const saveButton = document.getElementById('save-button');
const heartIcon = saveButton.querySelector('i.fa-heart');

if (!(localStorage.getItem('scheme') == 'dark' || localStorage.getItem('scheme') == 'white')) {
  localStorage.setItem('scheme', 'white');
}

if (localStorage.getItem('scheme') == 'dark') {
  heartIcon.style.color = "#ffffff"
  document.querySelector('meta[name="theme-color"]').setAttribute('content', '#0f0f0f');
}

if (localStorage.getItem("scheme") == "white") {
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

if (localStorage.getItem('scheme') == "dark") {
  document.body.style.backgroundColor = "#0F0F0F"
  document.body.style.color = "#ffffff"
  document.getElementsByTagName("i")[0].style.color = "#ffffff"
  document.getElementsByTagName("i")[1].style.color = "#ffffff"
  document.getElementsByTagName("i")[2].style.color = "#ffffff"
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

const background = document.getElementById("background-modal");
const bookmark = document.getElementById("bookmark-saved");
const savedPhrases = document.getElementById("saved-phrases");

function renderBookmark(data) {
  bookmark.innerHTML = "";
  if (!data || data.length === 0) {
    bookmark.innerHTML = "<p>No hay frases guardadas, por ahora...</p>";
    return;
  }
  let pages = "";
  for (let i = 0; i < data.length; i += 4) {
    const page = data
      .slice(i, i + 4)
      .map((item, index) => {
        return `
          <div class="phrase" id="phrase-fav">
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
  renderBookmark(data);
});

background.addEventListener("click", () => {
  bookmark.style.display = "none";
  background.style.display = "none";
  bookmark.innerHTML = "";
});