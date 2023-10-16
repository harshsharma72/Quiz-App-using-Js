const questions = [
    {
        question : "Which is the largest animal in this world?",
        answer: [
                { text: "Shark", correct:false },
                { text: "Blue Whale", correct:true },
                { text: "Elephant", correct:false },
                { text: "Giraphee", correct:false },
        ]
    },
    {
        question : "Which is the Smallest country in this world?",
        answer: [
                { text: "Vatican City", correct:true},
                { text: "Nepal", correct:false},
                { text: "Bhutan", correct:false },
                { text: "Sri Lanka", correct:false },
        ]
    },
    {
        question : "Which is the largest dessert in this world?",
        answer: [
                { text: "Kalhari", correct:false },
                { text: "Gobi", correct:false },
                { text: "Sahara", correct:false },
                { text: "Antartica", correct:true },
        ]
    },
    {
        question : "Which is the Smallest continent in this world?",
        answer: [
                { text: "Asia", correct:false },
                { text: "Austrialia", correct:true },
                { text: "Arctic", correct:false },
                { text: "Africa", correct:false },
        ]
    }
]
const questionElement = document.querySelector("#question");
const answerButton = document.querySelector(".options");
const nextButton = document.querySelector("#next-btn");

let currQuenIndex = 0;
let score = 0;
function startQuiz(){
    currQuenIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currQuestion = questions[currQuenIndex];
    let quesNo = currQuenIndex + 1;
    questionElement.innerHTML = quesNo + ". " + currQuestion.question;
    currQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    }) 
}
function selectAnswer(e){
    const selectedbtn = e.target;
    const iscorrect = selectedbtn.dataset.correct === "true";
    if(iscorrect){
        selectedbtn.classList.add("correct");
        score++;
    }else{
        selectedbtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = "true";
    })
    nextButton.style.display = "block";
}
function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}
function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "Block";
}
function handleNextButton(){
    currQuenIndex++;
    if(currQuenIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click", () => {
    if(currQuenIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();