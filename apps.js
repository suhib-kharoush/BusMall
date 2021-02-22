
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

new OurProducts('bag', 'bag.jpg');
new OurProducts('banana', 'banana.jpg');
new OurProducts('usb', 'usb.gif');
new OurProducts('bathroom', 'bathroom.jpg');
new OurProducts('boots', 'boots.jpg');
new OurProducts('breakfast', 'breakfast.jpg');
new OurProducts('bubblegum', 'bubblegum.jpg');
new OurProducts('chair', 'chair.jpg');
new OurProducts('cthulhu', 'cthulhu.jpg');
new OurProducts('dragon', 'dragon.jpg');
new OurProducts('pen', 'pen.jpg');
new OurProducts('pet-sweep', 'pet-sweep.jpg');
new OurProducts('sweep', 'sweep.png');
new OurProducts('scissors', 'scissors.jpg');
new OurProducts('shark', 'shark.jpg');
new OurProducts('tauntaun', 'tauntaun.jpg');
new OurProducts('water-can', 'water-can.jpg');
new OurProducts('wine-glass', 'wine-glass.jpg');
new OurProducts('unicorn', 'unicorn.jpg');

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
            display.removeEventListener('click', handleUserClick)

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
        viewChart();


    }

}
let display = document.getElementById('display');
display.addEventListener('click', userClick);

function userClick(event) {
    let ul = document.getElementById('finalResult');

    for (let i = 0; i < OurProducts.all.length; i++) {
        let li = document.createElement('li');

        ul.appendChild(li);
        li.textContent = OurProducts.all[i].name + ' has views ' + OurProducts.all[i].views + ' has votes ' + OurProducts.all[i].votes
    }
    display.removeEventListener('click', userClick);
    viewChart();
}



function viewChart() {
    for (let i = 0; i < OurProducts.all.length; i++) {
        for (let i = 0; i < OurProducts.all.length; i++) {
            userVotes.push(OurProducts.all[i].votes);
            productViews.push(OurProducts.all[i].views);
        }
    }
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

