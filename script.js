// Correct Firebase Configuration (Replace with Your Real Credentials)
const firebaseConfig = {
    apiKey: "AIzaSyEXAMPLE",
    authDomain: "your-project.firebaseapp.com",
    databaseURL: "https://your-project.firebaseio.com",
    projectId: "your-project",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

function gradeQuiz() {
    let studentName = document.getElementById("student-name").value.trim();
    if (!studentName) {
        alert("Please enter your name.");
        return;
    }

    let answers = {
        q1: "Non-ciliated simple columnar epithelium",
        q1a: ["tightly packed", "elongated nuclei", "basal surface"],
        q1b: ["gastrointestinal tract", "esophagus", "stomach", "intestine", "glands"],
        q2: "Transitional Epithelium",
        q2a: ["multiple layers", "dome-shaped", "stretch and return"],
        q2b: ["urinary bladder", "ureters", "urethra"],
        q3: "Brown adipose tissue",
        q3a: ["multilocular lipid droplets", "high mitochondria"],
        q3b: "Loose connective tissue",
        q4: "Hyaline Cartilage",
        q4a: "Connective tissue",
        q4b: ["chondrocytes in cell nests", "perichondrium present"],
        q5: "Lungs",
        q5a: ["bronchi", "bronchioles", "alveoli"]
    };

    let totalScore = 0;
    let feedback = `<h3>Results for ${studentName}:</h3>`;

    function checkAnswer(inputId, correctAnswer) {
        let userAnswer = document.getElementById(inputId).value.trim().toLowerCase();
        if (typeof correctAnswer === "string") {
            if (userAnswer === correctAnswer.toLowerCase()) {
                totalScore += 4;
                return `<p>Question ${inputId}: ✅ Correct</p>`;
            } else {
                return `<p>Question ${inputId}: ❌ Incorrect. Correct answer: ${correctAnswer}</p>`;
            }
        } else if (Array.isArray(correctAnswer)) {
            let correctCount = correctAnswer.filter(item => userAnswer.includes(item.toLowerCase())).length;
            let score = (correctCount / correctAnswer.length) * 4;
            totalScore += score;
            return `<p>Question ${inputId}: ${correctCount > 0 ? "✅ Partially Correct" : "❌ Incorrect"}. Correct: ${correctAnswer.join(", ")}</p>`;
        }
    }

    for (let key in answers) {
        feedback += checkAnswer(key, answers[key]);
    }

    let comment = totalScore >= 16 ? "Excellent!" : totalScore >= 12 ? "Good Job!" : totalScore >= 8 ? "Needs Improvement" : "Try Again";
    feedback += `<h3>Total Score: ${totalScore}/20</h3>`;
    feedback += `<h3>Comment: ${comment}</h3>`;

    document.getElementById("result-container").innerHTML = feedback;

    // Save to Firebase
    db.ref("quiz-results").push({
        name: studentName,
        score: totalScore,
        comment: comment,
        timestamp: new Date().toISOString()
    }, function(error) {
        if (error) {
            console.log("Data could not be saved: " + error);
        } else {
            console.log("Data saved successfully!");
        }
    });
}
