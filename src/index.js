
const BASE_URL = "http://localhost:3000";
const CHARACTERS_URL = `${BASE_URL}/characters`;
const body = document.querySelector("body")
const modal = document.querySelector("#myModal")
// const main = document.querySelector("main")
// const charactersDiv = document.createElement("div")
const addButton = document.createElement("button") 
addButton.innerText = "Add a New Character!" 
addButton.id = "add-character-btn" 
body.appendChild(addButton)
// main.append(charactersDiv)

addButton.addEventListener("click", () => {
  const modalContent = document.querySelector(".modal-content")
    const form = document.createElement("form")
    form.innerHTML = `
      <input type="text" name="name" placeholder="Name..."class="input-text"/>
      <input type="text" name="species" placeholder="Species..."class="input-text"/>
      <input type="text" name="homeworld" placeholder="Home Planet..."class="input-text"/>
      <input type="text" name="avatar" placeholder="Image URL..."class="input-text"/>
      <input type="submit" value="Submit">
      <br>`
    modalContent.appendChild(form)
    modal.style.display = "block"
    form.addEventListener("submit", (e) => {
      e.preventDefault()
      const data = {
        name: e.target.name.value,
        species: e.target.species.value,
        homeworld: e.target.homeworld.value,
        avatar: e.target.avatar.value
      }
      fetch(`${CHARACTERS_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then( newCharacter => {
          renderCharacter(newCharacter)
          modal.style.display = "none";
          modal.querySelector("form").remove()
      })
    })
})
// let modalBtn = document.getElementById("modal-btn")
// let modal = document.querySelector(".modal")
// let closeBtn = document.querySelector(".close-btn")
// modalBtn.onclick = function(){
//   modal.style.display = "block"
// }
// closeBtn.onclick = function(){
//   modal.style.display = "none"
// }
// window.onclick = function(e){
//   if(e.target == modal){
//     modal.style.display = "none"
//   }
// }

// let charForm = document.querySelector('.container')
// charForm.addEventListener("submit", (e) => {
//     e.preventDefault();
//     alert("submitted!!");
//     let charName = document.querySelector("input[name='name']");
//     let charSpecies = document.querySelector("input[name='species']");
//     let charPlanet = document.querySelector("input[name='homeworld']");
//     let charImg = document.querySelector("input[name='avatar']");
//     newChar(charName.value, charSpecies.value, charPlanet.value, charImg.value)
// })

// function newChar(name, species, homeworld, avatar){
//     let configObj = {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Accept": "application/json"
//         },
//         body: JSON.stringify({
//           name,
//           species,
//           homeworld,
//           avatar
//         })
//       };

//       return fetch(CHARACTERS_URL, configObj)
//       .then(function(response){
//         return response.json();
//       })
//       .then(function(object){
//         renderCharacter(object)
//       })
// }

function fetchCharacters(){
    fetch(CHARACTERS_URL)
    .then(resp => resp.json())
    .then(json => renderCharacters(json));
}

function renderCharacters(json){
    const charactersList = document.createElement("div")
    body.appendChild(charactersList)
    charactersList.className = "characters-list"
    json.forEach(character => {
       renderCharacter(character)
    })
}

function renderCharacter(character){
  const charactersList = document.querySelector(".characters-list")
  const div = document.createElement("div")
  addCharacterDivContent(div, character)
  charactersList.appendChild(div)

  //  let charCard = document.createElement('div')
  //  charCard.className = "character-card"
  //  charCard.dataset.id = character.id
  //  characterCardContent(charCard, character)
  //  charactersDiv.appendChild(charCard)
}

function addCharacterDivContent(div, character){
  div.classList.add("character-card")
  div.innerHTML = `
    <img class="character-avatar" src="${character.avatar}" alt=${character.name}/>
    <p><strong>${character.name}</strong></p>
    <p>Home Planet: ${character.homeworld}</p>
    <p>Species: ${character.species}</p>
    `
  const editButton = document.createElement("div")
  editButton.className = "edit character-button"
  editButton.innerText = `Edit ${character.name}'s information.`
  editButton.addEventListener("click", () => {
    const modalContent = document.querySelector(".modal-content")
    const form = document.createElement("form")
    form.innerHTML = `
      <label for="name">Name:</label>
      <input type="text" name="name" value="${character.name}"class="input-text"/>
      <label for="name">Species:</label>
      <input type="text" name="species" value="${character.species}"class="input-text"/>
      <label for="name">Home Planet:</label>
      <input type="text" name="homeworld" value="${character.homeworld}"class="input-text"/>
      <label for="name">Image URL:</label>
      <input type="text" name="avatar" value="${character.avatar}"class="input-text"/>
      <input type="submit" value="Submit">
      <br>`
    modalContent.appendChild(form)
    modal.style.display = "block"
    form.addEventListener("submit", (e) => {
      e.preventDefault()
      const data = {
        name: e.target.name.value,
        species: e.target.species.value,
        homeworld: e.target.homeworld.value,
        avatar: e.target.avatar.value
      }
      fetch(`${CHARACTERS_URL}/${character.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(updatedCharacter => {
        addCharacterDivContent(div, updatedCharacter)
          modal.style.display = "none";
          modal.querySelector("form").remove()
      })
    })
  })
  
  const deleteButton = document.createElement("div")
  deleteButton.className = "delete character-button"
  deleteButton.innerText = `Death to ${character.name}!`
  deleteButton.addEventListener("click", () => {
    fetch(`${CHARACTERS_URL}/${character.id}`, {
      method: "DELETE"
    })
    .then(res=> res.json())
    .then(() => div.remove())
  })
  div.append(editButton, deleteButton)
}

// function characterCardContent(charCard, character){

//    let img = document.createElement('img')
//    img.src = character.avatar
//    img.className = "character-avatar"
//    let h3 = document.createElement('h3')
//    h3.innerText = `${character.name}`
//    h3.className = "character-name"
//    let h4 = document.createElement('h4')
//    h4.innerText = `Species: ${character.species}`
//    h4.className = "character-species"
//    let planetTitle = document.createElement('h4')
//    planetTitle.innerText = `Home Planet: ${character.homeworld}`
//    planetTitle.className = "character-homeworld"
//    let deleteBtn = document.createElement('button')
//    deleteBtn.dataset.id = character.id
//    deleteBtn.innerText = "Death!"
//    deleteBtn.className = "delete-btn"
//    deleteBtn.addEventListener('click', (e) => {
//        killCharacter(e);
//    })
//    let editBtn = document.createElement('button')
//    editBtn.innerText = "Evolve!"
//    editBtn.id = 'edit-button'
//    editBtn.addEventListener('click', (e) => {
//     const popUp = document.getElementById("myForm");
//     popUp.style.display = "block"
//     let editFormContainer = document.querySelector('.form-container');
//     editFormContainer.dataset.id = character.id
//     editFormContainer.innerHTML = `
//       <input type="text" name="name" value="${character.name}"class="input-text"/>
//       <input type="text" name="species" value="${character.species}"class="input-text"/>
//       <input type="text" name="homeworld" value="${character.homeworld}"class="input-text"/>
//       <input type="text" name="avatar" value="${character.avatar}"class="input-text"/>
//       <button type="submit" class="btn">Submit</button>
//       <button class="cancel">Close</button>
//     `
//       // let formPopup = document.querySelector(".form-popup")
//       // let closeBtn = document.createElement('button')
//       // closeBtn.className = "cancel"
//       // closeBtn.innerText = "Close"
//       // formPopup.append(closeBtn)
//     let popup = document.querySelector(".cancel")
//     popup.addEventListener("click", () => {
//       closeForm()
//       closeBtn.remove()
//     })

//     editFormContainer.addEventListener("submit", (e) => {
//       console.log(e.target)
//       e.preventDefault();
//       let charName = editFormContainer.name.value
//       let charSpecies = editFormContainer.species.value
//       let charPlanet = editFormContainer.homeworld.value
//       let charImg = editFormContainer.avatar.value
//       updateCharacter(charName, charSpecies, charPlanet, charImg, e, charCard)
//       // console.log(charName, charSpecies, charPlanet, charImg, e)
//       // console.log(e.target.getAttribute('data-id'))
//     })
//   })
//   charCard.append(h3, img, h4, planetTitle, editBtn, deleteBtn)
// }


// function closeForm() {
//   document.getElementById("myForm").style.display = "none";
// }



// function updateCharacter(name, species, homeworld, avatar, e, charCard){
//   let characterId = e.target.getAttribute('data-id')
//   // console.log(e)
//   // console.log(characterId)
//   let configObj = {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//       "Accept": "application/json"
//     },
//     body: JSON.stringify({
//       name,
//       species,
//       homeworld,
//       avatar
//     })
//   };
//     fetch(`${CHARACTERS_URL}/${characterId}`, configObj, e, charCard)
//     .then(function(response){
//         return response.json();
//     })
//     .then(function(object){
//         // charCard.remove();
//         // renderCharacter(object);
//         characterCardContent(charCard, object)
//         closeForm()
//         closeBtn.remove()
//     })
//   }

// function killCharacter(e){
//     e.preventDefault();
//     let characterId = e.target.getAttribute('data-id')
//     deleteCharacter(characterId, e)
// }

// function deleteCharacter(characterId, e){
//     fetch(`${CHARACTERS_URL}/${characterId}`, {
//         method: 'delete'
//     })
//     .then(function(response){
//         return response.json();
//     })
//     .then(function(object){
//         removeCharacterFromDom(object, e);
//     })
// }

// function removeCharacterFromDom(object, e){
//     alert(object.message);
//     e.target.parentElement.remove()
// }

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

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  modal.querySelector("form").remove()
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    modal.querySelector("form").remove()
  }
}