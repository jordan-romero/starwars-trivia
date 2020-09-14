
const BASE_URL = "http://localhost:3000";
const CHARACTERS_URL = `${BASE_URL}/characters`;
const main = document.querySelector("main")
const charactersDiv = document.createElement("div")
// const addButton = document.createElement("button")
// addButton.innerText = "Add a New Character!"
// addButton.id = "add-character-btn"
main.append(charactersDiv)


let modalBtn = document.getElementById("modal-btn")
let modal = document.querySelector(".modal")
let closeBtn = document.querySelector(".close-btn")
modalBtn.onclick = function(){
  modal.style.display = "block"
}
closeBtn.onclick = function(){
  modal.style.display = "none"
}
window.onclick = function(e){
  if(e.target == modal){
    modal.style.display = "none"
  }
}

let charForm = document.querySelector('.container')
charForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("submitted!!");
    let charName = document.querySelector("input[name='name']");
    let charSpecies = document.querySelector("input[name='species']");
    let charPlanet = document.querySelector("input[name='homeworld']");
    let charImg = document.querySelector("input[name='avatar']");
    newChar(charName.value, charSpecies.value, charPlanet.value, charImg.value)
})

function newChar(name, species, homeworld, avatar){
    let configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name,
          species,
          homeworld,
          avatar
        })
      };

      return fetch(CHARACTERS_URL, configObj)
      .then(function(response){
        return response.json();
      })
      .then(function(object){
        renderCharacter(object)
      })
}

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
   let deleteBtn = document.createElement('button')
   deleteBtn.dataset.id = character.id
   deleteBtn.innerText = "Death!"
   deleteBtn.addEventListener('click', (e) => {
       killCharacter(e);
   })
   charCard.append(h3, img, h4, planetTitle, deleteBtn)
}

function killCharacter(e){
    e.preventDefault();
    let characterId = e.target.getAttribute('data-id')
    deleteCharacter(characterId, e)
}

function deleteCharacter(characterId, e){
    fetch(`${CHARACTERS_URL}/${characterId}`, {
        method: 'delete'
    })
    .then(function(response){
        return response.json();
    })
    .then(function(object){
        removeCharacterFromDom(object, e);
    })
}

function removeCharacterFromDom(object, e){
    alert(object.message);
    e.target.parentElement.remove()
}



fetchCharacters(); 