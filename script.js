
const emojis = [
    "🍎", "🍌", "🍇", "🍒",
    "🍎", "🍌", "🍇", "🍒",
    "🐱", "🐶", "🐼", "🦊",
    "🐱", "🐶", "🐼", "🦊"
];

let firstCard = null;
let secondCard = null;
let moves = 0;
let score = 0;
let lockBoard = false;
let matchedPairs = 0;

const board = document.getElementById("gameBoard");

function startGame() {
    firstCard = null;
    secondCard = null;
    moves = 0;
    score = 0;
    matchedPairs = 0;
    lockBoard = false;

    document.getElementById("moves").textContent = moves;
    document.getElementById("score").textContent = score;
    document.getElementById("message").textContent =
        "Flip two cards to find a match!";

    board.innerHTML = "";

    const shuffled = [...emojis].sort(() => Math.random() - 0.5);

    shuffled.forEach((emoji) => {
        const card = document.createElement("button");

        card.className = "card";
        card.textContent = "?";
        card.dataset.emoji = emoji;
        card.setAttribute("aria-label", "Hidden card");

        card.addEventListener("click", () => flipCard(card));

        board.appendChild(card);
    });
}

function flipCard(card) {
    if (
        lockBoard ||
        card.classList.contains("flipped") ||
        card.classList.contains("matched")
    ) {
        return;
    }

    card.textContent = card.dataset.emoji;
    card.classList.add("flipped");
    card.setAttribute("aria-label", card.dataset.emoji);

    if (firstCard === null) {
        firstCard = card;
        return;
    }

    secondCard = card;
    moves++;

    document.getElementById("moves").textContent = moves;

    if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        score += 10;
        matchedPairs++;

        document.getElementById("score").textContent = score;
        document.getElementById("message").textContent = "Great match! 🎉";

        firstCard = null;
        secondCard = null;

        if (matchedPairs === emojis.length / 2) {
            document.getElementById("message").textContent =
                `You won! 🏆 Final Score: ${score}`;
        }
    } else {
        lockBoard = true;

        document.getElementById("message").textContent =
            "Not a match. Try again!";

        setTimeout(() => {
            firstCard.textContent = "?";
            secondCard.textContent = "?";

            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");

            firstCard.setAttribute("aria-label", "Hidden card");
            secondCard.setAttribute("aria-label", "Hidden card");

            firstCard = null;
            secondCard = null;
            lockBoard = false;
        }, 800);
    }
}

startGame();
  
