let selectedGender = 'male';


function selectGender(gender) {
    // Remove active class from both
    document.getElementById('male').classList.remove('active');
    document.getElementById('female').classList.remove('active');
    
    // Add active class to the clicked one
    document.getElementById(gender).classList.add('active');
    selectedGender = gender;
}


function calculateBMI() {
    // Get values from inputs
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100; // Convert cm to m

    // Validation
    if (!weight || !height || height <= 0) {
        alert("Please enter valid numbers for weight and height!");
        return;
    }

    // BMI Formula: Weight / Height squared
    const bmi = (weight / (height * height)).toFixed(1);
    
    // Display results
    const valueDisplay = document.getElementById('bmi-value');
    const statusDisplay = document.getElementById('bmi-status');
    
    valueDisplay.innerText = bmi;

    // Logic for health categories
    if (bmi < 18.5) {
        statusDisplay.innerText = "Underweight";
        valueDisplay.style.color = "#ffcb00"; // Yellow
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        statusDisplay.innerText = "Healthy Weight";
        valueDisplay.style.color = "#2e65ccff"; // Green
    } else if (bmi >= 25 && bmi <= 29.9) {
        statusDisplay.innerText = "Overweight";
        valueDisplay.style.color = "#e67e22"; // Orange
    } else {
        statusDisplay.innerText = "Obese";
        valueDisplay.style.color = "#e74c3c"; // Red
    }
}

async function getAIHealthAdvice(height,weight,gender,bmi) {
    try {
        // Example: fetch advice from an API (replace URL and payload as needed)
        const response = await fetch('https://localhost:5000/calculate-bmi', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ height, weight, gender, bmi })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        // Return the advice text or the full object depending on API
        document.getElementById('advice-text').innerText = data.advice;
    } catch (error) {
        console.error('Error connecting to the AI server:', error);
        return 'Unable to fetch AI health advice at this time.';
    }
}

async function getAIAdvice(height, weight, gender) {
    try {
        const response = await fetch('http://localhost:5000/calculate-bmi', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ height, weight, gender })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching AI advice:', error);
        return null;
    }
}

document.querySelector('button').addEventListener('click', async () => {
    // Trigger BMI calculation
    calculateBMI();

    // Optionally fetch AI advice and display it
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const advice = await getAIAdvice(height, weight, selectedGender);
    if (advice && advice.advice) {
        document.getElementById('advice-text').innerText = advice.advice;
    }
});