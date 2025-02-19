const resetGameBtn = document.getElementById("reset-game-btn");
const rock = document.getElementById("rock-btn");
const paper = document.getElementById("paper-btn");
const scissors = document.getElementById("scissors-btn");
const playerScoreSpanElement = document.getElementById("player-score");
const computerScoreSpanElement = document.getElementById("computer-score");
const roundResultsMsg = document.getElementById("results-msg");
const winnerMsgElement = document.getElementById("winner-msg");
const optionsContainer = document.getElementById("options-container");

rock.addEventListener("click", function () {
  showResults("Rock");
});
paper.addEventListener("click", function () {
  showResults("paper");
});
scissors.addEventListener("click", function () {
  showResults("scissors");
});

const getRandomComputerResult = () => {
  const options = ["Rock", "Paper", "Scissors"];
  const random = Math.floor(Math.random() * options.length);
  return options[random];
};

const hasPlayerWonTheRound = (player, computer) => {
  return (
    (player === "Rock" && computer === "Scissors") ||
    (player === "Scissors" && computer === "Paper") ||
    (player === "Paper" && computer === "Rock")
  )
};

let playerScore = 0;
let computerScore = 0;

const getRoundResults = (userOption) => {
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
};

const showResults = (userOption) => {
  roundResultsMsg.innerHTML = getRoundResults(userOption);

  playerScoreSpanElement.innerText = playerScore;

  computerScoreSpanElement.innerText = computerScore;

  if (playerScore === 5 || computerScore === 5) {
    winnerMsgElement.innerText = `${
      computerScore === 5 ? "player" : "computer"
    } has won the game`;
    
    resetGameBtn.style.display = "block";
    optionsContainer.style.display = "none"
  }
};

const resetGame = () => {
  playerScore = 0;
  computerScore = 0;
  playerScoreSpanElement.innerText = playerScore;
  computerScoreSpanElement.innerText = computerScore;
  winnerMsgElement.innerText = "";
  roundResultsMsg.innerText = "";

  resetGameBtn.style.display = "none";
};
resetGameBtn.addEventListener("click", resetGame);
