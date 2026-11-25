const dropdownButton =
    document.getElementById("dropdownButton");

const options =
    document.getElementById("options");

const selectionText =
    document.getElementById("selectionText");

const randomButton =
    document.getElementById("randomButton");

const randomPopup =
    document.getElementById("randomPopup");

const dice =
    document.getElementById("dice");

const randomResult =
    document.getElementById("randomResult");

const closePopup =
    document.getElementById("closePopup");

const tryAgain =
    document.getElementById("tryAgain");



const artStyles = [
    "Drawings",
    "Paintings",
    "Mosaic",
    "Sculpture",
    "Modern Art"
];



let selectedStyles =
    JSON.parse(localStorage.getItem("selectedStyles")) || [];


dropdownButton.addEventListener("click", function () {

    options.classList.toggle("hidden");

    const isOpen =
        !options.classList.contains("hidden");

    dropdownButton.setAttribute(
        "aria-expanded",
        isOpen
    );

});



const styleButtons =
    document.querySelectorAll(".style-option");


styleButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const style = button.dataset.style;

    
        if (style === undefined) {
            return;
        }


        
        if (selectedStyles.includes(style)) {

            selectedStyles =
                selectedStyles.filter(function (item) {

                    return item !== style;

                });

        }


        
        else if (selectedStyles.length < 3) {

            selectedStyles.push(style);

        }


        
        else {

            alert(
                "You can only select three art styles!"
            );

        }


        updateSelection();

    });

});



function updateSelection() {

    styleButtons.forEach(function (button) {

        const style = button.dataset.style;

        button.classList.toggle(
            "chosen",
            selectedStyles.includes(style)
        );

    });


    if (selectedStyles.length === 0) {

        selectionText.textContent =
            "No styles selected yet.";

    }

    else {

        selectionText.textContent =
            "Your selected styles: " +
            selectedStyles.join(", ");

    }


    localStorage.setItem(
        "selectedStyles",
        JSON.stringify(selectedStyles)
    );

}


function startRandomRoll() {

    
    if (selectedStyles.length >= 3) {

        alert(
            "Remove one style before choosing Random!"
        );

        return;

    }


    
    randomPopup.classList.remove("hidden");


    
    dice.classList.add("rolling");


    randomResult.textContent =
        "Finding your art style...";


    tryAgain.classList.add("hidden");


    
    makeConfetti();

    setTimeout(function () {

        dice.classList.remove("rolling");

        const availableStyles =
            artStyles.filter(function (style) {

                return !selectedStyles.includes(style);

            });

        const chosenStyle =
            availableStyles[
                Math.floor(
                    Math.random() *
                    availableStyles.length
                )
            ];

        selectedStyles.push(chosenStyle);


        updateSelection();

        randomResult.textContent =
            "Your art style is: " +
            chosenStyle +
            "!";


        tryAgain.classList.remove("hidden");

        makeConfetti();

    }, 2000);

}


randomButton.addEventListener(
    "click",
    startRandomRoll
);


function closeRandom() {

    randomPopup.classList.add("hidden");

}


closePopup.addEventListener(
    "click",
    closeRandom
);



tryAgain.addEventListener(
    "click",
    function () {

        closeRandom();

        startRandomRoll();

    }
);


document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeRandom();

        }

    }
);


function makeConfetti() {

    const symbols = [
        "✦",
        "✧",
        "❋",
        "✺"
    ];


    for (let i = 0; i < 20; i++) {

        const confetti =
            document.createElement("span");


        confetti.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        confetti.classList.add(
            "confetti"
        );


        confetti.style.left =
            Math.random() * 100 + "vw";


        confetti.style.top =
            Math.random() * 100 + "vh";


        document.body.appendChild(
            confetti
        );


        setTimeout(function () {

            confetti.remove();

        }, 1800);

    }

}


const animationStyle =
    document.createElement("style");


animationStyle.textContent = `

    .confetti {

        position: fixed;

        color: #c6a15b;

        font-size: 25px;

        pointer-events: none;

        z-index: 2000;

        animation:
            confettiFall
            1.8s ease-out forwards;

    }


    @keyframes confettiFall {

        from {

            opacity: 1;

            transform:
                translateY(-20px)
                rotate(0deg);

        }

        to {

            opacity: 0;

            transform:
                translateY(100px)
                rotate(360deg);

        }

    }


    .rolling {

        animation:
            rollDice
            0.3s
            infinite;

    }


    @keyframes rollDice {

        0% {

            transform: rotate(0deg);

        }

        50% {

            transform: rotate(180deg);

        }

        100% {

            transform: rotate(360deg);

        }

    }

`;


document.head.appendChild(
    animationStyle
);


updateSelection();