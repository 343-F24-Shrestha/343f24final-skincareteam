window.onload = function () {
    const form = document.getElementById("quiz-form");

    // Regex for name validation
    const nameRegex = /^[A-Za-zÀ-ÿ'’\- ]{1,50}$/;

    // Handle form submission
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;

        // Validate name input
        if (!nameRegex.test(name)) {
            alert("Please enter a valid name: 1-50 characters, letters, spaces, apostrophes, and hyphens only.");
            return;
        }

        // Save user name
        localStorage.setItem("userName", name);

        // Collect quiz results
        const quizResults = {
            skinType: getSelectedValue("skin-type"),
            primaryConcern: document.getElementById("primary-concern").value,
            sensitivity: getSelectedValue("sensitivity"),
            currentProducts: getSelectedCheckboxes("current-products"),
        };

        if (!quizResults.primaryConcern) {
            alert("Please select a primary skin concern.");
            return;
        }

        // Save results to localStorage
        localStorage.setItem("quizResults", JSON.stringify(quizResults));

        // Redirect to results page
        window.location.href = "results.html";
    });

    // Utility to get selected radio button value
    function getSelectedValue(groupName) {
        const selectedOption = document.querySelector(`input[name="${groupName}"]:checked`);
        return selectedOption ? selectedOption.value : null;
    }

    // Utility to get selected checkbox values
    function getSelectedCheckboxes(groupName) {
        return Array.from(document.querySelectorAll(`input[name="${groupName}"]:checked`)).map(
            (checkbox) => checkbox.value
        );
    }
};
