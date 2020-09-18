/* PLANET PLAN
    -include array of charaters with links to show their individual info? as a popup?
        -mini foto, name and species
    -event Listeners for edit and delete buttons
    -On character's card planet will mouseover to a popup with planet info
    -change addPlanetDivContent to be built by js as opposed to innerHTML cause it's ugly as shit

    -refactor to class syntax

MUST FIX: when a user makes a new character they must either select a planet from a dropdown OR make an entirely neeew planet with accepts nested attributes for ew
*/

function addPlanetButton(){
    const addButton = document.createElement("button")
    addButton.className = "add-planet"
    addButton.innerText = "Be God. Make a Planet."
    app.appendChild(addButton)
  }

const planetsBtn = document.querySelector(".planets-button")
planetsBtn.addEventListener("click", () => {
    app.innerHTML = ""
    init();
    addPlanetButton();
})

function init(){
    adapter.getAllPlanets().then(renderPlanets)
}

function renderPlanets(planets){
    const planetsList = document.createElement("div")
    app.appendChild(planetsList)
    planetsList.outerHTML = '<div class="planets-list">'
    planets.forEach(renderPlanet)
}

function renderPlanet(planet){
    const planetsList = document.querySelector(".planets-list")
    const div = document.createElement('div')
    addPlanetDivContent(div, planet)
    planetsList.appendChild(div)
}

function addPlanetDivContent(div, planet){
    div.classList.add("planet-card")
    div.innerHTML = `
    <img class="planet-image" src="${planet.planet_image}" alt=${planet.name}/>
    <p class="planet-name"><strong>${planet.name}</strong></p>
    <p class="planet-population">Population: ${planet.population}</p>
    `
    const climateDiv = document.createElement('div')
    climateDiv.innerHTML = `
    <p class="planet-climate">Climate: ${planet.climate}</p>
    <img class="env-image" src="${planet.env_image}" alt=${planet.name}/>
    `
    const ul = document.createElement("ul")
    ul.className = "planet-characters-ul"
    ul.innerText = "Characters from this planet:"
    planet.characters.forEach(char => {
        let li = document.createElement("li")
        li.className = "planet-characters-li"
        li.innerText = char.name
        ul.appendChild(li)
    })
    div.append(ul, climateDiv)
}

