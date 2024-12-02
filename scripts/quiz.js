const quizData = [
    {
        question: "How would you describe your skin type?",
        answers: [
            { text: "Normal" },
            { text: "Oily" },
            { text: "Dry" },
            { text: "Combination" },
        ],
    },
    {
        question: "Which skin concern is most significant to you?",
        answers: [
            { text: "Acne or acne marks" },
            { text: "Anti-aging" },
            { text: "Dryness or flaky skin" },
            { text: "Skin texture" },
            { text: "Dullness" },
        ],
    },
    {
        question: "Is your skin sensitive?",
        answers: [
            { text: "Skin is irritated easily" },
            { text: "Skin is rarely irritated" },
            { text: "Unsure" },
        ],
    },
    {
        question: "How would you describe your acne?",
        answers: [
            { text: "No acne" },
            { text: "Mild" },
            { text: "Moderate" },
            { text: "Severe" },
        ],
    },
    {
        question: "What is your age group?",
        answers: [
            { text: "Under 12" },
            { text: "Age 13-17" },
            { text: "Age 18-65" },
            { text: "Over 65" },
        ],
    },
    {
        // This question will later be answered in checkbox style
        question: "What skincare products do you currently use?",
        answers: [
            { text: "Cleanser" },
            { text: "Moisturizer" },
            { text: "Sunscreen" },
            { text: "Serum" },
            { text: "Exfoliant" },
        ],
        // More questions will be added later
    },
];

window.onload = function () {
    const quizContainer = document.getElementById('quiz-questions');
    const form = document.getElementById('quiz-form');

    // Generate quiz questions
    quizData.forEach((item, index) => {
        const questionBlock = document.createElement('div');
        questionBlock.classList.add('mb-3', 'quiz-box');

        // Add question title
        const questionTitle = document.createElement('label');
        questionTitle.classList.add('form-label');
        questionTitle.innerText = item.question;
        questionBlock.appendChild(questionTitle);

        // Add answer options
        item.answers.forEach((answer) => {
            const answerWrapper = document.createElement('div');
            answerWrapper.classList.add('form-check');

            const answerInput = document.createElement('input');
            answerInput.type = 'radio';
            answerInput.name = `question-${index}`;
            answerInput.value = answer.text;
            answerInput.classList.add('form-check-input');
            answerInput.required = true;

            const answerLabel = document.createElement('label');
            answerLabel.classList.add('form-check-label');
            answerLabel.innerText = answer.text;

            answerWrapper.appendChild(answerInput);
            answerWrapper.appendChild(answerLabel);
            questionBlock.appendChild(answerWrapper);
        });

        quizContainer.appendChild(questionBlock);
    });

    // Regex for name validation
    const nameRegex = /^[A-Za-zÀ-ÿ'’\- ]{1,50}$/;

    // Handle form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;

        // Validate name input
        if (!nameRegex.test(name)) {
            alert("Please enter a valid name: 1-50 characters, letters, spaces, apostrophes, and hyphens only.");
            return;
        }
        localStorage.setItem("userName", name);

        // Collect quiz results
        const quizResults = {};
        for (let i = 0; i < quizData.length; i++) {
            const selectedAnswer = document.querySelector(`input[name="question-${i}"]:checked`);
            if (selectedAnswer) {
                quizResults[`question-${i}`] = selectedAnswer.value;
            }
        }

        // Save quiz results to localStorage
        localStorage.setItem("quizResults", JSON.stringify(quizResults));

        // Redirect to results page
        window.location.href = 'results.html';

        // quiz results will be handled properly later
    });
};