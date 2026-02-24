/* =====================================================
   PORTFOLIO MATRIX - SCRIPT PRINCIPAL
   Auteur : Samir
   Description :
   - Loader animé
   - Lancement musique
   - Effet pluie Matrix
   - Typing hack sur titres
   - Transitions entre pages
   - Responsive auto
===================================================== */

window.addEventListener("load", function () {

    /* =============================
        LOADER ANIMÉ
    ============================= */
    const loader = document.getElementById("loader");
    const mainContent = document.getElementById("mainContent");

    // Masquer le contenu principal pendant le loader
    if (mainContent) mainContent.style.display = "none";

    if (loader) {
        setTimeout(() => {
            loader.style.opacity = "0";
            loader.style.transition = "opacity 1s ease";

            setTimeout(() => {
                loader.style.display = "none";
                if (mainContent) mainContent.style.display = "block";
            }, 1000);

        }, 3000); // Durée affichage loader 3s
    }

    /* =============================
        TYPING HACK TITRES
    ============================= */
    const titles = document.querySelectorAll(".hack-title");
    titles.forEach(title => {
        const text = title.innerText;
        title.innerText = "";
        let i = 0;

        function typing() {
            if (i < text.length) {
                title.innerText += text.charAt(i);
                const keySound = document.getElementById("keyboardSound");
                if (keySound) keySound.play();
                i++;
                setTimeout(typing, 40); // vitesse du typing
            }
        }
        typing();
    });

    /* =============================
        MUSIQUE MATRIX
    ============================= */
    const audio = document.getElementById("matrixAudio");
    if (audio) {
        // Autoplay si possible
        audio.volume = 0.3; // volume léger
        audio.play().catch(() => {
            // si bloqué, lancement au clic
            document.body.addEventListener("click", () => audio.play(), { once: true });
        });
    }

    /* =============================
        MATRIX RAIN EFFECT
    ============================= */
    const canvas = document.createElement("canvas");
    canvas.id = "matrixCanvas";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const letters = "アァイィウヴエカキクケコサシスセソ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lettersArray = letters.split("");
    const fontSize = 16;
    let columns = Math.floor(canvas.width / fontSize);
    let drops = [];

    function initDrops() {
        columns = Math.floor(canvas.width / fontSize);
        drops = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * canvas.height;
        }
    }

    initDrops();
    window.addEventListener("resize", initDrops);

    function drawMatrix() {
        // Fond noir semi-transparent pour traînée
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#00ff00"; // couleur Matrix
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {
            const text = lettersArray[Math.floor(Math.random() * lettersArray.length)];
            ctx.fillText(text, i * fontSize, drops[i]);

            // Reset colonne
            if (drops[i] > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i] += fontSize;
        }
    }

    setInterval(drawMatrix, 33);

    /* =============================
        TRANSITIONS ENTRE PAGES
    ============================= */
    document.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", function (e) {
            if (this.href) {
                e.preventDefault();
                document.body.style.opacity = 0;
                setTimeout(() => { window.location = this.href; }, 400);
            }
        });
    });
});