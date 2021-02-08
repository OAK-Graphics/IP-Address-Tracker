const api_key = "at_EOO0ppC00aIpB6lez7wrfAtNvcqee";
const searchField = document.querySelector("#searchField");
const submit = document.querySelector("#submit");
const ipAddress = document.querySelector("#ip-address");
const ipLocation = document.querySelector("#location");
const timezone = document.querySelector("#timezone");
const isp = document.querySelector("#isp");
const placeholder = document.querySelectorAll(".details__placeholder");
const detailElems = document.querySelectorAll(".details--medium");
const map = document.querySelector("#map");

$(document).ready(() => {

    fetch("https://api.ipify.org?format=json")

    .then((resp) => {
        return resp.json();
    })

    .then((data) => {
        userIPDetails(data.ip);
    });

});

searchField.addEventListener('change', () => {

    replaceIPDetails(searchField.value);

});

submit.addEventListener('click', () => {

    replaceIPDetails(searchField.value);

});

function userIPDetails(ip) {

    fetch(`https://geo.ipify.org/api/v1?apiKey=${api_key}&ipAddress=${ip}`)   

    .then((resp) => resp.json())

    .then((data) => {

        ipAddress.innerText = data.ip;

        ipLocation.innerText = `${data.location.city}, ${data.location.country} ${data.location.postalCode}`;

        timezone.innerText = `UTC ${data.location.timezone}`;

        isp.innerText = data.isp;

        placeholder.forEach(function(element){
            element.classList.add("none")
        });

        detailElems.forEach(function(element){
            element.classList.add("show")
        });

        viewMap(data.location.lat, data.location.lng);

    })

}

function replaceIPDetails(ip) {

    var ipFormat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    var domainFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (searchField.value !== "") {

        console.log(searchField.value)

        if(searchField.value.match(ipFormat)) {
    
            fetch(`https://geo.ipify.org/api/v1?apiKey=${api_key}&ipAddress=${ip}`)
            
            .then((resp) => resp.json())
        
            .then((data) => {
                
                console.log(data);                
    
                ipAddress.innerText = data.ip;
    
                ipLocation.innerText = `${data.location.city}, ${data.location.country} ${data.location.postalCode}`;
    
                timezone.innerText = `UTC ${data.location.timezone}`;
    
                isp.innerText = data.isp;
    
                viewMap(data.location.lat, data.location.lng);
        
            })
    
        }
    
        else if (searchField.value.match(domainFormat)) {
    
            fetch(`https://geo.ipify.org/api/v1?apiKey=${api_key}&domain=${ip}`)
            
            .then((resp) => resp.json())
        
            .then((data) => {
                
                console.log(data);                
    
                ipAddress.innerText = data.ip;
    
                ipLocation.innerText = `${data.location.city}, ${data.location.country} ${data.location.postalCode}`;
    
                timezone.innerText = `UTC ${data.location.timezone}`;
    
                isp.innerText = data.isp;
    
                viewMap(data.location.lat, data.location.lng);
        
            })
    
        } 
    
        else if (searchField.value.match(emailFormat)) {
    
            fetch(`https://geo.ipify.org/api/v1?apiKey=${api_key}&email=${ip}`)
            
            .then((resp) => resp.json())
        
            .then((data) => {
                
                console.log(data);                
    
                ipAddress.innerText = data.ip;
    
                ipLocation.innerText = `${data.location.city}, ${data.location.country} ${data.location.postalCode}`;
    
                timezone.innerText = `UTC ${data.location.timezone}`;
    
                isp.innerText = data.isp;
    
                viewMap(data.location.lat, data.location.lng);
        
            })
    
        } 

    }
    
    else

    {

        console.log(searchField.value)

        fetch("https://api.ipify.org?format=json")

        .then((resp) => {
            return resp.json();
        })

        .then((data) => {
            userIPDetails(data.ip);
        });
    
    }

}

function viewMap(lat, lng) {

    var container = L.DomUtil.get('map');

    if (container != null) {

        container._leaflet_id = null;

    }

    var map = L.map('map', {zoomControl: false}).setView([lat, lng], 14);

    L.control.zoom({position: 'bottomright'}).addTo(map);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {

        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a> | Coded by <a href="https://www.instagram.com/OAK_Graphics">OAK Graphics</a>.',
    
    }).addTo(map);

    var marker = L.icon({

        iconUrl: "../images/icon-location.svg",

        // iconAnchor: [lat, lng]
        iconSize:     [23, 28],
        iconAnchor:   [11.5, 28]

    });

    L.marker([lat, lng], {icon: marker}).addTo(map);
    
}