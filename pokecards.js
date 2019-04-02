import {pokemon} from './pokemon.js'


pokemon.forEach((singleMon)=> {

 fetch(singleMon.url)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
    createPokeCard(myJson)
  })
})    
   




  console.log(pokemon)
const mainContainer = document.querySelector('.container')

  function createPokeCard(pokedata) {
    console.log(pokedata.id)
let card = document.createElement('div')
card.className = 'box'
let figure = document.createElement('figure')

let name = document.createElement('figcaption')
let image = document.createElement('img')

let upperName = pokedata.name.charAt(0).toUpperCase() + pokedata.name.slice(1)
name.textContent = upperName
image.src = `../images${pokedata.id}${upperName}.png`
figure.appendChild(name)
figure.appendChild(image)
card.appendChild(figure)
mainContainer.appendChild(card)
}
