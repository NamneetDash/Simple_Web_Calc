document.addEventListener('DOMContentLoaded', function () {
    const userForm = document.getElementById('userForm');
    const greetingMessage = document.getElementById('greetingMessage');
    const colorButton = document.getElementById('colorButton');
    const uploadImage = document.getElementById('uploadImage');
    const cardImage = document.getElementById('randomCodingImage');
    const heading = document.querySelector('h1');
    const result = document.getElementById('result');
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');

    // Handle form submission
    userForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const userName = document.getElementById('userName').value;
        const greeting = `Hello ${userName}`;
        greetingMessage.textContent = greeting;
        greetingMessage.style.display = 'block'; // Show the greeting message
        greetingMessage.classList.add('slide-in'); // Add animation class

        // Show popup
        alert(`Thank you for submitting, ${userName}!`);
    });

    // Determine the appropriate greeting based on time
    function determineGreeting() {
        const now = new Date();
        const hours = now.getHours();
        if (hours < 12) {
            return 'Good Morning';
        } else if (hours < 18) {
            return 'Good Afternoon';
        } else if (hours < 21) {
            return 'Good Evening';
        } else {
            return 'Good Night';
        }
    }

    // Display greeting in a pop-up
    const initialGreeting = determineGreeting();
    alert(initialGreeting);

    // Handle background color change and adaptive font color
    colorButton.addEventListener('click', function () {
        const newColor = getRandomColor();
        document.body.style.backgroundColor = newColor;

        const textColor = isDarkColor(newColor) ? '#fff' : '#000';
        document.body.style.color = textColor;
        heading.style.color = textColor;
        greetingMessage.style.color = textColor;
        result.style.color = textColor;
    });

    // Upload image and update card
    uploadImage.addEventListener('change', function () {
        const file = uploadImage.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                cardImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Function to update the clock
    function updateClock() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12; // The hour '0' should be '12'
        const timeString = `${String(hours).padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;
        document.getElementById('liveClock').textContent = timeString;
    }

    // Update the clock every second
    setInterval(updateClock, 1000);

    // Initial call to display the clock immediately
    updateClock();

    // Real-time calculation display
    num1Input.addEventListener('input', updateResult);
    num2Input.addEventListener('input', updateResult);

    // Calculator functionality
    window.calculate = function (operation) {
        const num1 = parseFloat(num1Input.value);
        const num2 = parseFloat(num2Input.value);
        let calcResult;

        if (isNaN(num1) || isNaN(num2)) {
            result.innerText = 'Error: Invalid input';
            return;
        }

        switch (operation) {
            case 'add':
                calcResult = num1 + num2;
                break;
            case 'subtract':
                calcResult = num1 - num2;
                break;
            case 'multiply':
                calcResult = num1 * num2;
                break;
            case 'divide':
                calcResult = num2 !== 0 ? num1 / num2 : 'Error (Division by Zero)';
                break;
            default:
                calcResult = 'Error: Unknown operation';
        }
        result.innerText = 'Result: ' + calcResult;
    };

    // Update the result display
    function updateResult() {
        result.innerText = '';
    }
});

// Generate a random color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Determine if a color is dark
function isDarkColor(color) {
    const rgb = parseInt(color.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = rgb & 0xff;
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128;
}
