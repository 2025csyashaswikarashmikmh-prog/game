// What each move looks like and what it beats
const MOVES = {
  rock:     { icon: "✊", beats: "scissors" },
  paper:    { icon: "✋", beats: "rock" },
  scissors: { icon: "✌️", beats: "paper" },
};

const KEY_TO_MOVE = { r: "rock", p: "paper", s: "scissors" };

// Score state
const score = { player: 0, draw: 0, computer: 0 };

// DOM elements
const playerHand = document.getElementById("player-hand");
const computerHand = document.getElementById("computer-hand");
const resultText = document.getElementById("result");
const playerScoreEl = document.getElementById("player-score");
const drawScoreEl = document.getElementById("draw-score");
const computerScoreEl = document.getElementById("computer-score");
const choiceButtons = document.querySelectorAll(".choice");
const resetButton = document.getElementById("reset");

// Computer picks a random move
function getComputerMove() {
  const moves = Object.keys(MOVES);
  return moves[Math.floor(Math.random() * moves.length)];
}

// Returns "win", "lose" or "draw" from the player's point of view
function getOutcome(player, computer) {
  if (player === computer) return "draw";
  return MOVES[player].beats === computer ? "win" : "lose";
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function shake(element) {
  element.classList.remove("shake");
  void element.offsetWidth; // restart the animation
  element.classList.add("shake");
}

function playRound(playerMove) {
  const computerMove = getComputerMove();
  const outcome = getOutcome(playerMove, computerMove);

  // Show both hands
  playerHand.textContent = MOVES[playerMove].icon;
  computerHand.textContent = MOVES[computerMove].icon;
  shake(playerHand);
  shake(computerHand);

  // Update score and message
  resultText.className = "result " + outcome;

  if (outcome === "win") {
    score.player++;
    resultText.textContent = `You win! ${capitalize(playerMove)} beats ${computerMove}.`;
  } else if (outcome === "lose") {
    score.computer++;
    resultText.textContent = `You lose! ${capitalize(computerMove)} beats ${playerMove}.`;
  } else {
    score.draw++;
    resultText.textContent = `It's a draw. You both picked ${playerMove}.`;
  }

  updateScoreboard();
}

function updateScoreboard() {
  playerScoreEl.textContent = score.player;
  drawScoreEl.textContent = score.draw;
  computerScoreEl.textContent = score.computer;
}

function resetGame() {
  score.player = 0;
  score.draw = 0;
  score.computer = 0;
  updateScoreboard();

  playerHand.textContent = "?";
  computerHand.textContent = "?";
  resultText.className = "result";
  resultText.textContent = "Pick your move";
}

// Click handlers
choiceButtons.forEach((button) => {
  button.addEventListener("click", () => playRound(button.dataset.choice));
});

resetButton.addEventListener("click", resetGame);

// Keyboard shortcuts: R, P, S
document.addEventListener("keydown", (event) => {
  const move = KEY_TO_MOVE[event.key.toLowerCase()];
  if (move) playRound(move);
});