let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turno = true; // true for Player X, false for Player O
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Reset game
const resetGame = () => {
    turno = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

// Check for winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (
            boxes[a].innerText &&
            boxes[a].innerText === boxes[b].innerText &&
            boxes[a].innerText === boxes[c].innerText
        ) {
            showWinner(boxes[a].innerText);
            return;
        }
    }
    // Check for a draw
    if ([...boxes].every((box) => box.disabled)) {
        showWinner("No one (Draw)");
    }
};

// Show winner
const showWinner = (winner) => {
    msg.innerText = `Congratulations! ${winner} is the winner.`;
    if (winner === "No one (Draw)") {
        msg.innerText = "It's a Draw!";
    }
    msgContainer.classList.remove("hide");
    disableBoxes();
};

// Disable all boxes
const disableBoxes = () => {
    boxes.forEach((box) => (box.disabled = true));
};

// Enable all boxes
const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
};

// Add event listeners to boxes
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turno) {
            box.innerText = "X";
        } else {
            box.innerText = "O";
        }
        turno = !turno;
        box.disabled = true;
        checkWinner();
    });
});

// Add event listeners to buttons
resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
