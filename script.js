BOX_SIZE = 500
BOX_ELEMENT_STYLE = `display: grid; width:${BOX_SIZE}px; height: ${BOX_SIZE}px;`

var boxElement = document.getElementById("box");
var sliderElement = document.getElementById("slider");
var sliderValueElement = document.getElementById("slider-value");
var squareElementsArray = document.getElementsByClassName("grid-item");
var eraserBtnElement = document.getElementById("eraserBtn");
var clearBtnElement = document.getElementById("clearBtn");
var randomBtnElement = document.getElementById("randomBtn");
var yourPickBtnElement = document.getElementById("yourPickBtn");
var btnElementsArray = [eraserBtnElement, randomBtnElement, yourPickBtnElement]
var colorInputElement = document.getElementById("yourPickInput");

sliderElement.addEventListener("mousemove", changeBox);
eraserBtnElement.addEventListener("click", clickedButtonId);
randomBtnElement.addEventListener("click", clickedButtonId);
yourPickBtnElement.addEventListener("click", clickedButtonId);
clearBtnElement.addEventListener("click", cleanCanvas);
colorInputElement.addEventListener("click", yourPickBtnElement.click());

// buttons functions
function clickedButtonId(e){
    buttonElement = e.target;
    buttonId = buttonElement.id;

    // add active to buton class
    addActiveClassToBtn(buttonElement);

    // remove active from any other buttons
    for (var i = 0; i < btnElementsArray.length; i++) {
        if (btnElementsArray[i].id !== buttonId) {
            removeActiveClassFromBtn(btnElementsArray[i]);
        }
    }
}

function addActiveClassToBtn(btnElement) {
    if (btnElement.classList.contains("active") === false) {
        btnElement.classList.add("active");
    }
}

function removeActiveClassFromBtn(btnElement) {
    if (btnElement.classList.contains("active") === true) {
        btnElement.classList.remove("active");
    }
}

// slider functions
function getSliderValue(){
    var sliderElement = document.getElementById("slider");
    let currentValue = sliderElement.value;
    sliderValueElement.textContent = `${currentValue} X ${currentValue}`;

    return parseInt(currentValue)
}

function removeGridAllItems(){
    while (boxElement.lastElementChild !== null) {
        boxElement.lastElementChild.remove();
    }
}

function addGridItems(noOfSideItems){
    // define total number of squares, if the figure is a square then we just need to squared the no of side items
    totalSquares = (noOfSideItems ** 2)

    // loop through the total number of squares and create them
    for (let i = 0; i < totalSquares; i++) {
        // create small square
        gridItem = document.createElement('div');
        gridItem.id = "square";
        gridItem.classList.add("grid-item");
        boxElement.appendChild(gridItem);
        addOnHoverListener(gridItem);
    }
    // change css to automatically fit into the square
    boxPixelSize = BOX_SIZE / noOfSideItems;
    boxElement.style = (BOX_ELEMENT_STYLE + `grid-template-columns: repeat(${noOfSideItems}, ${boxPixelSize}px); `
                        + `grid-template-rows: repeat(${noOfSideItems}, ${boxPixelSize}px); `);
}

function addOnHoverListener(element){
    element.addEventListener("mouseover", changeSquareColor);
}

function addListenerToSquares(squaresArray){
    for (let i = 0; i < squaresArray.length; i++) {
        addOnHoverListener(squaresArray[i]);
    }
}

function cleanCanvas() {

    // get number of squares from slider
    noOfSquares = getSliderValue();

    // get rid of existing box
    removeGridAllItems();

    // recreate box using the chosen dimension
    addGridItems(noOfSquares);

}

function changeBox(){
    // calculate the number of squares by looking at the number of elements in box element
    squaredNoOfDivsInBox = (Math.sqrt(boxElement.childElementCount));

    // get number of squares from slider
    noOfSquares = getSliderValue();

    // only update the box if box dimension in the UI is different from the slider's value
    if (noOfSquares !== squaredNoOfDivsInBox) {

        cleanCanvas();
    }
}

// color functions
function changeSquareColor(e){

    if (randomBtnElement.classList.contains("active")) {
        var newColor = getRandomColorCode();
    }
    else if (eraserBtnElement.classList.contains("active")) {
        var newColor = "#FFFFFFCC";
    }
    else if (yourPickBtnElement.classList.contains("active")) {
        var newColor = colorInputElement.value;
    }

    e.target.style = `background-color: ${newColor}`;
}

function getRandomColorCode() {
    const randomColor = "#" + ((1<<24)*Math.random() | 0).toString(16);

    // make sure it's returning valid colors, otherwise, it translates to white
    if (randomColor.length === 7) {
        return randomColor;
    }
    else {
        return getRandomColorCode();
    }
  }

window.onload = () => {
    addListenerToSquares(squareElementsArray);
    randomBtnElement.click();
}
