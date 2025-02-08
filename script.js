// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyB254WTAWWECfZPlsxF9-83i_Ey-EZlUKQ",
    authDomain: "histology-spot.firebaseapp.com",
    projectId: "histology-spot",
    storageBucket: "histology-spot.firebasestorage.app",
    messagingSenderId: "770465642565",
    appId: "1:770465642565:web:703b4fc75051910193cb2c",
    measurementId: "G-QMS13Z8F2G"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

// Answer keys for grading
const correctAnswers = [
    'Non-ciliated simple columnar epithelium',
    'Transitional Epithelium',
    'Brown adipose tissue',
    'Hyaline Cartilage',
    'Lungs'
];

// Grading function
function gradeQuiz(answers) {
    let totalScore = 0;
    let comments = '';
    let feedback = '';

    answers.forEach((answer, index) => {
        if (answer.toLowerCase().includes(correctAnswers[index].toLowerCase())) {
            totalScore += 4;
            comments += `Question ${index + 1}: Correct answer!\n`;
        } else {
            comments += `Question ${index + 1}: Incorrect answer. The correct answer is "${correctAnswers[index]}".\n`;
        }
    });

    if (totalScore === 20) {
        feedback = 'Excellent!';
    } else if (totalScore >= 16) {
        feedback = 'Good job!';
    } else if (totalScore >= 12) {
        feedback = 'Fair performance.';
    } else {
        feedback = 'Needs improvement.';
    }

    return { totalScore, comments, feedback };
}

// Handle form submission
document.getElementById('quiz-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get student answers
    const answers = [
        document.getElementById('answer1').value,
        document.getElementById('answer2').value,
        document.getElementById('answer3').value,
        document.getElementById('answer4').value,
        document.getElementById('answer5').value
    ];

    // Get student name
    const studentName = document.getElementById('student-name').value || "Anonymous";

    // Grade the quiz
    const { totalScore, comments, feedback } = gradeQuiz(answers);

    // Save to Firebase
    db.collection("quizResults").add({
        studentName: studentName,
        score: totalScore,
        feedback: feedback,
        comments: comments
    });

    // Display results
    document.getElementById('results').innerHTML = `
        <h3>Your Results</h3>
        <p>Score: ${totalScore} / 20</p>
        <p>Feedback: ${feedback}</p>
        <pre>${comments}</pre>
    `;
});
