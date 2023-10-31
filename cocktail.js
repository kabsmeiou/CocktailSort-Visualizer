const size = 50; //array size
const array = [];

//creating the array using random number generator
function randomize() {
    for (let elem = 0; elem < size; elem++) {
        array[elem] = Math.random();
    }
    display();
}

function play() {
    const copy =[...array];
    const swaps = cocktailSort(copy);
    animate(swaps);
}


//animation for the swaps
function animate(swaps) {
    if (swaps.length == 0) {
        return;
    }
    const [i, j] = swaps.shift();
    [array[i], array[j]] = [array[j], array[i]];
    display();
    setTimeout(()=> {
        animate(swaps);
    }, 20);
}

//call the array generator for the first iteration
randomize();

//displaying the array 
function display() {
    container.innerHTML = "";
    for (let elem = 0; elem < size; elem++) {
        const bar = document.createElement("div");
        bar.style.height = array[elem] * 100 + "%";
        bar.classList.add("bar");
        container.appendChild(bar);
    }
}

//cocktail sort algorithm
function cocktailSort(array) {
    const swaps = [];
    var forwardSwap, backwardSwap;
    do {
        forwardSwap = false, backwardSwap = false;
        //forward pass
        for (let index = 0; index < size - 1; index++) {
            if (array[index] > array[index + 1]) {
                forwardSwap = true;
                swaps.push([index, index + 1]);
                var temp = array[index];
                array[index] = array[index + 1];
                array[index + 1] = temp;
            }
        }
        //backward pass
        for (let index = size - 2; index >= 0; index--) {
            if (array[index + 1] < array[index]) {
                backwardSwap = true;
                swaps.push([index, index + 1]);
                var temp = array[index];
                array[index] = array[index + 1];
                array[index + 1] = temp;
            }
        }
    } while (forwardSwap || backwardSwap);
    return swaps;
}


