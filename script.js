class DrawingController {
    constructor() {
        this.transitionTime = 1000;
        this.gridWidth = 20;
        this.gridHeight = 20;
        this.squareSize = 40;
        this.showNumbers = false;
        this.color1 = 'black';
        this.color2 = 'orange';
        this.drawSpeed = 50;
    }

}

//Javascript variables
let currentPattern = [];
let drawingEnabled = true;
const drawingController = new DrawingController();
console.log(drawingController.gridWidth);


//Misc Elems
const container = document.getElementById('squareContainer');
const patternStringOutput = document.getElementById('patternStringOutput');
const r = document.querySelector(':root');

//Main Buttons Elems
const drawBtn = document.getElementById('drawBtn');
const resetBtn = document.getElementById('resetBtn');
const resetBoardBtn = document.getElementById('resetBoardBtn');

//Drawing Settings elems
const sizeInput = document.getElementById('sizeInput');
const widthInput = document.getElementById('widthInput');
const heightInput = document.getElementById('heightInput');
const showNumsCB = document.getElementById('showNumsCB');
const tempCB = document.getElementById('tempCB');
//const holdDrawCB = document.getElementById('holdDrawCB');
const color1Input = document.getElementById('color1Input');
const color2Input = document.getElementById('color2Input');
const drawingTimeInput = document.getElementById('drawingTimeInput');

/*
//Predefined Drawing elems
const selectDrawBtn = document.getElementById('selectDrawBtn');
const drawingsSelect = document.getElementById('drawingsSelect');
const addCurrentBtn = document.getElementById('addCurrentBtn');
const currentNameInput = document.getElementById('currentNameInput');
*/

function init(){
    //Main Buttons Elems
    
    resetBtn.addEventListener('click', () => {
        currentPattern = [];
        patternStringOutput.innerHTML = "";
    });

    drawBtn.addEventListener('click', () => {
        drawPattern(currentPattern, !tempCB.checked, true);
    });

    resetBoardBtn.addEventListener('click', () => {
        const squares = document.querySelectorAll('.square');
        squares.forEach((square) => {
            square.style.backgroundColor = drawingController.color1; 
        });
        const numbers = document.querySelectorAll('.number');
        numbers.forEach((square) => {
            square.style.color = drawingController.color1; 
        });
    });
 
    //Drawing Settings elems

    widthInput.addEventListener('change', (e) => {
        drawingController.gridWidth = e.target.value;
        r.style.setProperty('--grid-width', drawingController.gridWidth);
        createSquares();
    });

    heightInput.addEventListener('change', (e) => {
        drawingController.gridHeight = e.target.value;
        r.style.setProperty('--grid-height', drawingController.gridHeight);
        createSquares();
    });

    sizeInput.addEventListener('change', (e) => {
        drawingController.squareSize = e.target.value;
        r.style.setProperty('--square-size', drawingController.squareSize+"px");
        createSquares();
    });

    showNumsCB.addEventListener('change', (e) => {
        const squares = document.querySelectorAll('.square');
        squares.forEach((square) => {
            let childElem = square.children[0];
            if (e.target.checked) {
                childElem.style.display = "inline";
                drawingController.showNumbers = true;
              } else {
                childElem.style.display = "none";
                drawingController.showNumbers = false;
              }
        });
    });
/*
    const mouseDownHandler = (event) => {
        if (event.button === 0) {
            drawingEnabled = true;
        }
    };
    
    const mouseUpHandler = () => {
        drawingEnabled = false;
    };

    holdDrawCB.addEventListener('change', (e) => {
        if (e.target.checked) {
            document.addEventListener('mousedown', mouseDownHandler);
            document.addEventListener('mouseup', mouseUpHandler);
        } else {
            // Remove the event listeners when not checked
            document.removeEventListener('mousedown', mouseDownHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        }
    });
 */
    color1Input.addEventListener('change', (e) => {
        drawingController.color1 = e.target.value;
        r.style.setProperty('--color1', drawingController.color1);
    });
    color2Input.addEventListener('change', (e) => {
        drawingController.color2 = e.target.value;
        r.style.setProperty('--color2', drawingController.color2);
    });

    drawingTimeInput.addEventListener('change', (e) => {
        drawingController.drawSpeed = e.target.value;
    });

    /*
    //Predefined Drawing elems
    selectDrawBtn.addEventListener('click', () => {
        drawPattern(preDefinedDrawings[drawingsSelect.value], !tempCB.checked, false);
    });

    addCurrentBtn.addEventListener('click', () => {
        if(currentNameInput.value){
            preDefinedDrawings[currentNameInput.value] = currentPattern;
            let opt = document.createElement('option');
            opt.innerHTML = currentNameInput.value;
            drawingsSelect.appendChild(opt);

        }  
    });
    */

    //other
    document.addEventListener('selectstart', (e) => {
        e.preventDefault(); // Prevents text selection
    });

    createSquares();
    dropDownLogic();
    initDrawing();
}
init();
function createSquares() {
    container.innerHTML = "";
    const gridSize = drawingController.gridHeight * drawingController.gridWidth;
    for (let i = 0; i < gridSize; i++) {
        const square = document.createElement('div');
        square.className = 'square';
        let squareNum = document.createElement('span');
        squareNum.innerHTML = i;
        squareNum.style.display = drawingController.showNumbers ? "inline" : "none";
        square.append(squareNum);

        container.appendChild(square);
    }
}


