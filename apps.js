'use strict';



let leftImgElement = document.getElementById("leftImg")
let centerImgElement = document.getElementById("centerImg")
let rightImgElement = document.getElementById("righttImg")

let leftImageIndex;
let centerImageIndex;
let rightImageIndex;


let maxAttempts = 25;
let userAttempts = 0;

function OurProducts(name, imgSource) {
    this.name = name;
    this.imgSource = imgSource;
    this.views = 0;
    this.votes = 0;
    OurProducts.all.push(this)
}

OurProducts.all = []

new OurProducts('bag', 'bag.jpg');
new OurProducts('banana', 'banana.jpg');
new OurProducts('bag', 'bag.jpg');
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
new OurProducts('banana', 'banana.jpg');
new OurProducts('water-can', 'water-can.jpg');
new OurProducts('wine-glass', 'wine-glass.jpg');


function generateRandomIndex() {
    return Math.floor(Math.random() * OurProducts.all.length);
}

function renderThreeImages() {
     leftImageIndex = generateRandomIndex()
     centerImageIndex = generateRandomIndex()
     rightImageIndex = generateRandomIndex()
    
    do {
        leftImageIndex = generateRandomIndex()
        // console.log(leftImgElement)
    } while (leftImgElement === rightImgElement || leftImgElement === centerImgElement || rightImgElement === centerImgElement)

    console.log(OurProducts.all[0].imgSource)
    leftImgElement.src = OurProducts.all[leftImageIndex].imgSource;
    centerImgElement.src = OurProducts.all[centerImageIndex].imgSource;
    rightImgElement.src = OurProducts.all[rightImageIndex].imgSource;
    console.log(leftImgElement)


}

renderThreeImages();

leftImgElement.addEventListener('click', handleUserClick);
centerImgElement.addEventListener('click', handleUserClick);
rightImgElement.addEventListener('click', handleUserClick);



function handleUserClick(event) {
    userAttempts++;

    if (userAttempts < maxAttempts) {

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



    }

}
let display = document.getElementById('display');
display.addEventListener('click', userClick);

function userClick(event) {
    let ul = document.getElementById('finalResult');

    for (let i = 0; i < OurProducts.all.length; i++) {
        let li = document.createElement('li');

        ul.appendChild(li);
        li.textContent = OurProducts.all[i].name + ' has views ' + OurProducts.all[i].views + ' has votes ' +  OurProducts.all[i].votes
    }
    display.removeEventListener('click', userClick)
}