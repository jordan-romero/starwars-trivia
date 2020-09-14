
const BASE_URL = "http://localhost:3000";
const CHARACTERS_URL = `${BASE_URL}/characters`;
const main = document.querySelector("main")
const charactersDiv = document.createElement("div")
main.append(charactersDiv)

function fetchCharacters(){
    fetch(CHARACTERS_URL)
    .then(resp => resp.json())
    .then(json => renderCharacters(json));
}

function renderCharacters(json){
    json.forEach(character => {
       renderCharacter(character)
    })
}

function renderCharacter(character){
   let charCard = document.createElement('div')
   charCard.className = "character-card"
   let img = document.createElement('img')
   img.src = character.avatar
   img.className = "character-avatar"
   charactersDiv.appendChild(charCard)
   let h3 = document.createElement('h3')
   h3.innerText = `${character.name}`
   h3.className = "character-name"
   let h4 = document.createElement('h4')
   h4.innerText = `Species: ${character.species}`
   h4.className = "character-species"
   let planetTitle = document.createElement('h4')
   planetTitle.innerText = `Home Planet: ${character.homeworld}`
   planetTitle.className = "character-homeworld"
   charCard.append(h3, img, h4, planetTitle)
}



fetchCharacters(); 