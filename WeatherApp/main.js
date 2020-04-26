const api = {
  key: "f92e44bd1573ce5f1721436222ec1842  ",
  base: "https://api.openweathermap.org/data/2.5/"
}
const search = document.querySelector('.search-box')
search.addEventListener('keypress',setQuery);
function setQuery(evt){
    if(evt.keyCode === 13){
      getResults(search.value)
    }
}
function getResults(city){
     fetch(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`)
                      .then(
                          function(weather){
                            return weather.json()
                          }
                      ).then(
                        displayResults
                      ).catch(function(err){
                        console.log(err)
                      });
}
function displayResults(weather){
  console.log(weather)
  const locName = document.querySelector('.location .city');
  locName.innerText = `${weather.name},${weather.sys.country}`
  const date = document.querySelector('.location .date');
  let now = new Date()
  date.innerText = DateBuilder(now)
  const tempNow = document.querySelector('.current .temp')
  tempNow.innerText = `${Math.round(weather.main.feels_like)} °c`;
  document.querySelector('.current .weather').innerText = weather.weather[0].description
  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

}
function DateBuilder(date){
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[date.getDay()];
  let month = months[date.getMonth()]
  let year = date.getFullYear()
  return `${date.getDate()} ${day} ${month} ${year}`;
}