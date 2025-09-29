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
const name = nameInput.value;
const team = teamSelect.value;
const teamName = teamSelect.selectedOptions[0].text;

console.log(name, teamName);

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

//Show welcome message
const message = `Welcome, ${name} from ${teamName}! Total attendees: ${count}`;
console.log(message);

//Display feedback message to user
const greeting = document.getElementById('greeting');
greeting.textContent = message;
greeting.style.display = 'block';

form.reset();

//const current = parseInt(teamCounter.textContent);
//console.log("Previous team count:", current);

//const newTotal = current + 1;
//console.log("New team count:", newTotal);

});