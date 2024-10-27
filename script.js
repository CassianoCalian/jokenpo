let personagemEscolhido = "";

// Selecionando os botões e elementos do DOM
const botaoArthur = document.querySelector(
  ".caracter-ordem button:nth-child(1)"
);
const botaoMicah = document.querySelector(
  ".caracter-ordem button:nth-child(2)"
);
const humanScore = document.querySelector("#human-score");
const machineScore = document.querySelector("#machine-score");
const telaEscolha = document.querySelector(".telaDePersonagem");
const telaJogo = document.querySelector(".telaDeJogo");
const arthurWinImage = document.getElementById("arthur-win");
const micahWinImage = document.getElementById("micah-win");

let humanScoreNumber = 0;
let machineScoreNumber = 0;

// Função para ir para a tela do jogo
function irparaTelaDoJogo() {
  telaEscolha.style.display = "none";
  telaJogo.style.display = "flex";
}

// Eventos de clique para os botões dos personagens
botaoArthur.addEventListener("click", function () {
  personagemEscolhido = "arthur";
  irparaTelaDoJogo();
  audio.play();
});

botaoMicah.addEventListener("click", function () {
  personagemEscolhido = "micah";
  irparaTelaDoJogo();
  audio.play();
});

// Funções do jogo
const result = document.querySelector(".result");

const playHuman = (humanChoice) => {
  const machineChoice = playMachine(); // Chama a função de escolha da máquina
  playTheGame(humanChoice, machineChoice); // Passa as escolhas para o jogo
};

const playMachine = () => {
  const choices = ["rock", "paper", "scissors"];
  const randomNumber = Math.floor(Math.random() * 3);
  return choices[randomNumber];
};

const playTheGame = (human, machine) => {
  console.log("Humano: " + human + " Máquina: " + machine);

  // Redefinir as imagens para as originais no início de cada rodada
  arthurWinImage.src = "/images/480px.png";
  micahWinImage.src = "/images/MicahBell.png";

  // Verifica se houve empate
  if (human === machine) {
    result.innerHTML = "Deu empate!";
    return; // Sai da função para evitar contar pontos
  }

  // Verifica quem ganhou
  const humanWins =
    (human === "paper" && machine === "rock") ||
    (human === "rock" && machine === "scissors") ||
    (human === "scissors" && machine === "paper");

  if (humanWins) {
    // Jogador vence
    humanScoreNumber++;
    humanScore.innerHTML = humanScoreNumber;

    // Mostrar a imagem de vitória do personagem escolhido
    if (personagemEscolhido === "arthur") {
      arthurWinImage.src = "images/arthur-win.png";
      result.innerHTML = "Arthur venceu esta rodada!";
    } else if (personagemEscolhido === "micah") {
      micahWinImage.src = "images/micah-win (1).png";
      result.innerHTML = "Micah venceu esta rodada!";
    }
  } else {
    // Máquina vence
    machineScoreNumber++;
    machineScore.innerHTML = machineScoreNumber;

    // A imagem do perdedor já foi redefinida no início da função
    if (personagemEscolhido === "arthur") {
      result.innerHTML = "Micah venceu esta rodada!";
      // Caminho da imagem corrigido:
      micahWinImage.src = "images/micah-win (1).png";
    } else if (personagemEscolhido === "micah") {
      result.innerHTML = "Arthur venceu esta rodada!";
      // Caminho da imagem corrigido:
      arthurWinImage.src = "images/arthur-win.png";
    }
  }
};
// Adicionando eventos para os botões de ação
document.getElementById("scissors").addEventListener("click", function () {
  playHuman("scissors");
});
document.getElementById("rock").addEventListener("click", function () {
  playHuman("rock");
});
document.getElementById("paper").addEventListener("click", function () {
  playHuman("paper");
});

// CONFIGURAÇÃO AUDIO DO SITE
const audio = document.getElementById("background-audio");
const muteButton = document.getElementById("mute-button");

window.onload = () => {
  audio.play().catch((error) => {
    console.error("Erro ao tentar reproduzir o áudio:", error);
    audio.muted = false;
  });
};

// Variável para rastrear se o áudio está mutado ou não
let isMuted = false;

// Função para mutar ou desmutar o áudio
muteButton.addEventListener("click", () => {
  if (isMuted) {
    audio.muted = false; // Desmutar
    muteButton.innerText = "Mutar"; // Muda o texto do botão
  } else {
    audio.muted = true; // Muta
    muteButton.innerText = "Desmutar"; // Muda o texto do botão
  }
  isMuted = !isMuted; // Alterna o estado de mute
});
