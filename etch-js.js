//>>>Create initial components
    const container = document.querySelector('.container')
    const gridDiv = document.createElement('div')
    const optionsDiv = document.createElement('div')
    const initialGridX = 16
    const initialGridY = 16
    const newGridBtn = document.createElement('button')
    const clearGridBtn = document.createElement('button')
    const optionRGBBtn = document.createElement('button')
    const optionDarkBtn = document.createElement('button')
    const optionFillDefaultBtn = document.createElement('button')
    const optionFillColorBtn = document.createElement('button')
    const inputColorPicker = document.createElement('input')
    var currentEvent = "BW"
    

//>>>Add classes to each component
    optionsDiv.setAttribute('id','options')
    gridDiv.setAttribute('id','grid')
    newGridBtn.setAttribute('id','newGrid')
    clearGridBtn.setAttribute('id','clearGrid')
    optionRGBBtn.setAttribute('id','optionRGB')
    optionDarkBtn.setAttribute('id','optionDark')
    optionFillDefaultBtn.setAttribute('id','optionFillDefault')
    optionFillColorBtn.setAttribute('id','optionFillColor')
    inputColorPicker.setAttribute('id','colorPicker')
    inputColorPicker.setAttribute('type','color')

//>>>Add content to each button

    newGridBtn.textContent = "New Grid"
    clearGridBtn.textContent = "Clear Grid"
    optionRGBBtn.textContent = "RGB Cycle"
    optionDarkBtn.textContent = "Darken"
    optionFillDefaultBtn.textContent = "Fill"
    optionFillColorBtn.textContent = "Fill Color"

//>>>Add elements to DOM
    
    container.appendChild(optionsDiv)
    container.appendChild(gridDiv)
    optionsDiv.appendChild(newGridBtn)
    optionsDiv.appendChild(clearGridBtn)
    optionsDiv.appendChild(optionRGBBtn)
    optionsDiv.appendChild(optionDarkBtn)
    optionsDiv.appendChild(optionFillDefaultBtn)
    optionsDiv.appendChild(optionFillColorBtn)
    optionsDiv.appendChild(inputColorPicker)


//>>> Functions
function createGrid(x, y) {
    grid = document.querySelector('#grid')
    for (i=0; i<x; i++) {
        newRow = document.createElement('div')
            for (j=0;j<y;j++) {
                newCol= document.createElement('div')
                newCol.setAttribute('data-col',[j+1])
                newCol.setAttribute('class','col')
                newRow.appendChild(newCol)
            }
        newRow.setAttribute('data-row',[i+1])
        newRow.setAttribute('class','row')
        grid.appendChild(newRow)
    } 
    cells = grid.querySelectorAll('.col')
    cells.forEach((cell) => {
        cell.addEventListener('mouseover', () => {
            changeColor(cell)
        })
    })
}
function clearGrid () {
    grid = document.querySelector('#grid')
    cells = grid.querySelectorAll('.col')
    cells.forEach((cell) => {
        cell.style.backgroundColor = ""
    })
}

function changeColor(target) {
    switch(currentEvent) {
        case "BW":
            target.style.backgroundColor = "black"
            break;
        case "RGB":
            randomR = Math.floor(Math.random()*255)
            randomG = Math.floor(Math.random()*255)
            randomB = Math.floor(Math.random()*255)
            target.style.backgroundColor = "rgb("+randomR+","+randomG+","+randomB+")"
            break;
        case "DARK":
            targetColors = getComputedStyle(target).getPropertyValue("background-color")
            colors = targetColors.match(/[\d.]+/g)
            if(colors.length === 3) {
                colors.push(1)
                colors[3] = "0" 
            } else {
            opacityOld = colors[3]
            opacity = parseFloat(opacityOld)+0.1
            target.style.backgroundColor = "rgba(0,0,0," + opacity + ")"
            }
            break;
        case "COLOR":
            target.style.backgroundColor = selector
    }
    
}




//>>>Initiates the first 16x16grid
createGrid(initialGridX,initialGridY) 
var selector = document.querySelector('#colorPicker').value

//>>>If New grid button is pressed, asks for and validates two inputs and either errors or draws the new grid
newGridBtn.addEventListener('click', function() {
    grid = document.querySelector('#grid')
    newX = parseInt(prompt('How many rows?'))
    newY = parseInt(prompt('How many columns?'))
    if (newX > 100 || newY > 100) {
        alert("Max rows/columns is 100")
        grid.replaceChildren()
        createGrid(initialGridX,initialGridY)
    } else if (Number.isInteger(newY) && Number.isInteger(newX)){
        grid.replaceChildren()
        createGrid(newX,newY)
    } else {
        alert("Rows and columns must be a number")
        grid.replaceChildren()
        createGrid(initialGridX,initialGridY)
    }
})

optionRGBBtn.addEventListener('click', () => currentEvent = "RGB")
optionFillDefaultBtn.addEventListener('click', () => currentEvent = "BW")
optionDarkBtn.addEventListener('click', () => currentEvent = "DARK")
optionFillColorBtn.addEventListener('click', () => currentEvent = "COLOR")
clearGridBtn.addEventListener('click', () => clearGrid())
inputColorPicker.addEventListener('change', () => selector = document.querySelector('#colorPicker').value)
//create a "Clear Grid" button at top of screen

//create option buttons/radios for:
    //rgb
    //darken
    //fill (B&W) [default]
    //fill (color)

//add a hover event listener to each cell

//on hover, change the background color of the cell 



//button push creates input for new cell size - 100x100max, validate and error if over

//on input confirm, delete the old grid and create new blank grid