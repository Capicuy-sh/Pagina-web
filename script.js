// ESTRUCTURA DE LOS 200 PÁRRAFOS (Resumido por temas para el ejemplo)
const temas = {
    primeraGuerra: Array(50).fill("La Primera Guerra Mundial, iniciada en 1914, cambió el mapa de Europa para siempre. Las trincheras se convirtieron en el símbolo de un conflicto estancado y brutal. El asesinato del archiducate Francisco Fernando fue el detonante de una serie de alianzas militares. Las nuevas tecnologías, como los tanques y gases químicos, hicieron de esta la primera guerra industrializada."),
    hitler: Array(50).fill("Adolf Hitler ascendió al poder en una Alemania devastada por la crisis económica de 1929. Su ideología se basó en el nacionalismo extremo y el antisemitismo. En 1933 fue nombrado canciller, disolviendo rápidamente las instituciones democráticas. Su expansión militar hacia Polonia en 1939 dio inicio a la Segunda Guerra Mundial, el conflicto más mortífero de la historia."),
    torresGemelas: Array(50).fill("El 11 de septiembre de 2001, el mundo presenció el ataque terrorista más impactante en suelo estadounidense. Dos aviones comerciales impactaron las Torres Gemelas del World Trade Center en Nueva York. Este evento cambió las políticas de seguridad global y dio inicio a la Guerra contra el Terrorismo. La zona donde se encontraban las torres es hoy un memorial llamado 'Ground Zero'."),
    brainrots: Array(50).fill("El término 'Brainrot' se refiere al consumo masivo de contenido digital de baja calidad que afecta la atención. Fenómenos como 'Skibidi Toilet' o jergas de TikTok han definido la cultura de la Generación Alpha. Se analiza cómo los algoritmos de video corto moldean el cerebro de los jóvenes. Esta subcultura internetera es un reflejo de la velocidad y el absurdo de la era digital actual.")
};

// Imágenes (20 imágenes, una cada 10 párrafos)
const imagenes = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Ferdinand_assassination_color.jpg/400px-Ferdinand_assassination_color.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/British_Mark_IV_Tadpole_tank.jpg/400px-British_Mark_IV_Tadpole_tank.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Bundesarchiv_Bild_183-S33882%2C_Adolf_Hitler.jpg/300px-Bundesarchiv_Bild_183-S33882%2C_Adolf_Hitler.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/World_Trade_Center%2C_New_York_City_-_view_from_Park_Row.jpg/300px-World_Trade_Center%2C_New_York_City_-_view_from_Park_Row.jpg",
    "https://via.placeholder.com/800x400?text=Cultura+Internet+1",
    // ... añade aquí el resto de tus 20 URLs de imágenes
];

function abrirArticulo() {
    document.getElementById('inicio').classList.add('oculto');
    document.getElementById('articulo').classList.remove('oculto');
    
    let htmlFinal = "<h1>Gran Crónica Histórica</h1>";
    const todosLosParrafos = [...temas.primeraGuerra, ...temas.hitler, ...temas.torresGemelas, ...temas.brainrots];
    
    todosLosParrafos.forEach((p, index) => {
        htmlFinal += `<p>${index + 1}. ${p}</p>`;
        // Insertar imagen cada 10 párrafos
        if ((index + 1) % 10 === 0 && imagenes[Math.floor(index / 10)]) {
            htmlFinal += `<img src="${imagenes[Math.floor(index / 10)]}" alt="Imagen Historica ${index}">`;
        }
    });
    
    document.getElementById('contenido-wiki').innerHTML = htmlFinal;
}

// --- LÓGICA DEL QUIZ (20 PREGUNTAS) ---
const preguntas = [
    { p: "¿En qué año comenzó la Primera Guerra Mundial?", o: ["1914", "1939", "1918"], c: 0 },
    { p: "¿Qué evento detonó la Gran Guerra?", o: ["Invasión de Polonia", "Asesinato del Archiduque", "Bombardeo de Londres"], c: 1 },
    { p: "¿Quién fue nombrado canciller de Alemania en 1933?", o: ["Stalin", "Hitler", "Churchill"], c: 1 },
    { p: "¿Qué ciudad sufrió el ataque del 11 de septiembre?", o: ["Washington", "Nueva York", "Los Ángeles"], c: 1 },
    { p: "¿A qué se refiere el término 'Brainrot'?", o: ["Enfermedad médica", "Contenido digital de baja calidad", "Un tipo de música"], c: 1 },
    // ... añade aquí las otras 15 preguntas siguiendo el mismo formato
];

let actual = 0;
let aciertos = 0;
let fallos = 0;

function abrirQuiz() {
    document.getElementById('inicio').classList.add('oculto');
    document.getElementById('quiz').classList.remove('oculto');
    mostrarPregunta();
}

function mostrarPregunta() {
    if(actual >= preguntas.length) {
        document.getElementById('quiz').innerHTML = `<h2>Fin del Quiz</h2><p>Javier Martínez, lograste ${aciertos} aciertos y ${fallos} fallos.</p><button onclick="location.reload()">Reiniciar</button>`;
        return;
    }
    const q = preguntas[actual];
    document.getElementById('q-progreso').innerText = `Pregunta ${actual + 1} de 20`;
    document.getElementById('q-texto').innerText = q.p;
    let btnHtml = "";
    q.o.forEach((opt, i) => btnHtml += `<button class="opcion-btn" id="opc-${i}" onclick="verificar(${i})">${opt}</button>`);
    document.getElementById('q-opciones').innerHTML = btnHtml;
    document.getElementById('q-feedback').classList.add('oculto');
    document.getElementById('btn-siguiente').classList.add('oculto');
}

function verificar(i) {
    const feedback = document.getElementById('q-feedback');
    document.querySelectorAll('.opcion-btn').forEach(b => b.disabled = true);
    if(i === preguntas[actual].c) { aciertos++; feedback.innerText = "¡Correcto!"; feedback.className = "feedback-correcto"; }
    else { fallos++; feedback.innerText = "Incorrecto"; feedback.className = "feedback-incorrecto"; }
    feedback.classList.remove('oculto');
    document.getElementById('btn-siguiente').classList.remove('oculto');
}

function siguientePregunta() { actual++; mostrarPregunta(); }
function volver() { location.reload(); }
