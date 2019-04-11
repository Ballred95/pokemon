import { pokemon } from './pokemon.js'
class Pokemon {
  constructor(name) {
    ;(this.id = 0), (this.name = name)
  }
}

console.log(pokemon)
const mainContainer = document.querySelector('.container')

function cardFront(pokedata) {
  let cardFront = document.createElement('div')
  cardFront.className = 'card__face card __face--front'
  let figure = document.createElement('figure')

  let name = document.createElement('figcaption')
  let image = document.createElement('img')

  let upperName = pokedata.name.charAt(0).toUpperCase() + pokedata.name.slice(1)
  name.textContent = pokedata.name
  if (pokedata.id !== 0) {
    image.src = `images/images/${pokedata.imageID}${upperName}.png`
  } else {
    image.src = `vectorcon.svg`
  }

  figure.appendChild(name)
  figure.appendChild(image)
  cardFront.appendChild(figure)
  return cardFront
}

function cardBack(pokedata) {
  let cardBack = document.createElement('div')
  cardBack.classname = 'card__face card__face--back'
  return cardBack
}

function createPokeCard(pokedata) {
  console.log(pokedata.id)
  let scene = document.createElement('div')
  let card = document.createElement('div')
  scene.className = 'scene'
  card.className = 'card'
  card.appendChild(cardFront(pokedata))
  card.appendChild(cardBack(pokedata))
  scene.appendChild(card)
  mainContainer.appendChild(scene)
}

const allFetchedPokemon = []

pokemon.forEach(singleMon => {
  fetch(singleMon.url)
    .then(function(response) {
      return response.json()
    })
    .then(function(myJson) {
      allFetchedPokemon.push(myJson)
      createPokeCard(matchIdToImage(myJson))
    })
})

function matchIdToImage(aPokemon) {
  if (aPokemon.id === 0) {
    aPokemon.imageID = 0
  }
  if (aPokemon.id < 10) {
    aPokemon.imageID = '00' + aPokemon.id
  }
  if (aPokemon.id > 9 && aPokemon.id < 100) {
    aPokemon.imageID = '0' + aPokemon.id
  }
  if (aPokemon.id > 99) {
    aPokemon.imageID = aPokemon.id
  }
  if (aPokemon.name === 'mr-mime') {
    aPokemon.name = 'mr. Mime'
  }
  let dash = aPokemon.name.indexOf('-')
  if (dash !== -1) {
    aPokemon.name = aPokemon.name.slice(0, dash)
  }
  aPokemon.name = aPokemon.name.charAt(0).toUpperCase() + aPokemon.name.slice(1)
  return aPokemon
}

function fetchSinglePokemon(id) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(function(response) {
      return response.json()
    })
    .then(function(retrievedPokemon) {
      createPokeCard(matchIdToImage(retrievedPokemon))
    })
}

const newPokemonButton = document.querySelector('button')
newPokemonButton.addEventListener('click', function() {
  let newPokeName = prompt('entter new name')
  createPokeCard(new Pokemon(newPokeName))
})
