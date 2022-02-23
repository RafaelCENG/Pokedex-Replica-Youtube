// DOM Objects

const mainScreen = document.querySelector('.main-screen')
const pokeName = document.querySelector('.poke-name')
const pokeId = document.querySelector('.poke-id')
const pokeFrontImage = document.querySelector('.poke-front-image')
const pokeBackImage = document.querySelector('.poke-back-image')
const pokeTypeOne = document.querySelector('.poke-type-one')
const pokeTypeTwo = document.querySelector('.poke-type-two')
const pokeWeight = document.querySelector('.poke-weight')
const pokeHeight = document.querySelector('.poke-height')
const pokeListItems = document.querySelectorAll('.list-item')
const leftButton = document.querySelector('.left-button')
const rightButton = document.querySelector('.right-button')


// constants and variables
const TYPES = [
    'normal', 'fighting', 'flying',
    'poison', 'ground', 'rock',
    'bug', 'ghost', 'steel',
    'fire', 'water', 'grass',
    'electric', 'psychic', 'ice',
    'dragon', 'dark', 'fairy'
  ];

let prevUrl = null;
let nextUrl = null;

// Functions

const capitalize = (str) => str[0].toUpperCase() + str.substr(1)

const resetScreen = () => {
    mainScreen.classList.remove('hide')
    for (const type of TYPES) {
        mainScreen.classList.remove(type)
    }
}


// get data for right side of screen
const fetchPokeList = url => {  
fetch(url)
.then(res => res.json())
.then(data => {
   const { results, previous, next } = data
   prevUrl = previous;
   nextUrl = next

   for (let i = 0; i < pokeListItems.length; i++) {
        const pokeListItem = pokeListItems[i]
        const resultData = results[i]

        if (resultData) {  
           const { name, url } = resultData
           const  urlArray = url.split('/')
           const id = urlArray[urlArray.length - 2]
           pokeListItem.textContent = id + '. ' + capitalize(name)
        } else 
        {
           pokeListItem.textContent = ''
        }
   }
})
}

const handleLeftButtonClick = () => {
    if (prevUrl) {
        fetchPokeList(prevUrl)
    }
}


const handleRightButtonClick = () => {
    if (nextUrl) {
        fetchPokeList(nextUrl)
    }
}

// get data for left side of screen
fetch('https://pokeapi.co/api/v2/pokemon/15')
 .then(res => res.json())
 .then(data => {

    resetScreen()
    
    const dataTypes = data['types']
    const dataFirstType = dataTypes[0]
    const dataSecondType = dataTypes[1]
    pokeTypeOne.textContent = capitalize(dataFirstType['type']['name'])
    if (dataSecondType) {
        pokeTypeTwo.classList.remove('hide')
        pokeTypeTwo.textContent = capitalize(dataSecondType['type']['name'])
    }
    else {
        pokeTypeTwo.classList.add('hide')
        pokeTypeTwo.textContent = ''
    }
    mainScreen.classList.add(dataFirstType['type']['name'])
    pokeName.textContent = capitalize(data['name']);
    pokeId.textContent = '#' + data['id'].toString().padStart(3, "0");
    pokeWeight.textContent = data['weight']
    pokeHeight.textContent = data['height']
    pokeFrontImage.src = data['sprites']['front_default'] || ""
    pokeBackImage.src = data['sprites']['back_default'] || ""
 })




// adding event listeners
leftButton.addEventListener('click', handleLeftButtonClick)
rightButton.addEventListener('click', handleRightButtonClick)

// initialize App
fetchPokeList('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');