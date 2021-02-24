'use strict';



let leftImgElement = document.getElementById("leftImg");
let centerImgElement = document.getElementById("centerImg");
let rightImgElement = document.getElementById("righttImg");

let leftImageIndex;
let centerImageIndex;
let rightImageIndex;


let maxAttempts = 25;
let userAttempts = 0;

let productsNames = [];
let userVotes = [];
let productViews = [];

function OurProducts(name, imgSource) {
    this.name = name;
    this.imgSource = imgSource;
    this.views = 0;
    this.votes = 0;
    OurProducts.all.push(this);
    productsNames.push(name);
}


OurProducts.all = []

new OurProducts('bag', 'images/bag.jpg');
new OurProducts('banana', 'images/banana.jpg');
new OurProducts('usb', 'images/usb.gif');
new OurProducts('bathroom', 'images/bathroom.jpg');
new OurProducts('boots', 'images/boots.jpg');
new OurProducts('breakfast', 'images/breakfast.jpg');
new OurProducts('bubblegum', 'images/bubblegum.jpg');
new OurProducts('chair', 'images/chair.jpg');
new OurProducts('cthulhu', 'images/cthulhu.jpg');
new OurProducts('dragon', 'images/dragon.jpg');
new OurProducts('pen', 'images/pen.jpg');
new OurProducts('pet-sweep', 'images/pet-sweep.jpg');
new OurProducts('sweep', 'images/sweep.png');
new OurProducts('scissors', 'images/scissors.jpg');
new OurProducts('shark', 'images/shark.jpg');
new OurProducts('tauntaun', 'images/tauntaun.jpg');
new OurProducts('water-can', 'images/water-can.jpg');
new OurProducts('wine-glass', 'images/wine-glass.jpg');
new OurProducts('unicorn', 'images/unicorn.jpg');

function generateRandomIndex() {
    return Math.floor(Math.random() * OurProducts.all.length);
}
function checkDublicate(arr1, arr2) {

    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            if (arr1[i] === arr2[j]) {
                return true;
            }
        }
    }
    return false;
}


function generateIndexArray(arraySize) {

    let array = [];
    for (let i = 0; i < arraySize; i++) {
        let randoms = generateRandomIndex();
        do {
            randoms = generateRandomIndex();
        } while (array.indexOf(randoms) >= 0)
        array.push(randoms);
    }

    return array;
}



function renderThreeImages() {

    let existingArray = [];
    existingArray.push(leftImageIndex)
    existingArray.push(centerImageIndex)
    existingArray.push(rightImageIndex)

    let newArray = generateIndexArray(3);
    do {
        newArray = generateIndexArray(3);
        leftImageIndex = generateRandomIndex()
        centerImageIndex = generateRandomIndex()
        rightImageIndex = generateRandomIndex()
        // console.log(leftImgElement)
    } while (checkDublicate(existingArray, newArray))


    leftImageIndex = newArray[0];
    centerImageIndex = newArray[1];
    rightImageIndex = newArray[2];

    console.log(OurProducts.all[0].imgSource);
    leftImgElement.src = OurProducts.all[leftImageIndex].imgSource;
    centerImgElement.src = OurProducts.all[centerImageIndex].imgSource;
    rightImgElement.src = OurProducts.all[rightImageIndex].imgSource;
    console.log(leftImgElement);
}

renderThreeImages();


leftImgElement.addEventListener('click', handleUserClick);
centerImgElement.addEventListener('click', handleUserClick);
rightImgElement.addEventListener('click', handleUserClick);



function handleUserClick(event) {
    userAttempts++;

    if (userAttempts <= maxAttempts) {

        if (event.target.id === 'leftImg' || event.target.id === 'centerImg' || event.target.id === 'righttImg') {
            OurProducts.all[leftImageIndex].views++
            OurProducts.all[centerImageIndex].views++
            OurProducts.all[rightImageIndex].views++
            

            // renderThreeImages();
        }

        if (event.target.id === 'leftImg') {
            OurProducts.all[leftImageIndex].votes++
            // OurProducts.all[leftImageIndex].

        } else if (event.target.id === 'rightImg') {
            // OurProducts.all[rightImageIndex].
            OurProducts.all[rightImageIndex].votes++
        }
        else if (event.target.id === 'centerImg') {
            // OurProducts.all[centerImageIndex].
            OurProducts.all[centerImageIndex].votes++
        }
        renderThreeImages();

    }
    else {
        display.removeEventListener('click', handleUserClick)
        console.log(OurProducts.all.length)
        for (let i = 0; i < OurProducts.all.length; i++) {
            userVotes.push(OurProducts.all[i].votes);
            productViews.push(OurProducts.all[i].views);
        }
        viewChart();
        settingItems();
        
    }

}
let display = document.getElementById('display');
display.addEventListener('click', userClick);

function userClick(event) {
    let ul = document.getElementById('finalResult');

    for (let i = 0; i < OurProducts.all.length; i++) {
        let li = document.createElement('li');

        ul.appendChild(li);
        li.textContent = OurProducts.all[i].name + ' has views ' + OurProducts.all[i].views + ' has votes ' + OurProducts.all[i].votes;
    }
    display.removeEventListener('click', userClick);
    viewChart();
}

function viewChart() {
    
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: productsNames,
            datasets: [{
                label: 'votes',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: userVotes
            },
            {
                label: 'shown',
                backgroundColor: 'black',
                borderColor: 'black',
                data: productViews
            }]
        },

        // Configuration options go here
        options: {}
    });

}



let array4;

function settingItems() {
    array4= {first: userVotes, second: productViews};
    console.log(array4);
    if (JSON.parse(localStorage.getItem('OurProducts')) !== null) {
        gettingItems();
        for(let i = 0 ; i < OurProducts.all.length ; i++){
            array4.first[i] += OurProducts.all[i].votes;
            array4.second[i] += OurProducts.all[i].views;

        }
    }
    let data = JSON.stringify(array4);
    console.log(data);
    localStorage.setItem('OurProducts', data);
    userVotes = array4.first;
    productViews = array4.second;

}

function gettingItems() {

    let stringObject = localStorage.getItem('OurProducts');

    let normalObject = JSON.parse(stringObject);
    if (normalObject !== null) {
        array4 = normalObject;


    }
}

