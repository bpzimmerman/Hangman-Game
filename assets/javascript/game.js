var dogArray = [];
var guessArray = [];
var usedArray = [];
var newWord = document.getElementById("word");
var won = document.getElementById("wins");
var lost = document.getElementById("losses");
var chance = document.getElementById("chances");
var used = document.getElementById("use");
var instruction = document.getElementById("inst");
var press;
var lID;
var snd;
var song;
var w = 0;
var l = 0;
var c;

function selectImg (imgArray){
    var imgIndex = Math.floor(Math.random() * imgArray.length);
    var pic = imgArray[imgIndex];
    document.getElementById("picture").src = "assets/images/" + pic;
    document.getElementById("picture").alt = pic;
};

// Start button: initialize temporary arrays, get new word, put new word in array, put placeholders in array accounting for spaces (same length at word array)
function start() {
    c = 5;
    chance.textContent = c;
    dogArray.length = 0;
    guessArray.length = 0;
    for (var j = 0; j < usedArray.length; j+=1){
        document.getElementById("u" + usedArray[j]).style.visibility = "initial";
    };
    usedArray.length = 0;
    var breedIndex = Math.floor(Math.random() * breeds.length);
    var dog = breeds[breedIndex].toLowerCase();
    // console.log(dog); // displays the solution in the console log
    for (var x = 0; x < dog.length; x+=1){
        dogArray.push(dog.charAt(x));
        if (dog.charAt(x) === " "){
            guessArray.push(" ");
        }
        else {
            guessArray.push("_")
        };
    };
    
    newWord.textContent = guessArray.join(" ");
    instruction.innerHTML = "<h3>Click on one of the Available Letters or use the keyboard to guess a letter.";
    selectImg(initImgArray);
};

// Reset Game button: reset entire game to on-load default values
function reset(){
    location.reload(true)
};

// Letter click function
function letterClick(lID){
    var letter = document.getElementById(lID).textContent.toLowerCase();
    eval(letter);
};

// Letter press fuction 
document.onkeyup = function(event){
    var letter = event.key.toLowerCase();
    eval(letter);
};

// Evalute guesses and track score
function eval(press){
    var usedIndex = usedArray.indexOf(press);
    var alphaIndex = alphabet.indexOf(press);
    var letterIndex = dogArray.indexOf(press);
    if (dogArray.length === 0){
        alert("Click Start to select a new word");
    }
    else if (guessArray.indexOf("_") === -1){
        alert("You Won! Click Start to select a new word.");
    }
    else if (c === 0){
        alert("You Lost! Click Start to select a new word.");
    }
    else if (alphaIndex === -1){
        alert("You selected " + press + ". Please select a letter.");
    }
    else if (usedIndex === -1){
        usedArray.push(press);
        document.getElementById("u" + press).style.visibility = "hidden";
        if (letterIndex === -1){
            c -= 1;
            chance.textContent = c;
            if (c === 0){
                alert("You Lost! Click Start to select a new word.");
                l += 1;
                lost.textContent = l;
                selectImg(lossImgArray);
                newWord.textContent = dogArray.join(" ").toUpperCase();
                instruction.innerHTML = "<h2>Press Start for a New Word";
            }
        }
        else{
            var i = letterIndex;
            while (i != -1){
                guessArray[i] = press;
                i = dogArray.indexOf(press, i+=1);
            };

            newWord.textContent = guessArray.join(" ").toUpperCase();

            if (guessArray.indexOf("_") === -1){
                alert("You Won! Click Start to select a new word.");
                w += 1;
                won.textContent = w;
                selectImg(winImgArray);
                instruction.innerHTML = "<h2>Press Start for a New Word";
            };
        };
    };
};