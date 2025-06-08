let secretNumber;
let attempts;

function initGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 10;
  document.getElementById("attemptsLeft").textContent = attempts;
  const message = document.getElementById("message");
  message.textContent = "";
  message.className = "";

  document.getElementById("guessInput").disabled = false;
  document.getElementById("restart").classList.remove("show");
  document.getElementById("restart").style.display = "none";
}

function checkGuess() {
  const guess = parseInt(document.getElementById("guessInput").value);
  const message = document.getElementById("message");

  if (isNaN(guess) || guess < 1 || guess > 100) {
    message.textContent = "Digite um número válido entre 1 e 100.";
    message.className = "wrong";
    return;
  }

  attempts--;
  document.getElementById("attemptsLeft").textContent = attempts;

  const diff = Math.abs(secretNumber - guess);

  if (guess === secretNumber) {
    message.textContent = `🎉 Parabéns! Você acertou o número ${secretNumber}!`;
    message.className = "correct";
    endGame();
  } else if (attempts === 0) {
    message.textContent = `💥 Suas tentativas acabaram! O número era ${secretNumber}.`;
    message.className = "wrong";
    endGame();
  } else if (diff <= 5) {
    const lower = Math.max(secretNumber - 3, 1);
    const upper = Math.min(secretNumber + 3, 100);
    message.textContent = `🔥 Você quase acertou! O número está entre ${lower} e ${upper}.`;
    message.className = "wrong";
  } else {
    message.textContent = guess < secretNumber ? "📉 Muito baixo!" : "📈 Muito alto!";
    message.className = "wrong";
  }

  document.getElementById("guessInput").value = "";
  document.getElementById("guessInput").focus();
}


function endGame() {
  document.getElementById("guessInput").disabled = true;
  const restartBtn = document.getElementById("restart");
  restartBtn.style.display = "inline-block";
  setTimeout(() => restartBtn.classList.add("show"), 10);
}

function restartGame() {
  initGame();
  document.getElementById("guessInput").value = "";
  document.getElementById("guessInput").focus();
}

window.onload = initGame;

