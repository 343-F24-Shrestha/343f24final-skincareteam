window.onload = function () {
    const form = document.getElementById("quiz-form");

    // Regex for name validation
    const nameRegex = /^[A-Za-zÀ-ÿ'’\- ]{1,50}$/;

    // Handle form submission
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission behavior

        const name = document.getElementById("name").value;

        // Validate name input
        if (!nameRegex.test(name)) {
            alert("Please enter a valid name: 1-50 characters, letters, spaces, apostrophes, and hyphens only.");
            return;
        }

        // Collect quiz results
        const quizResults = {
            name: name,
            skinType: getSelectedValue("skin-type"),
            primaryConcern: document.getElementById("primary-concern").value, // Handling select input directly
            sensitivity: getSelectedValue("sensitivity"),
            environment: getSelectedValue("environment"),
        };

        // Ensure required fields are selected
        if (!quizResults.primaryConcern) {
            alert("Please select a primary skin concern.");
            return;
        }

        // Save results to localStorage
        localStorage.setItem("quizResults", JSON.stringify(quizResults));
        localStorage.setItem("userName", name);

        // Redirect to results page with query parameters
        const queryParams = new URLSearchParams(quizResults).toString();
        window.location.href = `results.html?${queryParams}`;
    });

    // Utility function to get selected value for radio or select inputs
    function getSelectedValue(groupName) {
        // Handle radio buttons
        const inputElement = document.querySelector(`input[name="${groupName}"]:checked`);
        if (inputElement) {
            return inputElement.value;
        }

        // Handle select elements
        const selectElement = document.getElementById(groupName);
        if (selectElement) {
            return selectElement.value !== "" ? selectElement.value : null;
        }

        return null; // No value selected
    }
};
