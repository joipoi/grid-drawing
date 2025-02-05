//Grid settings
const transitionTime = 1000;
let gridWidth = 20;
let gridHeight = 20;
let squareSize = 40;
let showNumbers = false;
let color1 = 'black';
let color2 = 'orange';
let drawSpeed = 50;

//Javascript variables
let currentPattern = [];
let preDefinedDrawings = {
    Smiley: [11, 12, 22, 21, 17, 27, 26, 16, 52, 62, 63, 64, 74, 75, 76, 77, 67, 57, 58],
    Loop: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 89, 79, 69, 59, 49, 39, 29, 19, 9, 8, 7, 6, 5, 4, 3, 2, 1, 11, 21, 31, 41, 51, 61, 71, 81, 82, 83, 84, 85, 86, 87, 88, 78, 68, 58, 48, 38, 28, 18, 17, 16, 15, 14, 13, 12, 22, 32, 42, 52, 62, 72, 73, 74, 75, 76, 77, 67, 57, 47, 37, 27, 26, 25, 24, 23, 33, 43, 53, 63, 64, 65, 66, 56, 46, 36, 35, 34, 44, 54, 55, 45]
}
let drawingEnabled = true;


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
const holdDrawCB = document.getElementById('holdDrawCB');
const color1Input = document.getElementById('color1Input');
const color2Input = document.getElementById('color2Input');
const drawingTimeInput = document.getElementById('drawingTimeInput');

//Predefined Drawing elems
const selectDrawBtn = document.getElementById('selectDrawBtn');
const drawingsSelect = document.getElementById('drawingsSelect');
const addCurrentBtn = document.getElementById('addCurrentBtn');
const currentNameInput = document.getElementById('currentNameInput');


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
            square.style.backgroundColor = color1; 
        });
        const numbers = document.querySelectorAll('.number');
        numbers.forEach((square) => {
            square.style.color = color1; 
        });
    });
 
    //Drawing Settings elems

    widthInput.addEventListener('change', (e) => {
        gridWidth = e.target.value;
        r.style.setProperty('--grid-width', gridWidth);
        createSquares();
    });

    heightInput.addEventListener('change', (e) => {
        gridHeight = e.target.value;
        r.style.setProperty('--grid-height', gridHeight);
        createSquares();
    });

    sizeInput.addEventListener('change', (e) => {
        squareSize = e.target.value;
        r.style.setProperty('--square-size', squareSize+"px");
        createSquares();
    });

    showNumsCB.addEventListener('change', (e) => {
        const squares = document.querySelectorAll('.square');
        squares.forEach((square) => {
            let childElem = square.children[0];
            if (e.target.checked) {
                childElem.style.display = "inline";
                showNumbers = true;
              } else {
                childElem.style.display = "none";
                showNumbers = false;
              }
        });
    });

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

    color1Input.addEventListener('change', (e) => {
        color1 = e.target.value;
        r.style.setProperty('--color1', color1);
    });
    color2Input.addEventListener('change', (e) => {
        color2 = e.target.value;
        r.style.setProperty('--color2', color2);
    });

    drawingTimeInput.addEventListener('change', (e) => {
        drawSpeed = e.target.value;
    });

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
    const gridSize = gridHeight * gridWidth;
    for (let i = 0; i < gridSize; i++) {
        const square = document.createElement('div');
        square.className = 'square';
        let squareNum = document.createElement('span');
        squareNum.innerHTML = i;
        squareNum.style.display = showNumbers ? "inline" : "none";
        square.append(squareNum);

        container.appendChild(square);
    }
}


function drawPattern(pattern, isTemporary, includeNumbers) {
    const squares = document.querySelectorAll('.square');
    const numbers = document.querySelectorAll('.number');
    let delay = 0;
    

    pattern.forEach((index, count) => {     
        delay += (150 - drawSpeed); 
        
        setTimeout(() => {
            squares[index].style.backgroundColor = color2; 
            if(includeNumbers){
                numbers[count].style.color = color2; 
            }
            
            
            if (isTemporary) {
                setTimeout(() => {
                    squares[index].style.backgroundColor = color1; 
                    if(includeNumbers){
                    numbers[count].style.color = color1; 
                    }
                }, transitionTime); 
            }
        }, delay);
    });
}


function dropDownLogic() {
    const dropDownContainer = document.getElementById('dropDownContainer');
    
    const toggleDropdown = (btn, contentId) => {
        const content = document.getElementById(contentId);
        
        // Close other dropdowns
        const allDropdowns = ['settings1Div', 'settings2Div', 'settings3Div'];
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
    
    const settings3Btn = document.getElementById('settings3Btn');
    settings3Btn.addEventListener('click', () => toggleDropdown(settings3Btn, 'settings3Div'));
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
                
                square.style.backgroundColor = color2;
                patternStringOutput.innerHTML += `<span class='number'>${index}, </span>`;
                currentPattern.push(index);

                changedSquares.add(square);

            }
            if (!tempCB.checked) {
                revertTimeout = setTimeout(() => {
                    changedSquares.forEach((s) => {
                        s.style.backgroundColor = color1; 
                    });
                    changedSquares.clear(); 
                }, transitionTime);
            }
        }
    });
}