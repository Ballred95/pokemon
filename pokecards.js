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
  cardFront.className = 'card __face--front'
  let figure = document.createElement('figure')

  let name = document.createElement('figcaption')
  let image = document.createElement('img')

  let upperName = pokedata.name.charAt(0).toUpperCase() + pokedata.name.slice(1)
  name.textContent = pokedata.name
  if (pokedata.id !== 0) {
    image.src = `images/images/${pokedata.imageID}${upperName}.png`
  } else {
    image.src = `pokeball_PNG21.png`
  }

  figure.appendChild(name)
  figure.appendChild(image)
  cardFront.appendChild(figure)
  return cardFront
}

function cardBackInfo(pokedata) {
  let infoDiv = document.createElement('div')
let moveOne = document.createElement('p')
let moveTwo = document.createElement('p')
let moveThree = document.createElement('p')
let moveFour = document.createElement('p')
moveOne.textContent = pokedata.moves[0].move.name
moveTwo.textContent = pokedata.moves[1].move.name
moveThree.textContent = pokedata.moves[2].move.name
moveFour.textContent = pokedata.moves[3].move.name
infoDiv.appendChild(moveOne)
infoDiv.appendChild(moveTwo)
infoDiv.appendChild(moveThree)
infoDiv.appendChild(moveFour)
return infoDiv

}

function cardBack(pokedata) { 
  let cardBack = document.createElement('div')
  cardBack.className = 'card__face--back'
  let backImage = document.createElement('img')
  backImage.src = `pokeball_PNG21.png`
  backImage.className = 'backImage'
  cardBack.appendChild(backImage)
  cardBack.appendChild(cardBackInfo(pokedata))
  // cardBack.className = "back"
  console.log(cardBack)
  return cardBack
}

function createPokeCard(pokedata) {
  
  let scene = document.createElement('div')
  let card = document.createElement('div')
  scene.className = 'scene'
  card.className = 'card'

  card.addEventListener( 'click', function() {
    card.classList.toggle('is-flipped');
  });

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

const selectPokemonButton = document.querySelector('#fetchPokemon')

selectPokemonButton.addEventListener('click', function() { let pokemonID = prompt('Enter an ID of an existing pokemon:')
fetchSinglePokemon(pokemonID)
})