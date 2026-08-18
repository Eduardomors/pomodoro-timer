// Configuração dos tempos (em minutos)
const MODOS = {
    pomodoro: { tempo: 25, label: "Foco" },
    short: { tempo: 5, label: "Pausa Curta" },
    long: { tempo: 15, label: "Pausa Longa" }
};

// Estado do timer
let modoAtual = "pomodoro";
let tempoRestante = MODOS.pomodoro.tempo * 60; // em segundos
let tempoTotal = MODOS.pomodoro.tempo * 60;
let intervalo = null;
let rodando = false;

// contadores
let pomodorosHoje = 0;
let minutosHoje = 0;
let historico = [];

// elementos do DOM
const timerDisplay = document.getElementById("timerDisplay");
const btnStart = document.getElementById("btnStart");
const btnReset = document.getElementById("btnReset");
const progressCircle = document.getElementById("progressCircle");
const taskInput = document.getElementById("taskInput");
const currentTask = document.getElementById("currentTask");
const pomodorosCount = document.getElementById("pomodorosCount");
const totalMinutes = document.getElementById("totalMinutes");
const historySection = document.getElementById("historySection");
const historyList = document.getElementById("historyList");
const tabs = document.querySelectorAll(".tab");

// circunferência do circulo SVG (2 * PI * raio)
const CIRCUNFERENCIA = 2 * Math.PI * 90;
progressCircle.style.strokeDasharray = CIRCUNFERENCIA;


function atualizarDisplay() {
    const minutos = Math.floor(tempoRestante / 60);
    const segundos = tempoRestante % 60;
    timerDisplay.textContent = `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;

    // atualiza o titulo da pagina tbm
    document.title = `${timerDisplay.textContent} - Pomodoro`;

    // progresso do circulo
    const progresso = tempoRestante / tempoTotal;
    const offset = CIRCUNFERENCIA * progresso;
    progressCircle.style.strokeDashoffset = CIRCUNFERENCIA - offset;
}


function iniciar() {
    if (rodando) {
        // pausar
        clearInterval(intervalo);
        rodando = false;
        btnStart.textContent = "Continuar";
        return;
    }

    rodando = true;
    btnStart.textContent = "Pausar";

    // salva a tarefa quando inicia
    if (taskInput.value.trim()) {
        currentTask.textContent = `Trabalhando em: ${taskInput.value.trim()}`;
    }

    intervalo = setInterval(() => {
        tempoRestante--;
        atualizarDisplay();

        if (tempoRestante <= 0) {
            clearInterval(intervalo);
            rodando = false;
            timerFinalizado();
        }
    }, 1000);
}


function resetar() {
    clearInterval(intervalo);
    rodando = false;
    tempoRestante = MODOS[modoAtual].tempo * 60;
    tempoTotal = tempoRestante;
    btnStart.textContent = "Iniciar";
    atualizarDisplay();
}


function trocarModo(modo) {
    clearInterval(intervalo);
    rodando = false;
    modoAtual = modo;
    tempoRestante = MODOS[modo].tempo * 60;
    tempoTotal = tempoRestante;
    btnStart.textContent = "Iniciar";

    // atualiza tabs
    tabs.forEach(tab => {
        tab.classList.toggle("active", tab.dataset.mode === modo);
    });

    // muda cor de fundo
    document.body.className = "";
    if (modo === "short") document.body.classList.add("short-break");
    if (modo === "long") document.body.classList.add("long-break");

    atualizarDisplay();
}


function timerFinalizado() {
    // toca um alerta sonoro simples
    tocarAlerta();

    if (modoAtual === "pomodoro") {
        pomodorosHoje++;
        minutosHoje += MODOS.pomodoro.tempo;
        pomodorosCount.textContent = pomodorosHoje;
        totalMinutes.textContent = minutosHoje;

        // adiciona no historico
        const agora = new Date();
        const hora = agora.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
        const tarefa = taskInput.value.trim() || "Sem descrição";

        historico.push({ hora, tarefa });
        atualizarHistorico();

        // sugere pausa
        if (pomodorosHoje % 4 === 0) {
            alert("🎉 4 pomodoros completos! Hora de uma pausa longa.");
            trocarModo("long");
        } else {
            alert("✅ Pomodoro finalizado! Hora de uma pausa.");
            trocarModo("short");
        }
    } else {
        alert("⏰ Pausa encerrada! Bora voltar ao foco.");
        trocarModo("pomodoro");
    }
}


function tocarAlerta() {
    // cria um beep simples usando Web Audio API
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.value = 800;
        oscillator.type = "sine";
        gainNode.gain.value = 0.3;

        oscillator.start();

        // toca 3 beeps
        setTimeout(() => { gainNode.gain.value = 0; }, 200);
        setTimeout(() => { gainNode.gain.value = 0.3; }, 400);
        setTimeout(() => { gainNode.gain.value = 0; }, 600);
        setTimeout(() => { gainNode.gain.value = 0.3; }, 800);
        setTimeout(() => {
            oscillator.stop();
            ctx.close();
        }, 1000);
    } catch (e) {
        // se não suportar audio, só ignora
        console.log("Audio não suportado");
    }
}


function atualizarHistorico() {
    if (historico.length === 0) return;

    historySection.style.display = "block";
    historyList.innerHTML = "";

    // mostra do mais recente pro mais antigo
    [...historico].reverse().forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.hora} — ${item.tarefa}`;
        historyList.appendChild(li);
    });
}


// Event listeners
btnStart.addEventListener("click", iniciar);
btnReset.addEventListener("click", resetar);

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        trocarModo(tab.dataset.mode);
    });
});

// permite dar Enter no input pra iniciar
taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !rodando) {
        iniciar();
    }
});

// inicializa o display
atualizarDisplay();
