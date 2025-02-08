const firebaseConfig = {
    apiKey: "AIzaSyB254WTAWWECfZPlsxF9-83i_Ey-EZlUKQ",
    authDomain: "histology-spot.firebaseapp.com",
    projectId: "histology-spot",
    storageBucket: "histology-spot.firebasestorage.app",
    messagingSenderId: "770465642565",
    appId: "1:770465642565:web:703b4fc75051910193cb2c",
    measurementId: "G-QMS13Z8F2G"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const correctAnswers = {
    q1a: "Non-ciliated simple columnar epithelium",
    q1b: "The cells are tightly packed, nuclei are elongated and basal.",
    q1c: "Gastrointestinal tract, endocrine and exocrine gland ducts.",

    q2a: "Transitional Epithelium",
    q2b: "Multiple layers, dome-shaped cells, stretchable.",
    q2c: "Urinary bladder, ureters, part of the urethra.",

    q3a: "Brown adipose tissue",
    q3b: "High mitochondria, multilocular lipid droplets, abundant blood vessels.",
    q3c: "Loose connective tissue",

    q4a: "Hyaline Cartilage",
    q4b: "Connective tissue",
    q4c: "Chondrocytes in nests, basophilic matrix, perichondrium present.",

    q5a: "Lungs",
    q5b: "Alveoli lined by simple squamous epithelium, cut sections of bronchioles."
};

function submitQuiz() {
    let studentName = document.getElementById("studentName").value;
    let score = 0;
    let totalMarks = 20;
    let resultsHTML = `<h2>Results</h2><p>Name: ${studentName}</p><p>Score: `;

    let answers = {};
    for (let key in correctAnswers) {
        let userAnswer = document.getElementById(key).value.trim().toLowerCase();
        answers[key] = userAnswer;

        if (userAnswer === correctAnswers[key].toLowerCase()) {
            score += 4;
        }
    }

    let comment = score === 20 ? "Excellent!" :
                  score >= 12 ? "Good job!" :
                  score >= 8 ? "Fair, but study more." : "Needs improvement.";

    resultsHTML += `${score}/${totalMarks}</p><p>Comment: ${comment}</p><h3>Correct Answers:</h3><ul>`;

    for (let key in correctAnswers) {
        resultsHTML += `<li><strong>${key.toUpperCase()}</strong>: ${correctAnswers[key]}</li>`;
    }

    resultsHTML += `</ul>`;
    document.getElementById("results").innerHTML = resultsHTML;

    db.ref("quiz-results").push({
        name: studentName,
        score: score,
        comment: comment,
        answers: answers,
        timestamp: new Date().toISOString()
    }).then(() => {
        console.log("Data saved successfully!");
    }).catch((error) => {
        console.log("Firebase Error:", error);
    });
}
