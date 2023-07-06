"use strict"
const submitButton = document.querySelector('#submit');
const roastSelection = document.querySelector('#roast-selection');
const searchBar = document.getElementById('search-input')
roastSelection.addEventListener('change', updateCoffees)
submitButton.addEventListener('click', updateCoffees);


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

function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    let selectedRoast = roastSelection.value.toLowerCase();
    let searchInput = searchBar.value;

    let filteredCoffees = coffees;
    if (selectedRoast !== "all") {

        filteredCoffees = filteredCoffees.filter(function(coffee) {
            return coffee.roast.toLowerCase() === selectedRoast;
        })

    }
    if (searchInput !== '') {
        filteredCoffees = filteredCoffees.filter(function(coffee) {
            return coffee.name.toLowerCase().includes(searchInput);
        })
    }
    if (filteredCoffees.length === 0) {
        coffeeCards.innerHTML =
            `<h3>No coffees were found</h3>`
    } else {
        coffeeCards.innerHTML = renderCoffees(filteredCoffees)

    }

    function addNewCoffee() {
        e.preventDefault();
        let newCoffeeName = document.getElementById('add-coffee-input')



    }




}
// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
const coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

const coffeeCards = document.querySelector('#coffees');

coffeeCards.innerHTML = renderCoffees(coffees);
searchBar.addEventListener('input', updateCoffees);
