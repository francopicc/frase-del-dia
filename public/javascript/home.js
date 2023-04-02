const saveButton = document.getElementById('save-button');
const heartIcon = saveButton.querySelector('i.fa-heart');

if (!(localStorage.getItem('scheme') == 'dark' || localStorage.getItem('scheme') == 'white')) {
  localStorage.setItem('scheme', 'white');
}

if (localStorage.getItem('scheme') == 'dark') {
  heartIcon.style.color = "#ffffff"
  document.getElementsByTagName("i")[3].style.color = "white"
  if(document.getElementsByTagName("i")[3].classList.value == "fa-solid fa-heart fa-lg" && document.getElementsByTagName("i")[3].style.color == "black") {
    document.getElementsByTagName("i")[3].style.color = "white"
  }
  document.querySelector('meta[name="theme-color"]').setAttribute('content', '#0f0f0f');
}

if (localStorage.getItem("scheme") == "white") {
  document.getElementById("bookmark-saved").style.color = "rgb(213 213 213)"
  document.querySelector('meta[name="theme-color"]').setAttribute('content', '#ffffff');
}
 

document.getElementById("bell-turn").addEventListener("click", () => {
  function checkMidnightInBuenosAires() {
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 22, 1, 0);
    const midnightInBuenosAires = midnight.toLocaleString('en-US', {
      timeZone: 'America/Argentina/Buenos_Aires'
    });
    const isMidnight = (new Date(midnightInBuenosAires)).getTime() === now.getTime();
    const phrase = document.getElementById("phrase").textContent;
    const author = document.getElementById("author").textContent;
    if (isMidnight && Notification.permission === 'granted') {
      const notification = new Notification('La frase del día de hoy es:', {
        body: `${phrase} ${author}`,
      });
    }
  }
  if (Notification.permission == 'default') {
    const alertBell = alert("Establece las notificaciones con: para siempre, de lo contrario, las notificaciones no llegaran.");
    if (alertBell == undefined) {
      Notification.requestPermission();
    }
  }

  if (Notification.permission == 'denied') {
    alert("Las notificaciones estan bloqueadas/desactivadas, necesitaremos acceso para enviarte una frase cada día.")
  }

  setInterval(checkMidnightInBuenosAires, 60000);
})

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
  } else {
    document.body.style.backgroundColor = "#ffffff"
    document.body.style.color = "#000000"
    document.getElementsByTagName("i")[0].style.color = "#000000"
    document.getElementsByTagName("i")[1].style.color = "#000000"
    document.getElementsByTagName("i")[2].style.color = "#000000"
    localStorage.setItem('scheme', 'white');
    document.getElementsByTagName("i")[0].classList = "fa-solid fa-moon fa-xl"
    heartIcon.style.color = "#000000"
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
    liked: false
  }
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
  saveButton.querySelector('i.fa-heart').style.color = "black";
}

const background = document.getElementById("background-modal");
const bookmark = document.getElementById("bookmark-saved");

document.getElementById("saved-phrases").addEventListener("click", () => {
  const data = JSON.parse(localStorage.getItem("likedQuotes"))
  bookmark.style.display = "initial"
  background.style.display = "initial"
  bookmark.innerHTML = ''
  data.forEach(item => {
    bookmark.innerHTML += 
    `
    <div id="phrase-fav">
      <p id="phrase-text-fav">${item.phrase}</p>
      <p id="phrase-author-fav">- ${item.author}</p>
    </div>
    `
  })
})

document.getElementById("background-modal").addEventListener("click", () => {
  bookmark.style.display = "none"
  background.style.display = "none"
  bookmark.innerHTML = ''
})