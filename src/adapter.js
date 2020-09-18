console.log("hello frm the adapter file")
const PLANETS_URL = `${BASE_URL}/planets`;

const adapter = {
  getAllPlanets: function(){
    return fetch(PLANETS_URL)
    .then(res => res.json())
  }
}