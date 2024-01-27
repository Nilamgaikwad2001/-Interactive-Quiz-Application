const questions=
[
    {
question:"1.PHP stands for -",
choices:["Hypertext Preprocessor","Pretext Hypertext Preprocessor","Personal Home Processor","None of the above"],
correctAnswer:0
    },
{
question:"2.Who is known as the father of PHP?",
choices:["Drek Kolkevi","List Barely","Rasmus Lerdrof","None of the above"],
correctAnswer:2
},
{
question:"3.Variable name in PHP starts with -",
choices:["! (Exclamation)","$ (Dollar)","& (Ampersand)","# (Hash)"],
correctAnswer:1
},
{
    question:"4. Which of the following is not a variable scope in PHP?",
    choices:["Extern","Local","Static","Global"],
    correctAnswer:0
    },

];

const container=document.querySelector(".container");
const questionElement=document.getElementById("question");
const choicesElement=document.getElementById("choices");
const submitButton=document.getElementById("submit-btn");
const scoreElement=document.getElementById("score");
const restartButton=document.getElementById("restart-btn");
const timerElement=document.getElementById("time");

let currentQuestion=0;
let score=0;
let timeLeft=120;

function loadQuestion(){
const question=questions[currentQuestion];
questionElement.textContent=question.question;

choicesElement.innerHTML="";
for(let i=0;i<question.choices.length;i++)
{
const li=document.createElement("li");
const radio=document.createElement("input");
radio.type="radio";
radio.name="choice";
radio.value=i;
li.appendChild(radio);
li.appendChild(document.createTextNode(question.choices[i]));
    choicesElement.appendChild(li);
}
}

function checkAnswer(){
    const selectOption=document.querySelector("input[name='choice']:checked");
    if(selectOption){
        const selectedAnswer=parseInt(selectOption.value);
if(selectedAnswer===questions[currentQuestion].correctAnswer){
    score++;
}
currentQuestion++;
if(currentQuestion<questions.length)
{
    loadQuestion();
}
else{
    showScore();
}
    }
}


function showScore() {
    clearInterval(timerInterval);
    questionElement.style.display = "none";
    choicesElement.style.display = "none";
    submitButton.style.display = "none";
    scoreElement.textContent = `Your score: ${score} out of ${questions.length}`;
    scoreElement.style.display = "block";
    restartButton.style.display = "block";
}




function restartQuiz(){
currentQuestion=0;
score=0;
timeLeft=120;
loadQuestion();
restartButton.style.display="none";
questionElement.style.display="block";
choicesElement.style.display="block";
submitButton.style.display="block";
scoreElement.style.display="none";
timerInterval=setInterval(updateTimer,1000);
}

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    timerElement.textContent = `${minutes}:${seconds}`; 

    if (timeLeft === 0) {
        showScore();
    } else {
        timeLeft--;
    }
}

let timerInterval=setInterval(updateTimer,1000);
submitButton.addEventListener("click",checkAnswer);
restartButton.addEventListener("click",restartQuiz);

loadQuestion();
restartButton.style.display="none";







