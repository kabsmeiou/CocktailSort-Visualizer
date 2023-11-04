const array = [];
let flag = false; //a flag to check if the animation is still ongoing

//slider IDs
var slider = document.getElementById("sizeTick");
var speedSlide = document.getElementById("speedTick");

size = slider.value; //array size that corresponds to the slider
speed = 258 - speedSlide.value;

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
var highlight = true;
function animate(moves) {
    flag = true;
    highlight = true;
    if (moves.length == 1) highlight = false;
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
    }, speed);
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
        if (move && move.indices.includes(elem) && highlight) {
            bar.style.background = move.type == 'swap' ? "red" : "blue";
        }
        container.appendChild(bar);
    }
}

//cocktail sort algorithm
function cocktailSort(array) {
    const moves = [];
    var swapped = true;
    while (swapped) {
        swapped = false;
        let start = 0, end = size - 1;
        //forward pass
        for (let index = start; index < end; index++) {
            moves.push({indices: [index, index + 1], type: "compare"});
            if (array[index] > array[index + 1]) {
                swapped = true;
                moves.push({indices: [index, index + 1], type: "swap"});
                var temp = array[index];
                array[index] = array[index + 1];
                array[index + 1] = temp;
            }
        }
        if (!swapped) break;
        swapped = false;
        end--;
        //backward pass
        for (let index = end; index >= start; index--) {
            moves.push({indices: [index, index + 1], type: "compare"});
            if (array[index + 1] < array[index]) {
                swapped = true;
                moves.push({indices: [index, index + 1], type: "swap"});
                var temp = array[index];
                array[index] = array[index + 1];
                array[index + 1] = temp;
            }
        }
    }
    return moves;
}

//slider functions
//update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    if (flag) return;
    var value = (this.value-this.min)/(this.max-this.min)*100
    this.style.background = 'linear-gradient(to right, #f99303 0%, #04d620 ' + value + '%, #fff ' + value + '%, #fff 100%)' 
    size = this.value;
    randomize();
}

speedSlide.oninput = function() {
    if (flag) return;
    var value = (this.value - this.min)/(this.max - this.min) * 100
    this.style.background = 'linear-gradient(to right, #f99303 0%, #04d620 ' + value + '%, #fff ' + value + '%, #fff 100%)' 
    speed = 258 - this.value;
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

