'use strict';

const cardArray = Array.from(document.querySelectorAll('.card'));
let memory = [];
let now, now2;
let minutes = 0;
let seconds = 0;

const time = document.querySelector('.time');

const timeNull = () => {
    /* if (minutes <= 9) {
        minutes = '0' + minutes;
    } */
    if (seconds <= 9) {
        seconds = '0' + seconds;
    }
    time.textContent = `${minutes}:${seconds}`;
}

const timeToWrite = () => {
    if (memory.length === 0) {
        now = Date.now();        
    }
    now2 = Date.now();    
    seconds = Math.floor((now2 - now)/1000)-minutes*60;
    if(seconds===60){        
        minutes +=1;
        seconds = Math.floor((now2 - now)/1000)-minutes*60;
    }
    timeNull();
    if (cardArray.some(item => item.classList.value.includes('card-background'))) {
        setTimeout(function () {
            timeToWrite();
        }, 1000);
    }
}

const openCardFn = (i) => {
    timeToWrite();
    /* if (i === 0 || i === 5) {
        cardArray[i].setAttribute('class', 'card card-image1 animation1');
    } else if (i === 1 || i === 6) {
        cardArray[i].setAttribute('class', 'card card-image2 animation1');
    } else if (i === 2 || i === 7) {
        cardArray[i].setAttribute('class', 'card card-image3 animation1');
    } else if (i === 3 || i === 8) {
        cardArray[i].setAttribute('class', 'card card-image4 animation1');
    } else if (i === 4 || i === 9) {
        cardArray[i].setAttribute('class', 'card card-image5 animation1');
    } */
    if (i < 5) {
        cardArray[i].setAttribute('class', `card card-image${i + 1} animation1`);
    } else {
        cardArray[i].setAttribute('class', `card card-image${i - 4} animation1`);
    }

    check(i);
}

const openCard = () => {
    cardArray.forEach((item, index) => item.addEventListener('click', () => openCardFn(index)));
}

const check = (i) => {
    memory.push(i);
    let length = memory.length;
    if (memory.length % 2 === 0) {
        if (cardArray[memory[length - 1]].classList.value !== cardArray[memory[length - 2]].classList.value) {
            setTimeout(function () {
                cardArray[i].setAttribute('class', 'card card-background animation2');
                cardArray[[memory[length - 2]]].setAttribute('class', 'card card-background animation2');
            }, 1000);
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
            memory = [];
        }, 5000);
    }
}
timeNull();
openCard();
