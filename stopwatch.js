let startTime;
let elapsedTime = 0;
let timerInterval;
let laps = [];
let lapStartTime;

// Format time as HH:MM:SS
function formatTime(time) {
    let hours = Math.floor(time / 3600000);
    let minutes = Math.floor((time % 3600000) / 60000);
    let seconds = Math.floor((time % 60000) / 1000);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Update the stopwatch display
function updateDisplay() {
    document.getElementById('display').textContent = formatTime(elapsedTime);
}

// Start the stopwatch
document.getElementById('start').addEventListener('click', () => {
    if (!timerInterval) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
    }
});

// Pause the stopwatch
document.getElementById('pause').addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
});

// Reset the stopwatch
document.getElementById('reset').addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
    elapsedTime = 0;
    laps = [];
    updateDisplay();
    document.getElementById('lap-list').innerHTML = '';
    document.getElementById('accuracy-display').textContent = 'Click "Lap" to measure accuracy.';
});

// Record a lap time
document.getElementById('lap').addEventListener('click', () => {
    if (timerInterval) {
        const lapTime = elapsedTime - (lapStartTime || 0);
        lapStartTime = elapsedTime;
        laps.push(lapTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${laps.length}: ${formatTime(lapTime)}`;
        document.getElementById('lap-list').appendChild(lapItem);

        // Calculate accuracy (example: compare lap times to a target of 10 seconds)
        const targetTime = 10000; // 10 seconds
        const accuracy = Math.abs((lapTime - targetTime) / targetTime) * 100;
        document.getElementById('accuracy-display').textContent = `Accuracy: ${(100 - accuracy).toFixed(2)}%`;
    }
});