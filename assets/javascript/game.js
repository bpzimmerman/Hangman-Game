var breeds = ["basenji", "beagle", "petit basset griffon vendeen", "greyhound", "german shepherd", "belgian malinois", "poodle", "american english coonhound"];

var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

var dogArray = [];
var guessArray = [];
var usedArray = [];
var newWord = document.getElementById("word");
var breedIndex;
var dog;
var press;
var alphaIndex;
var letterIndex;
var won = document.getElementById("wins");
var lost = document.getElementById("losses");
var chance = document.getElementById("chances");
var used = document.getElementById("use");
var w = 0;
var l = 0;
var c;
    
// Start button: initialize temporary arrays, get new word, put new word in array, put placeholders in array  accounting for spaces (same length at word array)
function start() {
    c = 3;
    chance.textContent = c;
    dogArray.length = 0;
    guessArray.length = 0;
    usedArray.length = 0;
    used.textContent = usedArray.join(" ");
    breedIndex = Math.floor(Math.random() * breeds.length);
    dog = breeds[breedIndex];
    for (x = 0; x < dog.length; x+=1){
        dogArray.push(dog.charAt(x));
        if (dog.charAt(x) === " "){
            guessArray.push(" ");
        }
        else {
            guessArray.push("_")
        };
    }
    
    newWord.textContent = guessArray.join(" ");
    console.log(dog);
};

// Reset Game button: reset entire game to on-load default values
function reset(){
    location.reload(true)
};

// log and evaluate guesses; track score 
document.onkeyup = function(event){
    press = event.key.toLowerCase();
    usedIndex = usedArray.indexOf(press);
    alphaIndex = alphabet.indexOf(press);
    letterIndex = dogArray.indexOf(press);
    if (guessArray.indexOf("_") === -1){
        alert("You Won! Click Start to select a new word.");
    }
    else if (c === 0){
        alert("You Lost! Click Start to select a new word.");
    }
    else if (alphaIndex === -1){
        alert("You selected " + event.key + ". Please select a letter.");
    }
    else if (usedIndex != -1){
        alert("You selected a letter that has already been tried! Select a different letter.");
    }
    else {
        usedArray.push(press);
        usedArray.sort();
        used.textContent = usedArray.join(" ");
        console.log = usedArray.join(" ");
        if (letterIndex === -1){
            c -= 1;
            chance.textContent = c;
            if (c === 0){
                alert("You Lost! Click Start to select a new word.");
                l += 1;
                lost.textContent = l;
            }
            else{
                alert("The letter you selected is not in the word! Select a different letter.");
            };
        }
        else{
            var i = letterIndex;
            while (i != -1){
                guessArray[i] = press;
                i = dogArray.indexOf(press, i+=1);
            };

            newWord.textContent = guessArray.join(" ");

            if (guessArray.indexOf("_") === -1){
                alert("You Won! Click Start to select a new word.");
                w += 1;
                won.textContent = w;
            };
        };
    };
};
