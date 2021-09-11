let locBtn = document.querySelector(".loc-btn");
let dateElem = document.querySelector(".cur-date");
let timeElem = document.querySelector(".cur-time");
let locElem = document.querySelector(".location");
let humElem = document.querySelector(".humidity");
let tempElem = document.querySelector(".temp");
let speedElem = document.querySelector(".wind-speed");
let dirElem = document.querySelector(".wind-dir");
let pressElem = document.querySelector(".press");
let descElem = document.querySelector(".description");
let weatherIcon = document.querySelector(".icon img");
let inputField = document.querySelector(".change-location input");

document.addEventListener("DOMContentLoaded", request);
inputField.addEventListener("focus", clearField);
locBtn.addEventListener("click", request);

function request() {
    //console.log(setLocation(inputField.value));
    fetch(setLocation(inputField.value))
    .then(responce => responce.json())
    .then(json => getData(json));
}
    
function getData(obj) {
    locElem.innerHTML = `${obj.name}`;
    tempElem.innerHTML = `${obj.main.temp}°C`;
    descElem.innerHTML = `${obj.weather[0].description}`;
    humElem.innerHTML = `Humidity: ${obj.main.humidity} %`;
    speedElem.innerHTML = `Wind speed: ${obj.wind.speed} km/h`;
    dirElem.innerHTML = `Wind direction: ${obj.wind.deg} deg (${windDirection(obj.wind.deg)})`;
    pressElem.innerHTML = `Pressure: ${obj.main.pressure} hPa`;
    weatherIcon.src = getImageURL(obj.weather[0].icon);
    let date = new Date(obj.dt*1000);
    dateElem.innerHTML = `${getMonthName(date.getMonth())} ${date.getDate()}, ${date.getFullYear()}`;
    timeElem.innerHTML = `${date.getHours()}:${date.getMinutes()}`;
};

function clearField() {
    inputField.value = "";
}

function windDirection(deg) {
    switch(deg){
        case (0):return "N";
        case (90):return "E";
        case (180): return "S";
        case (270): return "W";
    };
    if (deg > 0 && deg < 90) {
        return "N-E";
    } else if (deg > 90 && deg < 180) {
        return "S-E";
    } else if (deg > 180 && deg < 270) {
        return "S-W";
    } else return "N-W";
};

function setLocation(location) {
    let str = "https://api.openweathermap.org/data/2.5/weather?q=&units=metric&APPID=5d066958a60d315387d9492393935c19"
    let buff = str.split("");
    buff.splice(49, 0, location);
    return buff.join("");
};

function getImageURL(img){
    return "https://openweathermap.org/img/w/"+img+".png";
};

function getMonthName(mon) {
    let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",];
    return months[mon];
};
