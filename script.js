function gradeQuiz() {
    let answers = {
        q1: "Non-ciliated simple columnar epithelium",
        q2: ["The cells are tightly packed", "nuclei are near the basal surface", "elongated and cylindrical nuclei"],
        q3: ["gastrointestinal tract", "esophagus", "stomach", "small intestine", "large intestine", "ducts of endocrine and exocrine glands", "pancreas", "salivary glands"],
        q4: "Transitional Epithelium",
        q5: ["multiple layers of cells", "dome-shaped cells", "stretch and return", "mucus-secreting layer", "absence of cilia and goblet cells", "basal cells contact basement membrane"],
        q6: ["urinary bladder", "ureters", "part of the urethra"],
        q7: "Brown adipose tissue",
        q8: ["high density of mitochondria", "multilocular lipid droplets", "abundant blood vessels", "high expression of UCP1", "peripheral nuclei"],
        q9: "Loose connective tissue",
        q10: "Hyaline Cartilage"
    };

    let totalScore = 0;
    let feedback = "<h3>Results:</h3>";

    function checkAnswer(inputId, correctAnswer) {
        let userAnswer = document.getElementById(inputId).value.trim().toLowerCase();
        if (typeof correctAnswer === "string") {
            if (userAnswer === correctAnswer.toLowerCase()) {
                totalScore += 4;
                return `<p>Question ${inputId.replace("q", "")}: ✅ Correct</p>`;
            } else {
                return `<p>Question ${inputId.replace("q", "")}: ❌ Incorrect. Correct answer: ${correctAnswer}</p>`;
            }
        } else if (Array.isArray(correctAnswer)) {
            let correctCount = correctAnswer.filter(item => userAnswer.includes(item.toLowerCase())).length;
            let score = (correctCount / correctAnswer.length) * 4;
            totalScore += score;
            return `<p>Question ${inputId.replace("q", "")}: ${correctCount > 0 ? "✅ Partially Correct" : "❌ Incorrect"}. Correct: ${correctAnswer.join(", ")}</p>`;
        }
    }

    for (let key in answers) {
        feedback += checkAnswer(key, answers[key]);
    }

    let comment = totalScore >= 16 ? "Excellent!" : totalScore >= 12 ? "Good Job!" : totalScore >= 8 ? "Needs Improvement" : "Try Again";
    feedback += `<h3>Total Score: ${totalScore}/20</h3>`;
    feedback += `<h3>Comment: ${comment}</h3>`;

    document.getElementById("result-container").innerHTML = feedback;
}
