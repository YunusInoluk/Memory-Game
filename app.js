let sec = 0;
let min = 0;
const minSpan = document.getElementById("min");
const secSpan = document.getElementById("sec");
const cards = document.querySelectorAll(".card");
const frontSide = document.querySelectorAll(".front-side");
const colors = [
  "black",
  "blue",
  "purple",
  "yellow",
  "pink",
  "black",
  "blue",
  "purple",
  "yellow",
  "pink",
];
function timer () {
  sec = parseInt(sec);
  min = parseInt(min);
  sec += 1;
  if(sec === 60){
    min += 1;
    sec = 0;
  }
  if(sec < 10 || sec === 0){
    sec = "0" + sec;
  }
  if(min < 10 || min === 0){
    min = "0" + min;
  }
  setTimeout("timer()",1000);
  secSpan.textContent = sec;
  minSpan.textContent = min;
}
timer();

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
const shuffleColors = shuffleArray(colors);

for (i = 0; i < 10; i++) {
  frontSide[i].style.backgroundColor = shuffleColors[i];
  cards[i].style.backgroundColor = shuffleColors[i];
}
let hasFlippedCard = false;
let firstCard, secondCard;
let turnLock = false;
function flipCard() {
  if(turnLock) true;
  if (this === firstCard) return;
  this.classList.add("flip");
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
  } else {
    hasFlippedCard = false;
    secondCard = this;
    if (secondCard.style.backgroundColor === firstCard.style.backgroundColor) {
      firstCard.removeEventListener("click", flipCard);
      secondCard.removeEventListener("click", flipCard);
    } else {
      setTimeout(() => {
        turnLock = true;
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        turnLock = false
      }, 1000);

    }
  }
}
cards.forEach((card) => card.addEventListener("click", flipCard));
