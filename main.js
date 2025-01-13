
const cells = document.querySelectorAll("body main section article");
let turn = "X",
  win = false,
  times = 0,
  isAdvancedMode = false;

const turnP = document.querySelector("p");
const toggleButton = document.getElementById("toggle-mode");

// Standard and Advanced Winning Combinations
const standardWinningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const advancedWinningCombinations = [
  ...standardWinningCombinations,
  [2, 4, 7],
  [0, 4, 7],
  [0, 4, 5],
  [2, 4, 3],
  [1, 4, 8],
  [1, 4, 6],
];

// Get the current winning combinations based on mode
const getWinningCombinations = () =>
  isAdvancedMode ? advancedWinningCombinations : standardWinningCombinations;

// Check for a winner
function checkWinner(player) {
  const winningCombinations = getWinningCombinations();
  return winningCombinations.some(
    (combo) => combo.every((index) => cells[index].innerHTML === player)
  );
}

// Handle click event
function handleClick(e) {
  const cell = e.target;

  if (win || cell.innerHTML !== "") {
    cell.classList.add("shake");
    setTimeout(() => cell.classList.remove("shake"), 1000);
    return;
  }

  cell.innerHTML = turn;
  times++;
  turnP.innerText = turn === "X" ? "It's O's Turn" : "It's X's Turn";

  if (checkWinner(turn)) {
    turnP.innerText = `${turn} Wins ${turn === "X" ? "😊" : "😄"}`;
    win = true;
  } else if (times === 9) {
    turnP.innerText = "It's a Draw 🙂";
    win = true;
    setTimeout(() => location.reload(), 3000);
  } else {
    turn = turn === "X" ? "O" : "X";
  }
}

// Add click event listeners to cells
cells.forEach((cell) => cell.addEventListener("click", handleClick));

// Toggle advanced mode
toggleButton.addEventListener("click", () => {
  isAdvancedMode = !isAdvancedMode;
  const mode = isAdvancedMode ? "Advanced" : "Standard";
  toggleButton.innerText = `Mode: ${mode}`;
  turnP.innerText = `Mode switched to ${mode}. It's ${turn}'s Turn`;
});