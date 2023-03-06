// // import config from './config.json' assert {type: "json"};

const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const port = process.env.port || 8000;

jQuery('#drinkPick').on('click', function () {
    let drinkSearch = $('#userSearch').val();
    // let myPrivateAPIKey =  config.myPrivateAPIKey;
    // let myPublicAPIKey = config.myPublicAPIKey;

    $.get(`https://drink-finder-2qxj.onrender.com/api/drinks/${drinkSearch}`, (data) => {

        let arrayData = JSON.stringify(data);
        let dataObj = JSON.parse(arrayData);
        console.log(dataObj);

        // Clear previous search if a new search is initiated
        $('#drinkResult').empty();
        // Variables will be assigned to each data point we pull from our API
        let header = dataObj.data.results[0].name;
        let image = dataObj.data.results[0].thumbnail.path + '/standard_xlarge.jpg';
        if (image === null) {
            image = 'https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/image-not-found-icon.png';
        } else {
            // image = dataObj.data.results[0].thumbnail.path + '/standard_xlarge.jpg';
        };
        let type = dataObj.data.results[0].type;
        let drinks = dataObj.data.results[0].drinks.items; // .join(', ');  
        let sortedDrinks = [];
        for (let i = 0; i < drinks.length; i++) {
            sortedDrinks.push(drinks[i].name);
            sortedDrinks.toString().split(', ');
            // sortedDrinks.split(', ');
        };
        // Append all the information we want to the DOM
        $(`#drinkResult`).append(`<span class='result-card' id='span'></span>`);
        $(`#span`).append(`<h2 class='card-title' id='header'>${header}</h3>`);
        $(`#span`).append(`<img src='${image}' class='card' id='image'>`);
        $(`#span`).append(`<h3 class='type' id='subheader'>${type}</h2>`);
        // $(`#span`).append(`<h4 class='comicbooks' id='comics'>Comic books that ${header} has been in</h4>`);
        $(`#span`).append(`<h4 class='comicbooks' id='comics'>${sortedDrinks}</h4>`);
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});