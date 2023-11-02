const array = [];
let flag = false; //a flag to check if the animation is still ongoing
var slider = document.getElementById("sizeTick");
var output = document.getElementById("arraySize");
output.innerHTML = slider.value; // Display the default slider value
size = slider.value; //array size

//creating the array using random number generator
function randomize() {
    if (flag) return;   //if its still animating, then dont generate another array
    for (let elem = 0; elem < size; elem++) {
        array[elem] = Math.random() * 15 + 1;
    }
    display();
}

//playing the animation / sorting the array
function play() {
    if (flag) return; 
    const copy = [...array];
    const moves = cocktailSort(copy);
    animate(moves);
}

//animation for the moves
function animate(moves) {
    flag = true;
    if (moves.length == 0) {
        const element = document.querySelectorAll('.bar');
        element.forEach(bar => {
            bar.classList.add('glow-effect');
        });
        flag = false;
        return;
    }
    const move = moves.shift();
    const [i, j] = move.indices;
    if (move.type == 'swap') {
        [array[i], array[j]] = [array[j], array[i]];
    }
    display(move);
    setTimeout(()=> {
        animate(moves);
    }, 8);
}

//call the array generator for the first iteration
randomize();

//displaying the array 
function display(move) {
    container.innerHTML = "";
    for (let elem = 0; elem < size; elem++) {
        const bar = document.createElement("div");
        bar.style.height = array[elem] * 10 + "%";
        bar.classList.add("bar");
        if (move && move.indices.includes(elem)) {
            bar.style.background = move.type == 'swap' ? "red" : "blue";
        }
        container.appendChild(bar);
    }
}

//cocktail sort algorithm
function cocktailSort(array) {
    const moves = [];
    var forwardSwap, backwardSwap;
    do {
        forwardSwap = false, backwardSwap = false;
        //forward pass
        for (let index = 0; index < size - 1; index++) {
            moves.push({indices: [index, index + 1], type: "compare"});
            if (array[index] > array[index + 1]) {
                forwardSwap = true;
                moves.push({indices: [index, index + 1], type: "swap"});
                var temp = array[index];
                array[index] = array[index + 1];
                array[index + 1] = temp;
            }
        }
        //backward pass
        for (let index = size - 2; index >= 0; index--) {
            moves.push({indices: [index, index + 1], type: "compare"});
            if (array[index + 1] < array[index]) {
                backwardSwap = true;
                moves.push({indices: [index, index + 1], type: "swap"});
                var temp = array[index];
                array[index] = array[index + 1];
                array[index + 1] = temp;
            }
        }
    } while (forwardSwap || backwardSwap);
    return moves;
}

//slider functions
// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    if (flag) return;
    output.innerHTML = this.value;
    size = this.value;
    randomize();
}


//for the shaking animation after clicking play
const playButton = document.getElementById('playButton');

playButton.addEventListener('click', () => {
    playButton.classList.add('shake');
        setTimeout(() => {
        playButton.classList.remove('shake');
    }, 300);
});

const randomizerButton = document.getElementById('random');

randomizerButton.addEventListener('click', () => {
    randomizerButton.classList.add('shake');
        setTimeout(() => {
            randomizerButton.classList.remove('shake');
    }, 300);
});

