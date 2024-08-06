console.log("Jai Sai Master Jai Bapuji Maharaj");

// Questions and answers
const questions = [
  {
    question: "What is the purpose of the <head> tag in HTML?",
    answers: [
      { text: "Displays content on the page", correct: false },
      { text: " Contains meta-info, scripts, styles", correct: true },
      { text: "Adds images to the page", correct: false },
      { text: "Creates forms", correct: false },
    ],
  },

  {
    question: "Which HTML element is used to create an ordered list?",
    answers: [
      { text: "Unordered List", correct: false },
      { text: "Ordered List", correct: true },
      { text: "List Item", correct: false },
      { text: "Listing", correct: false },
    ],
  },

  {
    question: "How do you center a div horizontally using CSS Flexbox?",
    answers: [
      { text: "display: block; margin: auto;", correct: false },
      { text: "display: grid; place-items: center;", correct: false },
      { text: "display: flex; justify-content: center;", correct: true },
      { text: "display: inline; text-align: center;", correct: false },
    ],
  },
  {
    question: "What does the margin property do in CSS?",
    answers: [
      { text: "Changes text color", correct: false },
      { text: "Adds space around elements", correct: true },
      { text: "Centers text", correct: false },
      { text: "Adjusts font size", correct: false },
    ],
  },
  {
    question: "How do you declare a variable in JavaScript?",
    answers: [
      { text: "Use variable name = value;", correct: false },
      { text: "Use var, let, or const", correct: true },
      { text: "Use declare variable name = value;", correct: false },
      { text: "Use define variable name = value;", correct: false },
    ],
  },
];

// Accesing dom elements
const questionElement = document.getElementById("question"); // to store the questions assining the  variable to questions element from html
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn"); // assinging the variable to nextButton

let currentQuestionIndex = 0;
let score = 0;

// default view
function Startquiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

//Displaying the questions and question numbers dynamicaly
function showQuestion() {
  resetState(); // hiding the buttons of answers that are not used before the displaying the correct options of answers.
  let currentquestion = questions[currentQuestionIndex]; // storing the question in currentquestion variable
  let questionNo = currentQuestionIndex + 1; // storing the question number in the questionNo. variable
  questionElement.innerHTML = questionNo + "." + currentquestion.question; // displaying the question by inserting in questionElemnt

  // displaying the answer options  dynamically by creating button and inserting answer to it
  currentquestion.answers.forEach((answer) => {
    //  using forEach loop to iterate the each answer as we stored in above array of objects
    const button = document.createElement("button");
    button.innerHTML = answer.text; // dynamicaly created button and inserted the  answer option

    button.classList.add("btn"); // dynamicaly created a class to the button

    answerButtons.appendChild(button); // dynamicaly addded children buttons in div parent container

    // Settig the "data-attribute" for button if its only the right answer.
    if (answer.correct) {
      // console.log(answer.correct, typeof answer.correct);  (true 'boolean')
      button.dataset.correct = answer.correct;
      // console.log(button.dataset.correct, typeof button.dataset.correct);  ("true" string)
      // console.log(answer.correct, typeof answer.correct); ("true" 'boolean' )

      console.log(
        (button.dataset.correct = answer.correct),
        typeof (button.dataset.correct = answer.correct)
      );
      // console.log(button.dataset.correct, typeof button.dataset.correct);
      // console.log(button);
    }
    // adding actions when clicked
    button.addEventListener("click", selectAnswer);
  });
}

// hidding the html elements(only buttons) that are created in html file
function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

// adding the click event action for answer buttons
function selectAnswer(e) {
  const selectedBtn = e.target; // getting the element info by event object.
  // console.log(selectedBtn);

  const isCorrect = selectedBtn.dataset.correct === "true"; // Setting the solution in a variable by equating data attribute value of button
  // console.log(isCorrect);
  // console.log(selectedBtn.dataset.correct, typeof selectedBtn.dataset.correct);

  if (isCorrect) {
    selectedBtn.classList.add("correct"); // if condition satisfies(correct answer) then it adds class "correct" to button(highlights the bgcolor)
    score++; // increasing the score when user chosse the correct answer option
  } else {
    selectedBtn.classList.add("incorrect"); // if it fails then it higlights wrong answer using class "incorrect"
  }

  // Using Array.from method  to create the array of buttons by that we can  highlight the correct answer through  butttons data-attribute value
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct"); // hilights the correct option answer  while user chooses the wrong answer
    }
    button.disabled = true; // disables the all buttons after choosing the answer option by user
  });

  nextButton.style.display = "block"; // displays the next button immediately after click option answer
}

// if the all questions completed then this fucntion displays the total score with play agin button
function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style = "block";
}

// Here currentQuestionIndex increases by one because to diaplay the next question
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion(); // if the index of questioin is less then question length then it shows the other question
  } else {
    showScore(); // if the index of questioin is less then question length then it shows the total score with play aagian button
  }
}

// adding eventlistener to nextbutton to display the next question
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    // Using currentQuestionIndex and questions length to display the next question
    // if the currentQuestionIndex is less then questions length the it triggers the handleNextButton
    handleNextButton();
  } else {
    Startquiz(); // if the  currentQuestionIndex is greater or euqal to lenghth of the questions lenght then it triggers Startquiz
  }
});

Startquiz();
