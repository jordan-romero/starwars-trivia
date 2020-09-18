/* PLANET PLAN
create button to show all planets
slap on dom
addeventListener on click
render all planets
render planet
    -make div
    -make dplanet card
        -contains innerhtml with text
        -include array of charaters with links to show their individual info? as a popup?
        -event Listeners for edit and delete buttons
        -event listener to show popup of extra image

will need to change characters so that fetch  to render them occurs when clicked on a button to show all (like with planets)
    -maybe planet will link to a popup with planet info??

MUST FIX: when a user makes a new character they must either select a planet from a dropdown OR make an entirely neeew planet with accepts nested attributes for ew

*/

const planetsBtn = document.querySelector(".planets-button")
planetsBtn.addEventListener("click", () => {
    init()
})

function init(){
    adapter.getAllPlanets().then(renderPlanets)
}

function renderPlanets(planets){
    const planetsList = document.createElement("div")
    body.appendChild(planetsList)
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
    <p class="planet-climate">Climate: ${planet.climate}</p>
    <img class="env-image" src="${planet.env_image}" alt=${planet.name}/>
    `
    const ul = document.createElement("ul")
    planet.characters.forEach(char => {
        console.log(char.name)
        let li = document.createElement("li")
        li.innerText = char.name
        ul.appendChild(li)
    })
    // const planetPop = document.querySelector(".planet-population")
    // planetPop.appendChild(ul)
    div.appendChild(ul)
}

