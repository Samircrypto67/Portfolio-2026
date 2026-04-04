/* =========================
   INITIALISATION
========================= */
document.addEventListener("DOMContentLoaded", function() {
    // Afficher l'écran de chargement pendant 5 secondes
    setTimeout(function() {
        hideLoadingScreen();
        // Puis initialiser toutes les animations Matrix
        setTimeout(function() {
            initMatrixRain();
            initTerminalTyping();
            initSoundEffects();
            initPillChoices();
            initCountdownBTS();
            initParcoursTyping();
            init3DAnimations();
            initEasterEgg();
        }, 500); // Petit délai après la disparition du loading
    }, 5000); // 5 secondes de chargement
});

/* =========================
   ECRAN DE CHARGEMENT
========================= */
function hideLoadingScreen() {
    const loadingScreen = document.getElementById("loading-screen");
    if (loadingScreen) {
        loadingScreen.style.animation = "loadingExit 1s ease-in-out forwards";
        setTimeout(function() {
            loadingScreen.style.display = "none";
        }, 1000);
    }
}


/* =========================
   TERMINAL MATRIX (typing)
========================= */
function initTerminalTyping() {

    const terminal = document.getElementById("terminal");
    if (!terminal) return;

    const terminalText = [
        "Connexion à la matrice...",
        "Chargement du portfolio...",
        "Accès autorisé...",
        "Bienvenue Samir."
    ];

    let line = 0;
    let letter = 0;

    function typing() {

        if (line < terminalText.length) {

            if (letter < terminalText[line].length) {

                terminal.innerHTML += terminalText[line][letter];
                letter++;

                setTimeout(typing, 40);

            } else {

                terminal.innerHTML += "<br>";
                line++;
                letter = 0;

                setTimeout(typing, 400);

            }

        }

    }

    typing();

}


/* =========================
   PLUIE MATRIX (FIXED FULL SCREEN)
========================= */
function initMatrixRain() {

    const canvas = document.getElementById("matrix");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const letters = "アイウエオカキクケコサシスセソ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const matrix = letters.split("");

    let fontSize = 16;
    let columns;
    let drops = [];

    function resizeCanvas() {

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        columns = Math.floor(canvas.width / fontSize);

        drops = [];

        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * canvas.height / fontSize;
        }

    }

    function draw() {

        ctx.fillStyle = "rgba(0,0,0,0.05)";
        ctx.fillRect(0,0,canvas.width,canvas.height);

        ctx.fillStyle = "#00ff00";
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {

            const text = matrix[Math.floor(Math.random() * matrix.length)];

            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {

                drops[i] = 0;

            }

            drops[i]++;

        }

    }

    resizeCanvas();

    setInterval(draw, 33);

    window.addEventListener("resize", resizeCanvas);

}


/* =========================
   SON AU CLIC
========================= */
function initSoundEffects() {

    const sound = document.getElementById("clickSound");
    if (!sound) return;

    document.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            sound.currentTime = 0;
            sound.play();

        });

    });

}


/* =========================
   PILULE MATRIX
========================= */
function initPillChoices() {

    const pillMessage = document.getElementById("pillMessage");
    const red = document.querySelector(".red");
    const blue = document.querySelector(".blue");

    if (red && pillMessage) {

        red.onclick = () => {

            pillMessage.innerText =
            "Vous avez choisi la vérité. Bienvenue dans la matrice.";

        };

    }

    if (blue && pillMessage) {

        blue.onclick = () => {

            pillMessage.innerText =
            "Vous restez dans l'illusion.";

        };

    }

}


/* =========================
   COMPTEUR BTS
========================= */
function initCountdownBTS() {

    const element = document.getElementById("daysBTS");
    if (!element) return;

    const startDate = new Date("2026-05-18T00:00:00");
    const endDate = new Date("2026-05-24T23:59:59");

    function updateCountdown() {

        const now = new Date();
        let text = "";

        if (now < startDate) {

            const diff = startDate - now;
            const days = Math.ceil(diff / (1000*60*60*24));

            text = `Jours avant le BTS : ${days}`;

        }

        else if (now >= startDate && now <= endDate) {

            text = "Le BTS se déroule actuellement !";

        }

        else {

            text = "Le BTS est terminé !";

        }

        element.innerText = text;

    }

    updateCountdown();
    setInterval(updateCountdown, 60000);

}


/* =========================
   TYPING PARCOURS
========================= */
function initParcoursTyping() {

    const parcoursText = document.getElementById("parcours-text");
    if (!parcoursText) return;

    const paragraphs = parcoursText.querySelectorAll("p");

    paragraphs.forEach(p => p.style.display = "none");

    let index = 0;

    function showParagraph() {

        if (index >= paragraphs.length) return;

        const p = paragraphs[index];
        const text = p.textContent;

        p.textContent = "";
        p.style.display = "block";

        let char = 0;

        function type() {

            if (char < text.length) {

                p.textContent += text[char];
                char++;

                setTimeout(type, 25);

            } else {

                index++;
                setTimeout(showParagraph, 400);

            }

        }

        type();

    }

    setTimeout(showParagraph, 800);

}


/* =========================
   ANIMATIONS 3D
========================= */
function init3DAnimations() {

    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {

        card.addEventListener('mouseenter', () => {

            card.style.transform =
            'perspective(1000px) rotateY(5deg) rotateX(5deg) scale(1.05)';

        });

        card.addEventListener('mouseleave', () => {

            card.style.transform =
            'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';

        });

    });

    createFloatingElements();

}


function createFloatingElements() {

    for (let i = 0; i < 10; i++) {

        const cube = document.createElement("div");

        cube.className = "floating-cube";

        cube.style.left = Math.random()*100+"%";
        cube.style.top = Math.random()*100+"%";

        document.body.appendChild(cube);

    }

}


/* =========================
   EASTER EGG MATRIX
========================= */
function initEasterEgg() {

    let code = "";

    document.addEventListener("keydown", e => {

        code += e.key.toLowerCase();

        if (code.includes("neo")) {

            alert("Wake up Samir... The Matrix has you.");

            code = "";

        }

    });

}