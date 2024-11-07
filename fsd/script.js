const questions = [
   
    {
        question: "What is India’s GDP growth rate?",
        options: ["3%", "5%", "7%", "9%"],
        answer: 2 // imf ne bola hai iss saal ye hoga
    },
    {
        question: "What is Bharat's Independence Day?",
        options: ["January 26", "August 15", "October 2", "December 25"],
        answer: 1 // August 15 is the answer
    },
    {
        question: "Who is our FSD faculty?",
        options: ["Prasant Tomar", "Akhilesh Srivastav", "Anil Dubey", "Abhishek Shukla"],
        answer: 0 // Prasant Tomar is correct
    }
];

let currentQuestionIndex = 0;
let userAnswers = Array(questions.length).fill(null);

function loadQuestion() {
    const questionContainer = document.getElementById("question-container");
    const question = questions[currentQuestionIndex];

    questionContainer.innerHTML = `
        <h2>${question.question}</h2>
        <div class="options">
            ${question.options.map((option, index) => `
                <label>
                    <input type="radio" name="option" value="${index}" ${userAnswers[currentQuestionIndex] === index ? 'checked' : ''}>
                    ${option}
                </label>
            `).join('')}
        </div>
    `;

    updateButtons();
}

function nextQuestion() {
    saveAnswer();
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    }
}

function prevQuestion() {
    saveAnswer();
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

function saveAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
        userAnswers[currentQuestionIndex] = parseInt(selectedOption.value);
    }
}

function updateButtons() {
    document.getElementById("prev-btn").disabled = currentQuestionIndex === 0;
    document.getElementById("next-btn").style.display = currentQuestionIndex < questions.length - 1 ? 'inline' : 'none';
    document.getElementById("submit-btn").style.display = currentQuestionIndex === questions.length - 1 ? 'inline' : 'none';
}

function submitQuiz() {
    saveAnswer();
    let score = 0;
    userAnswers.forEach((answer, index) => {
        if (answer === questions[index].answer) score++;
    });
    
    const scorePercentage = (score / questions.length) * 100;
    document.getElementById("score-container").style.display = 'block';
    document.getElementById("score-container").innerText = `Your score: ${scorePercentage.toFixed(2)}%`;
}

loadQuestion();
