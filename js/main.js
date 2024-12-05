// Game state
let currentLevel = 1;
const totalLevels = 5;
let sequences = [
    { sequence: [3, 6, 9], answer: 12 },
    { sequence: [2, 4, 8], answer: 16 },
    { sequence: [1, 3, 9], answer: 27 },
    { sequence: [1, 2, 4], answer: 8 },
    { sequence: [2, 6, 18], answer: 54 }
];

// Show guide popup on page load and refresh
window.onload = function() {
    showGuide();
    updateLevel();
};

function showGuide() {
    document.getElementById('guidePopup').style.display = 'flex';
}

function closeGuide() {
    document.getElementById('guidePopup').style.display = 'none';
}

function updateLevel() {
    document.getElementById('currentLevel').textContent = currentLevel;
    document.getElementById('sequence').textContent = 
        sequences[currentLevel-1].sequence.join(', ') + ', ?';
    document.getElementById('progress').style.width = 
        ((currentLevel-1) / totalLevels * 100) + '%';
}

function showResultPopup(message) {
    const popup = document.getElementById('resultPopup');
    const messageEl = document.getElementById('resultMessage');
    
    if (!popup || !messageEl) {
        console.error('Popup elements not found!');
        return;
    }
    
    messageEl.textContent = message;
    popup.style.display = 'flex';
}

function closeResultPopup() {
    const popup = document.getElementById('resultPopup');
    if (popup) {
        popup.style.display = 'none';
    }
}

function checkAnswer() {
    const userAnswer = parseInt(document.getElementById('userAnswer').value);
    const correctAnswer = sequences[currentLevel-1].answer;

    if (userAnswer === correctAnswer) {
        if (currentLevel === totalLevels) {
            showResultPopup('🎉 Congratulations!\nYour Private Key: [PRIVATE_KEY]');
            currentLevel = 1;
        } else {
            showResultPopup('✨ Level Complete!\nMoving to Level ' + (currentLevel + 1));
            currentLevel++;
        }
        document.getElementById('userAnswer').value = '';
        updateLevel();
    } else {
        showResultPopup('❌ Incorrect\nTry again!');
    }
}

// Prevent form submission on enter key
document.getElementById('userAnswer').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        checkAnswer();
    }
}); 