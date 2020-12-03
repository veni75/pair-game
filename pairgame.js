'use strict';

const cardArray = Array.from(document.querySelectorAll('.card'));
let memory = [];
let minutes, seconds;
let randomArray = [];
let randiArray = [];
let randi;

const time = document.querySelector('.time');

const timeNull = () => {
    let myseconds = seconds <= 9 ? `0${seconds}` : `${seconds}`;
    let myminutes = minutes <= 9 ? `0${minutes}` : `${minutes}`;
    time.textContent = `${myminutes}:${myseconds}`;
}

const timeToWrite = () => {
    if (cardArray.some(item => item.classList.value.includes('card-background'))) {
        setTimeout(function () {
            seconds += 1;            
            if (seconds === 60) {
                minutes += 1;
                seconds = seconds - 60;
            }
            timeNull();
            timeToWrite();
        }, 1000);
    }   
}

const randomNumber = () => {
    do {
        randi = Math.floor(Math.random() * randomArray.length);
        randiArray.push(randomArray[randi]);
        randomArray.splice(randi, 1);
    } while (randomArray.length > 0)
}

const openCardFn = (i) => {
    if (memory.length === 0) {
        timeToWrite();
    }    
    cardArray[i].setAttribute('class', `card card-image${randiArray[i]} animation1`);
    check(i);
}

const openCard = () => {
    cardArray.forEach((item, index) => item.addEventListener('click', () => openCardFn(index)));
}

const check = (i) => {
    memory.push(i);
    let length = memory.length;
    if (length % 2 === 0) {
        if (cardArray[memory[length - 1]].classList.value !== cardArray[memory[length - 2]].classList.value) {
            setTimeout(function () {
                cardArray[i].setAttribute('class', 'card card-background animation2');
                cardArray[[memory[length - 2]]].setAttribute('class', 'card card-background animation2');
            }, 700);
        } else {
            checkEnd();
        }
    }
}

const checkEnd = () => {
    if (cardArray.every(item => item.classList.value.includes('animation1'))) {
        setTimeout(function () {
            cardArray.map(item => item.setAttribute('class', 'card card-background animation2'));
            time.textContent = '00:00';
            startGame();
        }, 5000);
    }
}

const startGame = () => {
    randomArray = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
    randiArray = [];
    seconds = 0;
    minutes = 0;
    memory = [];
    timeNull();
    openCard();
    randomNumber();
}

startGame();