function drawPattern(pattern, isTemporary, includeNumbers) {
    const squares = document.querySelectorAll('.square');
    const numbers = document.querySelectorAll('.number');
    let delay = 0;
    

    pattern.forEach((index, count) => {     
        delay += (150 - drawingController.drawSpeed); 
        
        setTimeout(() => {
            squares[index].style.backgroundColor = drawingController.color2; 
            if(includeNumbers){
                numbers[count].style.color = drawingController.color2; 
            }
            
            
            if (isTemporary) {
                setTimeout(() => {
                    squares[index].style.backgroundColor = drawingController.color1; 
                    if(includeNumbers){
                    numbers[count].style.color = drawingController.color1; 
                    }
                }, drawingController.transitionTime); 
            }
        }, delay);
    });
}


function dropDownLogic() {
    
    const toggleDropdown = (btn, contentId) => {
        const content = document.getElementById(contentId);
        

        // Close other dropdowns
        const allDropdowns = ['settings1Div', 'settings2Div'/*, 'settings3Div'*/];
        allDropdowns.forEach((id) => {
            if (id !== contentId) {
                document.getElementById(id).classList.remove('show');
            }
        });
        
        // Toggle the clicked dropdown
        content.classList.toggle('show');
    };

    const settings1Btn = document.getElementById('settings1Btn');
    settings1Btn.addEventListener('click', () => toggleDropdown(settings1Btn, 'settings1Div'));
    
    const settings2Btn = document.getElementById('settings2Btn');
    settings2Btn.addEventListener('click', () => toggleDropdown(settings2Btn, 'settings2Div'));
    
    /*const settings3Btn = document.getElementById('settings3Btn');
    settings3Btn.addEventListener('click', () => toggleDropdown(settings3Btn, 'settings3Div')); */
}

function initDrawing() {
    let revertTimeout;
    const changedSquares = new Set(); 

    container.addEventListener('mouseover', (e) => {
        if (e.target.classList.contains('square')) {
            clearTimeout(revertTimeout);

            if (drawingEnabled) {
                const square = e.target;
                const index = Array.from(container.children).indexOf(square);
                
                square.style.backgroundColor = drawingController.color2;
                patternStringOutput.innerHTML += `<span class='number'>${index}, </span>`;
                currentPattern.push(index);

                changedSquares.add(square);

            }
            if (!tempCB.checked) {
                revertTimeout = setTimeout(() => {
                    changedSquares.forEach((s) => {
                        s.style.backgroundColor = drawingController.color1; 
                    });
                    changedSquares.clear(); 
                }, drawingController.transitionTime);
            }
        }
    });
}





