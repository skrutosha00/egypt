let names = {
    "beach": "THE BEACH",
    "island": "LONG ISLAND",
    "lagoon": "BLUE LAGOON",
    "mohito": "MOHITO",
    "rainbow": "RAINBOW",
    "mary": "BLOODY MARY"
}

let gainedCocktails = localStorage.getItem('cocktails_egypt') ? localStorage.getItem('cocktails_egypt').split(',') : []

for (let i = 0; i < 6; i++) {
    let card = document.createElement('div')
    card.classList.add('card')

    let name = document.createElement('div')
    name.classList.add('name', 'block')
    if (gainedCocktails[i]) {
        name.innerHTML = names[gainedCocktails[i]]
    }
    card.appendChild(name)

    if (gainedCocktails[i]) {
        let img = document.createElement('img')
        img.src = '../png/' + Object.keys(names)[i] + '.png'
        card.appendChild(img)
    } else {
        let unknown = document.createElement('div')
        unknown.classList.add('unknown')
        unknown.innerHTML = '?'
        card.appendChild(unknown)
    }

    if (i < 3) {
        document.querySelector('.cocktails.top').appendChild(card)
    } else {
        document.querySelector('.cocktails.bottom').appendChild(card)
    }
}