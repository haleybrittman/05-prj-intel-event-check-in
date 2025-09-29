const form = document.getElementById('checkInForm');
const nameInput = document.getElementById('attendeeName');
const teamSelect = document.getElementById('teamSelect');


//Track attendance
let count = 0;
const maxCount = 50;

//Handle form submission
form.addEventListener('submit', function(event) {
  event.preventDefault();


//Get form values
const name = nameInput.value.trim();
const team = teamSelect.value;
const teamName = teamSelect.selectedOptions[0].text;

//Validate that name is provided
if (!name) {
  alert('Please enter your name before checking in.');
  return;
}

console.log(`Checking in: ${name} from ${teamName}`);

//Increment count 
count++;
console.log('Total check-ins', count);

//Update attendance display
const attendeeCountDisplay = document.getElementById('attendeeCount');
attendeeCountDisplay.textContent = count;

//Update progress bar
const percentage = Math.round((count / maxCount) * 100);
const progressBar = document.getElementById('progressBar');
progressBar.style.width = percentage + '%';
console.log(`Progress: ${percentage}%`);

//Update team counter
const teamCounter = document.getElementById(team + "Count");
teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

//Show personalized welcome message
const welcomeMessages = [
  `🎉 Welcome to the Sustainability Summit, ${name}!`,
  `🌱 Great to see you here, ${name}!`,
  `✨ Welcome aboard, ${name}!`,
  `🌍 Thanks for joining us, ${name}!`
];
const randomWelcome = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
const fullMessage = `${randomWelcome} You're representing ${teamName} and you're attendee #${count}.`;

console.log(fullMessage);

//Display personalized greeting to user
const greeting = document.getElementById('greeting');
greeting.innerHTML = `<strong>${fullMessage}</strong>`;
greeting.style.display = 'block';
greeting.style.color = '#2563eb';
greeting.style.padding = '15px';
greeting.style.borderRadius = '8px';
greeting.style.backgroundColor = '#eff6ff';
greeting.style.border = '1px solid #bfdbfe';
greeting.style.marginBottom = '20px';

form.reset();

//const current = parseInt(teamCounter.textContent);
//console.log("Previous team count:", current);

//const newTotal = current + 1;
//console.log("New team count:", newTotal);

});