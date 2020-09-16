
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
   deleteBtn.className = "delete-btn"
   deleteBtn.addEventListener('click', (e) => {
       killCharacter(e);
   })
   let editBtn = document.createElement('button')
   editBtn.dataset.id = character.id
   editBtn.innerText = "Evolve!"
   editBtn.id = 'edit-button'
   editBtn.addEventListener('click', (e) => {
    function openForm(e) {
      e.preventDefault(); 
      document.getElementById("myForm").style.display = "block";
      let editFormContainer = document.querySelector('.form-container');
      editFormContainer.innerHTML = `
      <input type="text" name="name" value="${character.name}"class="input-text"/>
      <input type="text" name="species" value="${character.species}"class="input-text"/>
      <input type="text" name="homeworld" value="${character.homeworld}"class="input-text"/>
      <input type="text" name="avatar" value="${character.avatar}"class="input-text"/>
      <button type="submit" class="btn">Submit</button>
      <button class="btn cancel">Close</button>
      `
      let charName = document.querySelector("input[name='name']");
      let charSpecies = document.querySelector("input[name='species']");
      let charPlanet = document.querySelector("input[name='homeworld']");
      let charImg = document.querySelector("input[name='avatar']");
      // let submit = document.querySelector(".btn")
      editFormContainer.addEventListener("submit", (e) => {
        e.preventDefault();
        updateCharacter(character)
   
      })
    
    }
    openForm(e); 
})
   charCard.append(h3, img, h4, planetTitle, editBtn, deleteBtn)
}

// function openForm(e) {
//   e.preventDefault(); 
//   document.getElementById("myForm").style.display = "block";
//   let editFormContainer = document.querySelector('.form-container');
//   editFormContainer.innerHTML = `
//   <input type="text" name="name" value="" class="input-text"/>
//   `
  

// }

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}




//////////////////////////////////////

// function editCharacter(e){
//     e.preventDefault();
//     // let characterId = e.target.getAttribute('data-id')
//     // updateCharacterForm(characterId, e)
// }

// function updateCharacterForm(characterId, e){
//     // let editBtn = document.querySelector("#edit-button")
//     let editModalDiv = document.createElement('div')
//     editModalDiv.className = 'edit-modal-content'
//     let editModalContainer = document.createElement('div')
//     editModalContainer.className = 'edit-modal-container'
//     let editForm = document.createElement('form')
//     editForm.setAttribute('method',"post");
//     editForm.setAttribute('action',"submit.php");
//     editForm.className = 'edit-character-form'
//     let editInput = document.createElement('input')
//     editInput.setAttribute('type',"text");
//     editInput.setAttribute('name',"name");
//     editInput.setAttribute('placeholder',"name");
//     editInput.className = "input-text"
//     let editSpeciesInput = document.createElement('input')
//     editSpeciesInput.setAttribute('type',"text")
//     editSpeciesInput.setAttribute('name',"species");
//     editSpeciesInput.className = "input-text"

//     main.appendChild(editModalDiv)
//     editModalDiv.appendChild(editModalContainer)
//     editModalContainer.appendChild(editForm)
//     editForm.appendChild(editInput)
//     editForm.appendChild(editSpeciesInput)
//     // updateCharacter()
// }


function updateCharacter(character, e){
    fetch(`${CHARACTERS_URL}/${character.id}`, {
    method: 'patch'})
    .then(function(response){
        return response.json();
    })
    .then(function(object){
        // renderCharacter(object, e);
        console.log(object); 
    })
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
/*
finish CRUDs (U) ---> with modal, form prepopulated  wtf how does one update with JS???
add Planet Model 
    -planet :name
    - look to API for infos later
    - planet has_many :characters
    - character belongs_to :planet
refactor .html move to index.js
once we learn shit:
    refactor to classes
*/



fetchCharacters(); 