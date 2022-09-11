
//timer
const timerElement = document.getElementById('timer');
timerElement.innerHTML = "START";
let startingMinutes = 1;
let time; 

//userInput
const userInput = document.getElementById('userinput');

//topDisplay
const topDisplay = document.getElementById('topdisplay');
const intro = document.createElement('p');
intro.innerHTML = "</br></br></br>Click start to begin.";
topDisplay.appendChild(intro);

//resultsBox
const resultsBox = document.createElement('div');
resultsBox.setAttribute("id", "resultsbox");
let correctKeys = 0;
let incorrectKeys = 0;
let totalWords = 0;

//reset
let reset = document.createElement('p');
reset.setAttribute("id", "reset");
reset.innerHTML = "Try Again";


const funFacts = [
    "Flamingoes are only pink because of chemicals called carotenoids in the algae and fish (which also eat the algae) they eat; their feathers are grayish white when they're born.",
    "Mosquitoes are the deadliest animal in the world: They kill more people than any other creature, due to the diseases they carry.",
    "Because limes are denser than lemons, they drop to the bottom of a glass, while lemons float at the top.",
    "There is not one letter \"q\" in any US state name, the only letter in the alphabet to be missing. \"J\" and \"z\" are only represented once each, in New Jersey and Arizona.",
    "The heart of a shrimp is located in its head. They also have an open circulatory system, which means they have no arteries and their organs float directly in blood.",
    "The Ancient Romans used to drop a piece of toast into their wine for good health - hence why we 'raise a toast'.",
    "It's illegal to own just one guinea pig in Switzerland. It's considered animal abuse because they're social beings and get lonely.",
    "The Four Corners is the only spot in the US where you can stand in four states at once: Utah, Colorado, Arizona and New Mexico.",
    "The original name for the search engine Google was Backrub. It was renamed Google after the googol, which is the number one followed by one hundred zeros.",
    "Tigers' skin is actually striped, just like their fur. Also, no two fur patterns are alike.",
    "More people visit France than any other country (Spain is second; the US third).",
    "Iguanas have three eyes. Two normal eyes and a third eye on top of their head that only perceives brightness.",
    "The brain is our fattiest organ and is composed of nearly sixty percent fat.",
    "There are twice as many pyramids in Sudan then there are in Egypt.",
    "Alligators will give manatees the right of way if they are swimming near each other.",
    "The television was invented only two years after the invention of sliced bread."
];


let showNext = true;
let factsDisplayed = [];

function getRandomFact() {
    let index = Math.floor(Math.random() * funFacts.length);
    let funFact = funFacts[index];
    return funFact;
}

function displayRandomFact(funFact) {
    for(let i = 0; i < 12; i++) {
        let lineBreak = document.createElement('br');
        topDisplay.appendChild(lineBreak);
        }
    funFact.split('').forEach(character => {
        let span = document.createElement('span');
        span.innerText = character;
        topDisplay.appendChild(span);
        
    });

    topDisplay.scrollTop = topDisplay.scrollHeight;
    factsDisplayed.push(funFact);
}

function setTheTimer() {
    const radioButtons = document.querySelectorAll('input[name="testopt"]');
    let selectedMinutes;
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            selectedMinutes = parseInt(radioButton.value);
            break;
        } 
    }
    return selectedMinutes;
}




userInput.onkeydown = function (e) {
    if (e.key === " " || e.key === "Spacebar") {
        totalWords++;
    }
}


userInput.addEventListener('input', () => {
    correctKeys = 0;
    incorrectKeys = 0;

    let topDisplayText = topDisplay.querySelectorAll('span');
    let inputValue = userInput.value.split('');
    topDisplayText.forEach((charSpan, index) => {
        const charInput = inputValue[index];
        if (charInput == null) {
            charSpan.classList.remove('correct');
            charSpan.classList.remove('incorrect');
            showNext = false;
        } else if (charInput === charSpan.innerText) {
            correctKeys++;
            charSpan.classList.add('correct');
            charSpan.classList.remove('incorrect');
            showNext = true;
        } else {
            incorrectKeys++;
            charSpan.classList.remove('correct');
            charSpan.classList.add('incorrect');
            showNext = true;
        }


    });

    if (showNext) {
   
        let nextFact = "";
        do {
            nextFact = getRandomFact();

        } while (factsDisplayed.includes(nextFact));

        displayRandomFact(nextFact);
        
    }

});

function showResults() {
    topDisplay.style.display = "none";
    userInput.style.display = "none";
    timerElement.style.display = "none";
    resultsBox.innerHTML = "<h3>Your Results</h3> <p>Correct keys pressed: " + correctKeys + "<br>" +
        "Incorrect keys pressed: " + incorrectKeys + "<br>" +
        "Speed: " + Math.round((totalWords / startingMinutes)) + " words per minute <br>" +
        "Accuracy: " + ((correctKeys / (correctKeys + incorrectKeys)) * 100).toFixed(2) + "% </p>";
    document.body.appendChild(resultsBox);
    document.body.appendChild(reset);

}



reset.addEventListener('click', () => {
    window.location.reload();
})


timerElement.addEventListener('click', () => {
    startingMinutes = setTheTimer();
    time = startingMinutes * 60;
    intro.style.display = "none";
    let funFact = getRandomFact();
    displayRandomFact(funFact);

    let timer = setInterval(countdown => {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        timerElement.innerHTML = minutes + ":" + seconds;
        time--;

        if (timerElement.innerHTML == "0:00") {
            clearInterval(timer);
            alert("Time's up! Click ok to view your results.");
            showResults();

        }

    }, 1000);

});



