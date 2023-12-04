const cards = document.querySelectorAll(".card"),
  refershBtn = document.querySelector(".wrapper button"),
  info = document.querySelector(".info");

let countFlips = document.querySelector(".flips span"),
  count = 0,
  timeLeft = document.querySelector(".time span"),
  timeInterval,
  timer = 45;

console.log(refershBtn);
let cardOne, cardTWo;
let disableCard = false;
let allMatched = 0;
// console.log(count);

//function to flip the cards
function flip(e) {
  count++;
  console.log(count);
  countFlips.innerHTML = count;
  if (count == 1) {
    time();
    console.log("hello world");
  }
  let clickCard = e.target;
  if (clickCard !== cardOne && !disableCard) {
    clickCard.classList.add("flipped");
    console.log("hello");
    if (!cardOne) {
      return (cardOne = clickCard);
    }
    cardTwo = clickCard;
    disableCard = true;
    console.log(cardOne, cardTwo);
  }
  let cardOneImg = cardOne.querySelector("img").src,
    cardTwoImg = cardTwo.querySelector("img").src;
  matchCard(cardOneImg, cardTwoImg);
  console.log(cardOneImg, cardTwoImg);
}

function matchCard(img1, img2) {
  if (img1 !== img2) {
    console.log("card didn't match");
    setTimeout(() => {
      cardOne.classList.add("shake");
      cardTwo.classList.add("shake");
    }, 600);

    setTimeout(() => {
      cardOne.classList.remove("shake", "flipped");
      cardTwo.classList.remove("shake", "flipped");
      cardOne = cardTwo = null;
      disableCard = false;
    }, 1000);
  } else {
    allMatched++;
    if (allMatched == 6) {
      setTimeout(() => {
        shuffleCard();
      }, 1000);
      clearInterval(timeInterval);
      info.classList.add("allmatch");
      info.innerHTML = `Well Done! All cards Matched`;
      console.log("all matched");
    }
    cardOne = cardTwo = null;
    console.log("card Match");
    return (disableCard = false);
  }
}

//for click on every card
cards.forEach((card) => {
  card.classList.add("flipped");
  card.addEventListener("click", flip);
});

//suffle the cards
function shuffleCard() {
  allMatched = 0;
  count = 0;
  countFlips.innerHTML = count;
  cardOne = cardTwo = null;
  let arr = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
  console.log(arr);
  cards.forEach((card, i) => {
    card.classList.remove("flipped");
    setTimeout(() => {
      imgTag = card.querySelector("img");
      imgTag.src = `img/MG${arr[i]}.png`;
    }, 1000);
    card.addEventListener("click", flip);
  });
}

shuffleCard();

//clicking on refresh button
refershBtn.addEventListener("click", (e) => {
  setTimeout(() => {
    shuffleCard();
  }, 900);
  clearInterval(timeInterval);
  timer = 45;
  timeLeft.innerHTML = timer;
  info.classList.remove("allmatch");
  info.classList.remove("timeOut");
});

//time function
function time() {
  clearInterval(timeInterval);
  timeInterval = setInterval(() => {
    if (timer > 0) {
      timer--;
      return (timeLeft.innerHTML = timer);
    }
    if (timer == 0) {
      info.classList.add("timeOut");
      info.innerHTML = `You could not make it. Try Once`;
    }
  }, 1000);
}
