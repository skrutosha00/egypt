import { animateOnce, changeBalance, setBalanceField, shuffle } from "./functions.js";

setBalanceField()

let balance = document.querySelector('.balance')
let cup = document.querySelector('.cup')
let cf = document.querySelector('.button')

let cfs = ['x0', 'x1', 'x2', 'x3']
let cocktails = ['beach', 'island', 'lagoon', 'mohito', 'rainbow', 'mary']
let gainedCocktails = localStorage.getItem('cocktails_egypt') == '' ? [] : localStorage.getItem('cocktails_egypt').split(',')

let start = false
let active = false
let readyForNext = true
let cocktailFill = 1
let currentCocktail = gainedCocktails.length == 6 ? 'mary' : cocktails[gainedCocktails.length]

document.querySelector('.play').onclick = () => {
    if (!start) {
        if (Number(balance.innerHTML) < 500) { return }
        changeBalance(-500)
        cocktailFill = 1
        start = true
        active = true

        animateOnce('.prize')
        document.querySelector('.play img').src = '../png/next_arrow.png'
        document.querySelector('.play img').classList.toggle('shift')
        cup.querySelector('img').src = '../png/empty_cup.png'
    } else {
        if (!readyForNext) { return }
        active = true
        nextStep()
    }

    setPrizes()
}

for (let prize of document.querySelectorAll('.prize')) {
    prize.onclick = () => {
        if (!start || !active) { return }
        active = false
        readyForNext = false

        prize.style.animation = 'shake 2s ease'

        let gift = prize.parentElement.querySelector('.gift')
        let giftType = gift ? gift.dataset.color : false

        setTimeout(() => {
            prize.classList.add('hidden')
            if (gift) {
                gift.classList.remove('hidden')
            }
        }, 2200);

        setTimeout(() => {
            if (giftType) {
                let cocktail = document.createElement('div')
                cocktail.classList.add(giftType, 'num' + cocktailFill, 'hidden')
                cup.appendChild(cocktail)

                setTimeout(() => {
                    cocktail.classList.remove('hidden')
                }, 10);

                cocktailFill += 1
                cf.innerHTML = cfs[cocktailFill - 1]

                if (cocktailFill == 4) {
                    setTimeout(() => {
                        cup.classList.add('hidden')
                    }, 500);

                    setTimeout(() => {
                        document.querySelector('.shaker').style.animation = 'shake 2s ease'
                    }, 1000);

                    setTimeout(() => {
                        document.querySelector('.shaker').style.animation = 'none'

                        cup.innerHTML = ''
                        let img = document.createElement('img')
                        img.src = '../png/' + currentCocktail + '.png'

                        if (gainedCocktails.length != 6) {
                            gainedCocktails.push(currentCocktail)
                            localStorage.setItem('cocktails_egypt', gainedCocktails)
                            currentCocktail = gainedCocktails.length == 6 ? 'mary' : cocktails[gainedCocktails.length]
                        }

                        cup.appendChild(img)
                        cup.classList.remove('hidden')
                        gameOver(true)
                    }, 3000);
                } else {
                    readyForNext = true
                }

            } else {
                setTimeout(() => {
                    gameOver(false)
                }, 500);
            }
        }, 3000);
    }
}

document.querySelector('.cashout').onclick = () => {
    gameOver(true)
}

function setPrizes() {
    let order = shuffle(['red', 'green', 'blue', 'empty'])

    for (let i = 0; i < 4; i++) {
        if (order[i] != 'empty') {
            let img = document.createElement('img')
            img.classList.add('gift', 'hidden')
            img.src = '../png/flask_' + order[i] + '.png'
            img.dataset.color = order[i]

            document.querySelectorAll('.table_cont')[i].appendChild(img)
        }
    }
}

function nextStep() {
    for (let gift of document.querySelectorAll('.gift')) {
        gift.classList.add('hidden')

        setTimeout(() => {
            gift.remove()
        }, 500);
    }

    for (let prize of document.querySelectorAll('.prize')) {
        prize.classList.remove('hidden')
        prize.style.animation = 'none'
    }
}

function gameOver(win) {
    if (win) {
        let prize = 500 * Number(cf.innerHTML.replace('x', ''))
        if (prize) {
            changeBalance(prize)
            animateOnce('.balance')
        }
    }

    nextStep()
    cf.innerHTML = 'x0'

    document.querySelector('.play img').src = '../png/play_arrow.png'
    document.querySelector('.play img').classList.toggle('shift')

    for (let cocktail of document.querySelectorAll('.num1, .num2, .num3')) {
        cocktail.classList.add('hidden')

        setTimeout(() => {
            cocktail.remove()
        }, 500);
    }

    start = false
    active = false
    readyForNext = true
}