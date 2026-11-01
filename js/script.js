console.log("script.js connected!");

// Keep track of the player's answers
let userAnswers = {};

// Find all the answer buttons
const answerButtons = document.querySelectorAll(".answer-btn");

// Find the results elements
const showResultButton = document.getElementById("show-result");
const resultContainer = document.getElementById("result-container");
const resultText = document.getElementById("result-text");

// Listen for clicks on answer buttons
answerButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        // Find which question this button belongs to
        const question = button.closest(".question-block");
        const questionID = question.id;

        // Remove the selected highlight from other answers
        const buttons = question.querySelectorAll(".answer-btn");

        buttons.forEach(function(otherButton) {
            otherButton.classList.remove("selected");
        });

        // Highlight the clicked answer
        button.classList.add("selected");

        // Save the player's answer
        userAnswers[questionID] = button;

        console.log("Answers selected:", userAnswers);

    });

});


// Calculate and display the player's result
function displayResult() {

    // Make sure every question has been answered
    const questions = document.querySelectorAll(".question-block");

    if (Object.keys(userAnswers).length !== questions.length) {
        resultContainer.style.display = "block";
        resultText.textContent = "Please answer every question before viewing your results!";
        return;
    }

    // Starting scores for each class
    let scores = {
        warrior: 0,
        mage: 0,
        rogue: 0,
        priest: 0
    };

    // Add points from every selected answer
    Object.values(userAnswers).forEach(function(button) {

        scores.warrior += Number(button.dataset.warrior);
        scores.mage += Number(button.dataset.mage);
        scores.rogue += Number(button.dataset.rogue);
        scores.priest += Number(button.dataset.priest);

    });

    // Find the highest score
    let highestScore = Math.max(
        scores.warrior,
        scores.mage,
        scores.rogue,
        scores.priest
    );

    // Find which classes earned that score
    let winningClasses = Object.keys(scores).filter(function(className) {
        return scores[className] === highestScore;
    });

    // Class descriptions
    const descriptions = {
        warrior: "You are a Warrior! Dedicated, determined, and ready to face challenges head-on.",
        mage: "You are a Mage! Knowledgeable, curious, and always searching for answers.",
        rogue: "You are a Rogue! Clever, adaptable, and willing to find your own path.",
        priest: "You are a Priest! Dedicated, thoughtful, and driven to protect others."
    };

    // Display the winning class or classes
    let result = "";

    if (winningClasses.length === 1) {

        let winner = winningClasses[0];

        result = descriptions[winner];

    } else {

        let classNames = winningClasses.map(function(className) {
            return className.charAt(0).toUpperCase() + className.slice(1);
        });

        result = "You are a combination of: " + classNames.join(" and ") + "!";

    }

    // Show the result on the webpage
    resultContainer.style.display = "block";
    resultText.textContent = result;

    console.log("Final scores:", scores);
}


// Listen for clicks on the Show Results button
showResultButton.addEventListener("click", displayResult);