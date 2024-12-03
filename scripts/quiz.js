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
            primaryConcern: document.getElementById("primary-concern").value,
            sensitivity: getSelectedValue("sensitivity"),
            currentProducts: getSelectedCheckboxes("current-products").join(", "), // Convert array to string
        };

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
