document.addEventListener("DOMContentLoaded", function() {
    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");
    const cardStatsContainer = document.querySelector(".stats-cards");
    


    function validateUsername(username) {
        if(username === "") {
            alert("Username cannot be empty.");
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching = regex.test(username);
        if(!isMatching) {
            alert("Invalid username format. Please use only letters, numbers, underscores, or hyphens.");
        }
        return isMatching;
    }

    async function fetchUserDetails(username) {
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
        try {
            searchButton.textContent = "Searching...";
            searchButton.disabled = true;
            const response = await fetch(url);
            if(!response.ok) {
                throw new Error("User not found");
            }
            const data = await response.json();
            console.log("User data:", data);

            displayUserData(data);
        } catch (error) {
            console.error("Error fetching user details:", error);
            statsContainer.innerHTML = `<p>User not found. Please check the username and try again.</p>`;
            alert(error.message);
        }
        finally {
            // usernameInput.value = "";
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
    }

    function updateProgress(solved, total, circle, label) {
        const progressDegree = (solved / total) * 100;
        circle.style.setProperty("--progress-degree", `${progressDegree}%`);
        label.textContent = `${solved} / ${total}`;
    }

    function displayUserData(data) {
        const { totalSolved, easySolved, mediumSolved, hardSolved, totalEasy, totalMedium, totalHard, totalQuestions } = data;
        updateProgress(easySolved, totalEasy, easyProgressCircle, easyLabel);
        updateProgress(mediumSolved, totalMedium, mediumProgressCircle, mediumLabel);
        updateProgress(hardSolved, totalHard, hardProgressCircle, hardLabel);

        const cardData = [
            { title: "Total Solved", value: totalSolved },
            { title: "Total Questions", value: totalQuestions },
            { title: "Easy Solved", value: easySolved },
            { title: "Medium Solved", value: mediumSolved },
            { title: "Hard Solved", value: hardSolved }
        ]
    }

    searchButton.addEventListener("click", function() {
        const username = usernameInput.value.trim();
        console.log("Searching for user:", username);
        if(validateUsername(username)) { 
            //! "bhaga usko "
            fetchUserDetails(username);

        };
    });
});