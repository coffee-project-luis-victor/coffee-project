"use strict"
const submitButton = document.querySelector('#submit');
const roastSelection = document.querySelector('#roast-selection');
const searchBar = document.getElementById('search-input')
const newCoffeeSubmitButton = document.getElementById("submit-new-coffee")
let newRoast = document.getElementById('new-roast-selection').value;
roastSelection.addEventListener('change', updateCoffees)
submitButton.addEventListener('click', updateCoffees);

const coffeeCards = document.querySelector('#coffees');

function renderCoffee(coffee) {
    let html = '<div class="coffee">';
    html += '<h2>' + coffee.name + '</h2>';
    html += '<p>' + coffee.roast + '</p>';
    html += '</div>';

    return html;
}

function renderCoffees(coffees) {
    let html = '';
    for(let i = 0; i < coffees.length; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
async function updateCoffees(e) {
    if (e) {
        e.preventDefault(); // don't submit the form, we just want to update the data
    }
    let selectedRoast = roastSelection.value.toLowerCase();
    let searchInput = searchBar.value;
    let coffees = await getCoffees();
    let filteredCoffees = coffees;
    if (selectedRoast !== "all") {

        filteredCoffees = filteredCoffees.filter(function (coffee) {
            return coffee.roast.toLowerCase() === selectedRoast;
        })

    }
    if (searchInput !== '') {
        filteredCoffees = filteredCoffees.filter(function (coffee) {
            return coffee.name.toLowerCase().includes(searchInput);
        })
    }
    if (filteredCoffees.length === 0) {
        coffeeCards.innerHTML =
            `<h3>No coffees were found</h3>`
    } else {
        coffeeCards.innerHTML = renderCoffees(filteredCoffees)

    }
}
//  ------------------------------------------- ADD COFFEE -----------------------------------

async function addCoffees(e) {
        e.preventDefault();
        const newCoffeeName = document.getElementById('add-coffee-input').value.toLowerCase();
        let newRoast = document.getElementById('new-roast-selection').value;
        let coffee = {
                    // id: identifier,
                    name: newCoffeeName,
                    roast: newRoast,
        }
        console.log(coffee)
       let coffeeJSON = JSON.stringify(coffee);
        let options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: coffeeJSON
        }
        let response = await fetch('http://localhost:3000/coffees', options)
        updateCoffees();
}
newCoffeeSubmitButton.addEventListener('click', addCoffees)
async function getCoffees(){
    let options = {
        method: "GET"
    }
    let response = await fetch('http://localhost:3000/coffees', options);
    let data = await response.json();
    return data;
}
(async ()=>{
    let coffees = await getCoffees();
    coffeeCards.innerHTML = renderCoffees(coffees);
})();

searchBar.addEventListener('input', updateCoffees);
//----------------------------------------------------------------------

