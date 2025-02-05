//Grid settings
const transitionTime = 1000;
const squareDelay = 100;
let gridWidth = 10;
let gridHeight = 10;
let squareSize = 80;
let showNumbers = true;
let customKeyBind = 'a';

//Javascript variables
let currentPattern = [];
let preDefinedDrawings = {
    Smiley: [11, 12, 22, 21, 17, 27, 26, 16, 52, 62, 63, 64, 74, 75, 76, 77, 67, 57, 58],
    Loop: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 89, 79, 69, 59, 49, 39, 29, 19, 9, 8, 7, 6, 5, 4, 3, 2, 1, 11, 21, 31, 41, 51, 61, 71, 81, 82, 83, 84, 85, 86, 87, 88, 78, 68, 58, 48, 38, 28, 18, 17, 16, 15, 14, 13, 12, 22, 32, 42, 52, 62, 72, 73, 74, 75, 76, 77, 67, 57, 47, 37, 27, 26, 25, 24, 23, 33, 43, 53, 63, 64, 65, 66, 56, 46, 36, 35, 34, 44, 54, 55, 45]
}
let drawingEnabled = false;


//Misc Elems
const container = document.getElementById('squareContainer');
const patternStringOutput = document.getElementById('patternStringOutput');

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
const pauseKeybindInput = document.getElementById('pauseKeybindInput');
const holdDrawCB = document.getElementById('holdDrawCB');

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
            square.style.backgroundColor = 'black'; 
        });
        const numbers = document.querySelectorAll('.number');
        numbers.forEach((square) => {
            square.style.color = 'black'; 
        });
    });
 
    //Drawing Settings elems
    const r = document.querySelector(':root');

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
            if (!e.target.checked) {
                childElem.style.display = "inline";
                showNumbers = true;
              } else {
                childElem.style.display = "none";
                showNumbers = false;
              }
        });
    });

    pauseKeybindInput.addEventListener('change', (e) => {
        const keyBind = e.target.value;
    
        // Update the custom keybind and ensure it's a single character
        if (keyBind.length === 1) {
            customKeyBind = keyBind;
        } else {
            alert('Please enter a single character for the keybind.');
        }
    });

    holdDrawCB.addEventListener('change', (e) => {
        if(e.target.checked){

        }else{
            
        }
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

    document.addEventListener('mousedown', (event) => {
        if (event.button === 0) {
            drawingEnabled = true;
        }
    });

    document.addEventListener('mouseup', () => {
        drawingEnabled = false;
    });

 
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    createSquares();
    dropDownLogic();
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
        let revertTimeout;

        square.addEventListener('mouseenter', () => {
            clearTimeout(revertTimeout); 
            if(drawingEnabled){
            square.style.backgroundColor = 'orange'; 
            patternStringOutput.innerHTML += "<span class='number'>"+ i +", </span>";
            currentPattern.push(i);
        }
        });

        square.addEventListener('mouseleave', () => {
            if (!tempCB.checked && drawingEnabled) {
                revertTimeout = setTimeout(() => {
                    square.style.backgroundColor = 'black'; 
                }, transitionTime); 
            }
        });

        container.appendChild(square);
    }
}


function drawPattern(pattern, isTemporary, includeNumbers) {
    const squares = document.querySelectorAll('.square');
    const numbers = document.querySelectorAll('.number');
    let delay = 0;

    pattern.forEach((index, count) => {     
        delay += squareDelay; 
        
        setTimeout(() => {
            squares[index].style.backgroundColor = 'orange'; 
            if(includeNumbers){
                numbers[count].style.color = 'orange'; 
            }
            
            
            if (isTemporary) {
                setTimeout(() => {
                    squares[index].style.backgroundColor = 'black'; 
                    if(includeNumbers){
                    numbers[count].style.color = 'black'; 
                    }
                }, transitionTime); 
            }
        }, delay);
    });
}


function dropDownLogic() {
    const settings1Btn = document.getElementById('settings1Btn');
    settings1Btn.addEventListener('click', () => {
        document.getElementById("settings1Div").classList.toggle("show");
    });
    const settings2Btn = document.getElementById('settings2Btn');
    settings2Btn.addEventListener('click', () => {
        document.getElementById("settings2Div").classList.toggle("show");
    });

    const settings3Btn = document.getElementById('settings3Btn');
    settings3Btn.addEventListener('click', () => {
        document.getElementById("settings3Div").classList.toggle("show");
    });
    
    
}

function handleKeyDown(event){
    if (event.key.toLowerCase() === customKeyBind.toLowerCase()) {
        drawingEnabled = false;
    }
};

function handleKeyUp(event){
    if (event.key.toLowerCase() === customKeyBind.toLowerCase()) {
        drawingEnabled = true;
    }
};