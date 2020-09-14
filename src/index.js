
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
   let div = document.createElement('div')
   div.className = "character-card"
   div.innerText = `${character.name}, ${character.species}, ${character.homeworld}`
   let img = document.createElement('img')
   img.src = character.avatar
   img.className = "character-avatar"
   div.appendChild(img)
   charactersDiv.appendChild(div)
}



fetchCharacters(); 