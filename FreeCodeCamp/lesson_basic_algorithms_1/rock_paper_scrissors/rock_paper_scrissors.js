//rock : keo
//paper: đá
// Scrissors: bao
const playerScoreSpanElement = document.getElementById("player-score");

const computerScoreSpanElement = document.getElementById("computer-score");

const roundResultsMsg = document.getElementById("results-msg");

const winnerMsgElement = document.getElementById("winner-msg");

const optionsContainer = document.querySelector(".options-container");

const resetGameBtn = document.getElementById("reset-game-btn");

/* button onclick */
const rock = document.getElementById("rock-btn");
const paper = document.getElementById("paper-btn");
const scissors = document.getElementById("scissors-btn");

rock.addEventListener("click", function () {
  showResults("Rock");
});
paper.addEventListener("click", function () {
  showResults("paper");
});
scissors.addEventListener("click", function () {
  showResults("scissors");
});

resetGameBtn.addEventListener("click", resetGame);

function getRandomComputerResult() {
  const options = ["Rock", "Paper", "Scissors"];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

function hasPlayerWonTheRound(player, computer) {
  return (
    (player === "Rock" && computer === "Scissors") ||
    (player === "Scissors" && computer === "Paper") ||
    (player === "Paper" && computer === "Rock")
  );
  /*  if (player === "Rock" & & computer === "Scissors") {
    return true;
  } else if (player === "Scissors" & & computer === "Paper") {
    return true;
  } else if (player === "Paper" & & computer === "Rock") {
    return true;
  } else if (player === computer) {
    return false;
  } else {
    return false;
  } */
}

let playerScore = 0;
let computerScore = 0;

function getRoundResults(userOption) {
  const computerResult = getRandomComputerResult();

  if (hasPlayerWonTheRound(userOption, computerResult)) {
    playerScore++;
    return `Player wins! ${userOption} beats ${computerResult}`;
  } else if (computerResult === userOption) {
    return `It's a tie! Both chose ${userOption}`;
  } else {
    computerScore++;
    return `Computer wins! ${computerResult} beats ${userOption}`;
  }
}

function showResults(userOption) {
  roundResultsMsg.innerHTML = getRoundResults(userOption);

  playerScoreSpanElement.innerText = playerScore;

  computerScoreSpanElement.innerText = computerScore;

  if (playerScore === 3 || computerScore === 3) {
    winnerMsgElement.innerText = `${
      playerScore === 3 ? "player" : "computer"
    } has won the game`;

    resetGameBtn.style.display = "block";

    optionsContainer.style.display = "none";
  }
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  playerScoreSpanElement.innerText = playerScore;
  computerScoreSpanElement.innerText = computerScore;
  winnerMsgElement.innerText = "";
  roundResultsMsg.innerText = "";

  resetGameBtn.style.display = "none";

}
