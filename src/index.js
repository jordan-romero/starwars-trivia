document.querySelector("p").addEventListener('click', () => {
    alert("BAM BAMMMMM BAMMM BAMMM BAMMMMMMMM BAMMMMMM")
} )

const BASE_URL = "http://localhost:3000";
const CHARACTERS_URL = `${BASE_URL}/characters`;
const main = document.querySelector("main")

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
   div.innerText = `${character.name}, ${character.species}, ${character.homeworld}`
   let img = document.createElement('img')
   img.src = character.avatar
   div.appendChild(img)
   main.appendChild(div)
}



fetchCharacters(); 